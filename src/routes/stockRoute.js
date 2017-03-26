const express = require('express')

module.exports = (services) => {
  const router = express.Router()

  router.get('/:id/values', (req, res, next) => {
    const id = req.params.id

    services.stock.getLabelValuesById(id)
      .then(result => {
        res.json(result)
        next()
      })
      .catch(next)
  })

  return router
}
