const Parser = require("./lib/parser")

module.exports = (app) => {
  app.get("/fetch/:type?", (req, res) => {
    const parser = new Parser
    const { tv, movies } = parser.fetch()
    const allowedTypes = ["tv", "movies"]

    Promise.all([tv, movies]).then(([tv, movies]) => {
      const data = { tv, movies }

      if (allowedTypes.includes(req.params.type)) {
        return res.send(data[req.params.type])
      }

      res.send(data)
    })
  })
}
