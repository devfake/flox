const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

const fetchSubtitles = (episodesPath, fileName) => {
  const subtitlePath = episodesPath + "/" + fileName + ".srt" 

  if (fs.existsSync(subtitlePath)) {
    return fs.realpathSync(subtitlePath)  
  }

  return null
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

const addMovie = (file, promises) => {
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
      extension: ext,
      filename: pathInfo.name,
      name: fileInfo.name,
      src: src,
      year: fileInfo.year,
      tags: fileInfo.tag.toString(),
      subtitles: fetchSubtitles(pathInfo.dir, pathInfo.name),
      category: "movies",
      added: Date.now()
    }
  }))
}

const removeMovies = (list, dbPromises) => {
  list.forEach((missingMovie) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingMovie }
    }))
  })
}

const updateMovies = (ParserList) => {
  const { MOVIES_ROOT } = env
  const listOfMoviesInDB = ParserList().filter((file) => file.category === "movies" && file.removed == null)
  const allFiles = searchDirectory(MOVIES_ROOT)

  const dbPromises = []

  return listOfMoviesInDB.then((l) => {
    const list = l.map((m) => m.src)

    allFiles.forEach((file) => {
      const found = list.indexOf(file)

      if(found >= 0) {
        list.splice(found, 1)
      }

      addMovie(file, dbPromises)
    })

    // handle missing movies
    if (list.length) {
      removeMovies(list, dbPromises)
    }

    return Promise.all(dbPromises)
  })
}

const fetchMovies = (since = null) => {
  const query = {
    where: {
      category: "movies"
    },
    order: "createdAt DESC"
  }

  if(since) {
    query.where.$and = {
      $or: {
        added: { $gte: since },
        removed: { $gte: since },
      } 
    }
  }

  return file_history.findAll(query).then((res) => {
    return res.map((m) => {
      const status = m.removed ? "removed" : "added"

      return {
        subtitles: m.subtitles,
        extension: m.extension,
        src: m.src,
        name: m.name,
        status: status,
        year: m.year,
        tags: m.tags ? m.tags.split(",") : [],
        filename: m.filename
      }
    })
  })
}

module.exports = {
  fetchMovies,
  updateMovies
}
