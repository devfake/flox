const fs = require("fs")
const path = require("path")
const db = require("../../database/models")
const { helper, supportedVideoFileTypes } = require("./helper.js")

const videoNameParser = require("video-name-parser")

const env = process.env
const { file_history } = db.sequelize.models

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
      $and: { removed: null }
    },
    defaults: {
      extension: ext,
      filename: pathInfo.name,
      name: fileInfo.name,
      src: src,
      year: fileInfo.year,
      tags: fileInfo.tag.toString(),
      subtitles: helper.fetchSubtitles(pathInfo.dir, pathInfo.name),
      category: "movies"
    }
  }))
}

const removeMovies = (list, dbPromises) => {
  list.forEach((missingMovie) => {
    dbPromises.push(file_history.update({ removed: Date.now() }, {
      where: { src: missingMovie, $and: { removed: null } }
    }))
  })
}

const updateMovies = () => {
  const { MOVIES_ROOT } = env
  const listOfMoviesInDB = helper.list().filter((file) => file.category === "movies" && file.removed == null).map((m) => m.src)

  const allFiles = searchDirectory(MOVIES_ROOT)
  const dbPromises = []

  return listOfMoviesInDB.then((list) => {
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

module.exports = {
  updateMovies
}
