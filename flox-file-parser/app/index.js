const Parser = require("./lib/parser")

module.exports = (app) => {
  app.get("/fetch_files", (req, res) => {
    const parser = new Parser
    const data = parser.fetch()
    res.send(data)
  })

  app.get("/fetch_tv", (req, res) => {
    const parser = new Parser
    const data = parser.fetch()
    res.send(data.tv)
  })

  app.get("/fetch_movies", (req, res) => {
    const parser = new Parser
    const data = parser.fetch()
    res.send(data.movies)
  })
}
