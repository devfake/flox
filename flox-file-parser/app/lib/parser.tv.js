const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

const addSeasonsToTv = (path, tvTitle, promises, listOfTvInDB) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season_number = ParserNormalizeNumber(seasonName)

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season_number, promises, listOfTvInDB, tvTitle)
  })
}

const fetchSubtitles = (episodesPath, fileName) => {
  const subtitlePath = episodesPath + "/" + fileName + ".srt" 

  if (fs.existsSync(subtitlePath)) {
    return fs.realpathSync(subtitlePath)  
  }
  return null
}

const removeTv = (list, dbPromises) => {
  list.forEach((missingEpisode) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingEpisode }
    }))
  })
}

const addEpisode = (episodesPath, episodeName, promises, season_number, tv_title) => {
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
      extension: fileType,
      filename: fileName,
      subtitles: fetchSubtitles(episodesPath, fileName),
      name: tv_title,
      episode_number: ParserNormalizeNumber(episodeName),
      season_number: season_number,
      tv_title: tv_title,
      src: absolutePathEpisode,
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

const addEpisodesToSeason = (episodesPath, season_number, promises, list, tv_title) => {
  const episode_files = fs.readdirSync(episodesPath)

  episode_files.map((file) => {
    const found = list.indexOf(episodesPath + "/" + file)

    if(found >= 0) {
      list.splice(found, 1)
    } 

    return addEpisode(episodesPath, file, promises, season_number, tv_title)
  }).filter((file) => file !== false)
}

let ParserList, ParserNormalizeNumber
const updateTv = (parserList, parserNormalizeNumber) => {
  ParserList = parserList
  ParserNormalizeNumber = parserNormalizeNumber
  const { TV_ROOT } = env
  const tvSeries = fs.readdirSync(TV_ROOT)
  const promises = []
  const listOfTvInDB = ParserList().then((l) => l.filter((e) => e.category === "tv" && e.removed == null)).map((e) => e.src)

  return listOfTvInDB.then((list) => {
    tvSeries.forEach((tvName) => {
      const seasonPath = TV_ROOT + "/" + tvName
      addSeasonsToTv(seasonPath, tvName, promises, list)
    })

    // handle missing episodes
    if(list.length) {
      removeTv(list, promises)
    }

    return Promise.all(promises)
  })
}

const fetchTv = () => {
  return file_history.findAll({
    where: {
      category: "tv"
    }
  }).map((tv) => {
    const status = tv.removed ? "removed" : "added"

    return {
      episode_number: tv.episode_number,
      subtitles: tv.subtitles,
      extension: tv.extension,
      src: tv.src,
      status: status,
      season_number: tv.season_number,
      tv_title: tv.tv_title,
      year: tv.year,
      tags: tv.tags ? tv.tags.split(",") : [],
      filename: tv.filename
    }
  })
}

module.exports = {
  fetchTv,
  updateTv
}
