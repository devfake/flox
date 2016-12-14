const Parser = require("./lib/parser")

module.exports = (app) => {
  app.get("/fetch_files", (req, res) => {
    res.send({})
  })
}
