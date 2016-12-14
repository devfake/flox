const express = require("express")
const app = express()

const config = require("./config.js")
let port = config.app.port
let addr = config.app.host

if(!module.parent) { app.listen(port, addr) }
console.log("App is running on %s with port %d", addr, port)

require("./app/index.js")(app)

module.exports = app
