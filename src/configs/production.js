module.exports = {
  api: {
    env: 'production',
    name: process.env.API_NAME || 'Simple RESTful',
    port: process.env.API_PORT || 10000
  },
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: process.env.MYSQL_DB || 'stock_exchange_prod'
  },
  jwt: {
    secret: process.env.JWT_SECRET || ''
  }
}
