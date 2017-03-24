const knex = require('knex')

module.exports = (config) => {
  return knex({
    client: 'mysql',
    connection: {
      host: config.mysql.host,
      user: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.database
    }
  })
}
