const NODE_ENV = process.env.NODE_ENV || "development"
const mysql = require("mysql")
const config = require("../config/config.js")[NODE_ENV]

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password
})

const type = process.argv[2]
const allowedTypes = ["create", "drop"]

if(!type) {
  console.error("Missing type argument.")
  process.exit()
}

if(!allowedTypes.includes(type)) {
  console.error("Argument not allowed.")
  process.exit()
}

const query = `${type} database if ${type === "create" ? "not" : ""} exists ${config.database};`

connection.query(query, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Statement for ${config.database} successfully executed.`)
  }

  process.exit()
})
