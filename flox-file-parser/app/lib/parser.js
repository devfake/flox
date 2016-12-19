const fs = require("fs")
const path = require("path")

const supportedSubtitleFileTypes = ["srt"]
const supportedVideoFileTypes = ["mkv", "mp4"]

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
  }).filter(e => e !== false)
}

const normalizePaths = (rootPath) => {
  const tvPath = path.normalize(rootPath + "/tv/")
  const moviesPath = path.normalize(rootPath + "/movies/")

  return {
    tvPath,
    moviesPath
  }
}

class Parser {
  fetch(rootPath) {
    if(!rootPath || typeof rootPath != "string") throw(Error)
    const { tvPath, moviesPath } = normalizePaths(rootPath)
    const result = {} 

    result.tv = fetchTv(tvPath)
    result.movies = {}

    return result
  }

  static normalizeNumber(nr = "") {
    const result = nr.match(/(\d+)/)
    if ( !result ) return -1
    return result[1] | 0
  }
}

module.exports = Parser
