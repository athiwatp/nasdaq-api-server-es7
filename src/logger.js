const winston = require('winston')

module.exports = (environment) => {
  const { Logger, transports } = winston
  const logger = new Logger({
    transports: [
      new (transports.Console)({
        level: 'info'
      }),
      new (transports.File)({
        level: 'error',
        filename: `${__dirname}/logs/${environment}.error.log`
      })
    ]
  })

  return logger
}
