const fs = require('fs')

// initialize dependencies
const environment = process.env.NODE_ENV
const config = require('./configs')(environment)
const logger = require('./logger')(environment)
const database = require('./database')(config)
const server = require('./server')

async function main () {
  const app = server(logger)
  const routeDependencies = {
    app,
    database,
    logger
  }
  const workingDirectory = __dirname

  fs.readdirSync(`${workingDirectory}/routes`).forEach((route) => {
    require(`${workingDirectory}/routes/${route}`)(routeDependencies)
  })

  app.listen(config.api.port, () => {
    logger.info(`[SERVER] server started on ::${config.api.port}`)
  })

  process.on('exit', () => {
    app.close()
  })
}

main().catch((err) => {
  throw err
})
