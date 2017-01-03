const db = require("./../../database/models")
const fs = require("fs")
const { file_history } = db.sequelize.models

const helper = {
  list() {
    return file_history.findAll().then((rows) => {
      return rows
    })
  },
  normalizeNumber(nr = "") {
    const result = nr.match(/(\d+)/)
    if ( !result ) return -1
    return result[1] | 0
  },
  fetchSubtitles(episodesPath, fileName) {
    const subtitlePath = episodesPath + "/" + fileName + ".srt" 

    if (fs.existsSync(subtitlePath)) {
      return fs.realpathSync(subtitlePath)  
    }
    return null
  }
}

const supportedVideoFileTypes = ["mkv", "mp4"]

module.exports = {
  helper,
  supportedVideoFileTypes
}
