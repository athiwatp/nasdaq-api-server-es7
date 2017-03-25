const express = require('express')

module.exports = (services) => {
  const router = express.Router()

  router.get('/:id/values', (req, res, next) => {
    const id = req.params.id

    services.stock.getValuesByMarketId(id)
      .then((rows) => {
        if (rows.length < 1) {
          res.json({ name: null, values: [] })
        } else {
          res.json({ name: rows[0].name, values: rows })
        }
        next()
      })
      .catch(next)
  })

  return router
}
