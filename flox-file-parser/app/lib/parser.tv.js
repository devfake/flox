const fs = require("fs")
const path = require("path")
const db = require("../../database/models")
const { helper, supportedVideoFileTypes } = require("./helper.js")

const env = process.env
const { file_history } = db.sequelize.models

const addSeasonsToTv = (path, tvTitle, promises, listOfTvInDB) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season_number = helper.normalizeNumber(seasonName)

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season_number, promises, listOfTvInDB, tvTitle)
  })
}

const removeTv = (list, dbPromises) => {
  list.forEach((missingEpisode) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingEpisode, $and: { removed: null } }
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
      $and: { removed: null }
    },
    defaults: {
      category: "tv",
      extension: fileType,
      filename: fileName,
      subtitles: helper.fetchSubtitles(episodesPath, fileName),
      name: tv_title,
      episode_number: helper.normalizeNumber(episodeName),
      season_number: season_number,
      tv_title: tv_title,
      src: absolutePathEpisode
    }
  }))
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

const updateTv = () => {
  const { TV_ROOT } = env
  const tvSeries = fs.readdirSync(TV_ROOT)
  const promises = []
  const listOfTvInDB = helper.list().then((l) => l.filter((e) => e.category === "tv" && e.removed == null)).map((e) => e.src)

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

module.exports = {
  updateTv
}
