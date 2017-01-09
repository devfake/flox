const environment = process.env.NODE_ENV || "development"

const { FP_HOST, FP_PORT } = process.env

const config = {
  development: {
    app: {
      host: FP_HOST || "127.0.0.1",
      port: FP_PORT || 3000
    }
  },
  test: {
    app: {
      host: FP_HOST || "0.0.0.0",
      port: FP_PORT || 3001
    }
  }
}

module.exports = (() => {
  return config[environment]
})()
