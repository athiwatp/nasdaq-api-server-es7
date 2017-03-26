const request = require('superagent')

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
  const parserService = require('./services/parserService')()
  const scheduleUpdateService = require('./services/scheduleUpdateService')({ database, logger, request, parser: parserService })
  const services = {
    stock: require('./services/stockService')({ database, logger })
  }

  // initialize routes
  app.use('/stock', require('./routes/stockRoute')(services))

  // start server
  app.listen(config.api.port, () => {
    logger.info(`[SERVER] server started on ::${config.api.port}`)
  })

  // tasks and schedule task
  async function fetchRunner () {
    const currentTime = new Date().toUTCString()
    const content = await scheduleUpdateService.fetch(config.task.fetchURL)
    const parsedData = scheduleUpdateService.parse(content)
    await scheduleUpdateService.save(parsedData)
    logger.info(`${currentTime} - fetched`)
  }
  await fetchRunner()
  setInterval(async () => {
    await fetchRunner()
  }, config.task.fetchInterval)

  process.on('exit', () => {
    app.close()
  })
}

main().catch((err) => {
  throw err
})
