const fs = require("fs")
const path = require("path")
const db = require("../../database/models")

const { file_history } = db.sequelize.models
const { updateMovies } = require("./parser.movies.js")
const { updateTv } = require("./parser.tv.js")

const append = (model, status) => {
  const date = status === "added" ? model.createdAt : model.removed

  const base = {
    subtitles: model.subtitles,
    extension: model.extension,
    src: model.src,
    date: date,
    status: status,
    year: model.year,
    tags: model.tags ? model.tags.split(",") : [],
    filename: model.filename
  }

  if(model.category === "tv") {
    Object.assign(base, {
      episode_number: model.episode_number,
      season_number: model.season_number,
      tv_title: model.tv_title
    })
  }
  
  if(model.category === "movies") {
    Object.assign(base, {
      name: model.name
    })
  }

  return base
}

const fetch = (category, since) => {
  const query = {
    where: { category },
    order: "createdAt ASC"
  }

  if(since) {
    query.where.$and = {
      $or: {
        createdAt: { $gte: since },
        removed: { $gte: since },
      } 
    }
  }

  return file_history.findAll(query).then((res) => {
    const removed = []
    const added = []

    res.forEach((tv) => {
      if (since < tv.createdAt * 1) {
        added.push(append(tv, "added"))
      }

      if(since < tv.removed * 1) {
        removed.push(append(tv, "removed"))
      }
    })

    return [...added, ...removed]
      .sort((a, b) => a.date > b.date)
      .map((r) => {
        delete r.date
        return r
      })
  })
}

class Parser {
  fetch(since = null) {
    const tvUpdated = updateTv()
    const moviesUpdated = updateMovies()
    since = since * 1 //parse int

    return {
      tv: tvUpdated.then(() => {
        return fetch("tv", since)
      }),
      movies: moviesUpdated.then(() => {
        return fetch("movies", since)
      })
    }
  }
}

module.exports = Parser
