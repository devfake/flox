const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

const addSeasonsToTv = (path, tv, promises, listOfTvInDB) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season = { 
      season_number: Parser.normalizeNumber(seasonName)
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
    episode_number: Parser.normalizeNumber(episodeName),
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

const searchDirectory = (path) => {
  const files = fs.readdirSync(path)
  const foundFiles = []

  files.forEach((file) => {
    const currentFile = path + "/" + file
    const fileInfo = fs.statSync(currentFile)

    if (fileInfo.isDirectory()) {
      return foundFiles.push(...searchDirectory(currentFile))
    }

    return foundFiles.push(currentFile)
  })

  return foundFiles
}

const addMovie = (file, promises, movies) => {
  const pathInfo = path.parse(file)
  const ext = pathInfo.ext.replace(".", "")

  if(!supportedVideoFileTypes.includes(ext)) return

  const fileInfo = videoNameParser(pathInfo.name) 
  const filePath = pathInfo.dir + "/" + pathInfo.base

  const src = fs.realpathSync(filePath)
  promises.push(file_history.findOrCreate({
    where: { 
      src: src,
      $and: {
        removed: null
      }
    },
    defaults: {
      category: "movies",
      added: Date.now()
    }
  }))

  movies.push({
    name: fileInfo.name,
    extension: ext,
    filename: pathInfo.name,
    src: src,
    year: fileInfo.year,
    tags: fileInfo.tag,
    subtitles: fetchSubtitles(pathInfo.dir, pathInfo.name)
  })
}

const removeMovies = (list, dbPromises) => {
  list.forEach((missingMovie) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingMovie }
    }))
  })
}

const fetchMovies = () => {
  const { MOVIES_ROOT } = env
  const listOfMoviesInDB = Parser.list().filter((file) => file.category === "movies" && file.removed == null)
  const allFiles = searchDirectory(MOVIES_ROOT)

  const movies = []
  const dbPromises = []

  return listOfMoviesInDB.then((l) => {
    const list = l.map((m) => m.src)

    allFiles.forEach((file) => {
      const found = list.indexOf(file)

      if(found >= 0) {
        list.splice(found, 1)
      }

      addMovie(file, dbPromises, movies)
    })

    // handle missing movies
    if (list.length) {
      removeMovies(list, dbPromises)
    }

    return Promise.all(dbPromises).then(() => movies)
  })
}

const fetchTv = () => {
  const { TV_ROOT } = env
  const result = []
  const tvSeries = fs.readdirSync(TV_ROOT)
  const promises = []
  const listOfTvInDB = Parser.list().then((l) => l.filter((e) => e.category === "tv" && e.removed == null)).map((e) => e.src)

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

class Parser {
  fetch() {
    if(arguments.length > 0) throw(Error)

    return {
      tv: fetchTv(),
      movies: fetchMovies()
    }
  }

  static list() {
    return file_history.findAll().then((rows) => {
      return rows
    })
  }

  static normalizeNumber(nr = "") {
    const result = nr.match(/(\d+)/)
    if ( !result ) return -1
    return result[1] | 0
  }
}

module.exports = Parser
