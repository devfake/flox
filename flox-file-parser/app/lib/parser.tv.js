const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

const addSeasonsToTv = (path, tv, promises, listOfTvInDB) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season = { 
      season_number: ParserNormalizeNumber(seasonName)
    } 

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season, promises, listOfTvInDB)

    tv.seasons.push(season)
  })
}

const fetchSubtitles = (episodesPath, fileName) => {
  const subtitles = []
  const subtitlePath = episodesPath + "/" + fileName + ".srt" 

  if (fs.existsSync(subtitlePath)) {
    const absolutePathSubtitle = fs.realpathSync(subtitlePath)  

    subtitles.push({
      filename: fileName,
      src: absolutePathSubtitle,
      extension: "srt"
    })
  }

  return subtitles
}

const removeTv = (list, dbPromises) => {
  list.forEach((missingEpisode) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingEpisode }
    }))
  })
}

const addEpisode = (episodesPath, episodeName, promises) => {
  const absolutePathEpisode = fs.realpathSync(episodesPath + "/" + episodeName)  
  const fileType = path.extname(absolutePathEpisode).replace(".", "") 
  const fileName = path.parse(absolutePathEpisode).name

  if (!supportedVideoFileTypes.includes(fileType)) return false

  promises.push(file_history.findOrCreate({
    where: { 
      src: absolutePathEpisode,
      $and: {
        removed: null
      }
    },
    defaults: {
      category: "tv",
      added: Date.now()
    }
  }))

  return {
    extension: fileType,
    filename: fileName,
    subtitles: fetchSubtitles(episodesPath, fileName),
    episode_number: ParserNormalizeNumber(episodeName),
    src: absolutePathEpisode
  }
}

const addEpisodesToSeason = (episodesPath, season, promises, list) => {
  const episode_files = fs.readdirSync(episodesPath)

  season.episodes = episode_files.map((file) => {
    const found = list.indexOf(episodesPath + "/" + file)

    if(found >= 0) {
      list.splice(found, 1)
    } 

    return addEpisode(episodesPath, file, promises)
  }).filter((file) => file !== false)
}

let ParserList, ParserNormalizeNumber
const fetchTv = (parserList, parserNormalizeNumber) => {
  ParserList = parserList
  ParserNormalizeNumber = parserNormalizeNumber
  const { TV_ROOT } = env
  const result = []
  const tvSeries = fs.readdirSync(TV_ROOT)
  const promises = []
  const listOfTvInDB = ParserList().then((l) => l.filter((e) => e.category === "tv" && e.removed == null)).map((e) => e.src)

  return listOfTvInDB.then((list) => {
    tvSeries.forEach((tvName) => {
      const tv = {
        title: tvName,
        seasons: []
      }

      result.push(tv)

      const seasonPath = TV_ROOT + "/" + tvName
      addSeasonsToTv(seasonPath, tv, promises, list)
    })

    // handle missing episodes
    if(list.length) {
      removeTv(list, promises)
    }

    return Promise.all(promises).then(() => result)
  })
}

module.exports = fetchTv
