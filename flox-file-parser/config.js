const environment = process.env.NODE_ENV || "development"

const config = {
  development: {
    app: {
      host: "localhost",
      port: 3000
    }
  },
  test: {
    app: {
      host: "0.0.0.0",
      port: 3001
    }
  }
}

module.exports = (() => {
  return config[environment]
})()
