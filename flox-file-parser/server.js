const express = require("express")
const app = express()

const config = require("./config.js")
const { port, host } = config.app

if(!module.parent) { app.listen(port, host) }
console.log("App is running on %s with port %d", host, port)
console.log("TV_ROOT: ", process.env.TV_ROOT)
console.log("MOVIES_ROOT: ", process.env.MOVIES_ROOT)

if (!process.env.TV_ROOT || !process.env.MOVIES_ROOT)  {
  if(process.env.NODE_ENV !== "test") {
    console.error("TV_ROOT and MOVIES_ROOT are both required to be set!")
    process.exit(1)
  }
}

require("./app/index.js")(app)

module.exports = app
