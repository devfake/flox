const express = require("express")
const app = express()

const config = require("./config.js")
let port = config.app.port
let addr = config.app.host

if(!module.parent) { app.listen(port, addr) }
console.log("App is running on %s with port %d", addr, port)
console.log("TV_ROOT: ", process.env.TV_ROOT)
console.log("MOVIES_ROOT: ", process.env.MOVIES_ROOT)

if (!process.env.TV_ROOT || !process.env.MOVIES_ROOT)  {
  console.error("TV_ROOT and MOVIES_ROOT are both required to be set!")
  if(process.env.NODE_ENV !== "test") process.exit(1)
}

require("./app/index.js")(app)

module.exports = app
