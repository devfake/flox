const Parser = require("./lib/parser")

const fetch = (req, res) => {
  const parser = new Parser
  const { tv, movies } = parser.fetch(req.params.timestamp)
  const allowedTypes = ["tv", "movies"]

  Promise.all([tv, movies]).then(([tv, movies]) => {
    const data = { tv, movies }

    if (allowedTypes.includes(req.params.type)) {
      return res.send(data[req.params.type])
    }

    res.send(data)
  })
}

module.exports = (app) => {
  app.get("/fetch/:type?", (req, res) => {
    fetch(req, res)
  })

  app.get("/fetch/:type/since/:timestamp?", (req, res) => {
    fetch(req, res)
  })
}
