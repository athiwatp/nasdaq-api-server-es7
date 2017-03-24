const Promise = require('bluebird')
const express = require('express')

module.exports = ({ app, database, logger }) => {
  const route = express.Router()

  app.use('/stock', route)

  route.get('/:id/values', (req, res, next) => {
    const id = req.params.id
    res.json({ id })
  })
}
