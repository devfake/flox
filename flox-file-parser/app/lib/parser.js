const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models
const fetchMovies = require("./parser.movies.js")
const fetchTv = require("./parser.tv.js")

class Parser {
  fetch() {
    if(arguments.length > 0) throw(Error)

    return {
      tv: fetchTv(Parser.list, Parser.normalizeNumber),
      movies: fetchMovies(Parser.list)
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
