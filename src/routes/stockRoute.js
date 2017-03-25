const express = require('express')

module.exports = (services) => {
  const router = express.Router()

  router.get('/:name/values', (req, res, next) => {
    const name = req.params.name

    services.stock.getValuesByMarketName(name)
      .then((values) => {
        res.json({
          name,
          values
        })
      })
      .catch(next)
  })

  return router
}
