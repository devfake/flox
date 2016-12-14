const fs = require("fs")
const path = require("path")

const videoNameParser = require("video-name-parser")

const supportedVideoFileTypes = ["mkv", "mp4"]
const env = process.env

const fetchTv = (tvPath) => {
  const result = []
  const tvSeries = fs.readdirSync(tvPath)

  tvSeries.forEach((tvName) => {
    const tv = {
      title: tvName,
      seasons: []
    }

    result.push(tv)

    const seasonPath = tvPath + "/" + tvName
    addSeasonsToTv(seasonPath, tv)
  })

  return result
}

const addSeasonsToTv = (path, tv) => {
  const seasons = fs.readdirSync(path) || []

  seasons.forEach((seasonName) => {
    const season = { 
      season_number: Parser.normalizeNumber(seasonName)
    } 

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season)

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

const addEpisodesToSeason = (episodesPath, season) => {
  const episode_files = fs.readdirSync(episodesPath)

  season.episodes = episode_files.map((e) => {
    const absolutePathEpisode = fs.realpathSync(episodesPath + "/" + e)  
    const fileType = path.extname(absolutePathEpisode).replace(".", "") 
    const fileName = path.parse(absolutePathEpisode).name

    if (!supportedVideoFileTypes.includes(fileType)) return false

    return {
      extension: fileType,
      filename: fileName,
      subtitles: fetchSubtitles(episodesPath, fileName),
      episode_number: Parser.normalizeNumber(e),
      src: absolutePathEpisode
    }
  }).filter((e) => e !== false)
}

const normalizePaths = (rootPath) => {
  const { TV_ROOT, MOVIES_ROOT } = env
  const tvPath = path.normalize(TV_ROOT)
  const moviesPath = path.normalize(MOVIES_ROOT)

  return {
    tvPath,
    moviesPath
  }
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

const fetchMovies = (moviesPath) => {
  const allFiles = searchDirectory(moviesPath) 
  const movies = []

  allFiles.forEach((file) => {
    const pathInfo = path.parse(file)
    const ext = pathInfo.ext.replace(".", "")

    if(!supportedVideoFileTypes.includes(ext)) return

    const fileInfo = videoNameParser(pathInfo.name) 
    const filePath = pathInfo.dir + "/" + pathInfo.base

    movies.push({
      name: fileInfo.name,
      extension: ext,
      filename: pathInfo.name,
      src: fs.realpathSync(filePath),
      year: fileInfo.year,
      tags: fileInfo.tag,
      subtitles: fetchSubtitles(pathInfo.dir, pathInfo.name)
    })
  })

  return movies
}

class Parser {
  fetch() {
    if(arguments.length > 0) throw(Error)
    const { tvPath, moviesPath } = normalizePaths()

    return {
      tv: fetchTv(tvPath),
      movies: fetchMovies(moviesPath)
    }
  }

  static normalizeNumber(nr = "") {
    const result = nr.match(/(\d+)/)
    if ( !result ) return -1
    return result[1] | 0
  }
}

module.exports = Parser
