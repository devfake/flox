const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env
const { file_history } = db.sequelize.models

const addSeasonsToTv = (path, tv, promises) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season = { 
      season_number: Parser.normalizeNumber(seasonName)
    } 

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season, promises)

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

const addEpisodesToSeason = (episodesPath, season, promises) => {
  const episode_files = fs.readdirSync(episodesPath)

  season.episodes = episode_files.map((e) => {
    const absolutePathEpisode = fs.realpathSync(episodesPath + "/" + e)  
    const fileType = path.extname(absolutePathEpisode).replace(".", "") 
    const fileName = path.parse(absolutePathEpisode).name

    if (!supportedVideoFileTypes.includes(fileType)) return false

    promises.push(file_history.findOrCreate({
      where: { src: absolutePathEpisode },
      defaults: {
        added: Date.now()
      }
    }))

    return {
      extension: fileType,
      filename: fileName,
      subtitles: fetchSubtitles(episodesPath, fileName),
      episode_number: Parser.normalizeNumber(e),
      src: absolutePathEpisode
    }
  }).filter((e) => e !== false)
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

const fetchMovies = () => {
  const { MOVIES_ROOT } = env
  const allFiles = searchDirectory(MOVIES_ROOT)

  const movies = []
  const promises = []

  allFiles.forEach((file) => {
    const pathInfo = path.parse(file)
    const ext = pathInfo.ext.replace(".", "")

    if(!supportedVideoFileTypes.includes(ext)) return

    const fileInfo = videoNameParser(pathInfo.name) 
    const filePath = pathInfo.dir + "/" + pathInfo.base

    const src = fs.realpathSync(filePath)
    promises.push(file_history.findOrCreate({
      where: { src },
      defaults: {
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
  })

  return Promise.all(promises).then(() => movies)
}

const fetchTv = () => {
  const { TV_ROOT } = env
  const result = []
  const tvSeries = fs.readdirSync(TV_ROOT)
  const promises = []

  tvSeries.forEach((tvName) => {
    const tv = {
      title: tvName,
      seasons: []
    }

    result.push(tv)

    const seasonPath = TV_ROOT + "/" + tvName
    addSeasonsToTv(seasonPath, tv, promises)
  })

  return Promise.all(promises).then(() => result)
}

class Parser {
  fetch() {
    if(arguments.length > 0) throw(Error)

    return {
      tv: fetchTv(),
      movies: fetchMovies()
    }
  }

  static normalizeNumber(nr = "") {
    const result = nr.match(/(\d+)/)
    if ( !result ) return -1
    return result[1] | 0
  }
}

module.exports = Parser
