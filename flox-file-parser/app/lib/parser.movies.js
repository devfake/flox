const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

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

const fetchMovies = (ParserList) => {
  const { MOVIES_ROOT } = env
  const listOfMoviesInDB = ParserList().filter((file) => file.category === "movies" && file.removed == null)
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

module.exports = fetchMovies
