const environment = process.env.NODE_ENV
const Config = require('./configs')
const Logger = require('./logger')
const Database = require('./database')
const Server = require('./server')

async function main () {
  // initialize dependencies
  const config = Config(environment)
  const logger = Logger(environment)
  const database = Database(config)

  // create server
  const app = Server(logger)

  // initialize services
  const services = {
    stock: require('./services/stockService')({ database, logger })
  }

  // initialize routes
  app.use('/stock', require('./routes/stockRoute')(services))

  // start server
  app.listen(config.api.port, () => {
    logger.info(`[SERVER] server started on ::${config.api.port}`)
  })

  // free resource if process is exit
  process.on('exit', () => {
    app.close()
  })
}

main().catch((err) => {
  throw err
})
