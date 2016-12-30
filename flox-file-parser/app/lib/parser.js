const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models
const { fetchMovies, updateMovies } = require("./parser.movies.js")
const { fetchTv, updateTv } = require("./parser.tv.js")

class Parser {
  fetch(since = null) {
    const tvUpdated = updateTv(Parser.list, Parser.normalizeNumber)
    const moviesUpdated = updateMovies(Parser.list)
    since = since * 1 //parse int

    return {
      tv: tvUpdated.then(fetchTv),
      movies: moviesUpdated.then(fetchMovies.bind(null, since))
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
