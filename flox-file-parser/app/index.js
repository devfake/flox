const Parser = require("./lib/parser")

module.exports = (app) => {
  app.get("/fetch_files", (req, res) => {
    const parser = new Parser
    const data = parser.fetch(__dirname + "/fixtures")
    res.send(data)
  })
}
