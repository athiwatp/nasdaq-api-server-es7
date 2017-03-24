const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

module.exports = () => {
  const app = express()

  // middleware
  app.use(bodyParser.json())
  app.use(morgan('dev'))

  return app
}
