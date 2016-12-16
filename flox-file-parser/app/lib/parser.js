const fs = require("fs")
const path = require("path")

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
    const episodes = []
    const season = { 
      season_number: Parser.normalizeNumber(seasonName)
    } 

    const episodesPath = path + "/" + seasonName
    addEpisodesToSeason(episodesPath, season)

    tv.seasons.push(season)
  })
}

const addEpisodesToSeason = (path, season) => {
  const episode_files = fs.readdirSync(path)

  season.episodes = episode_files.map((e) => {
    return {
      episode_number: Parser.normalizeNumber(e),
      src: fs.realpathSync(path + "/" + e) 
    }
  })
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
