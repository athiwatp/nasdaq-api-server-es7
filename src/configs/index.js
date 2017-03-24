const testing = require('./testing')
const development = require('./development')
const production = require('./production')

module.exports = (env) => {
  switch (env) {
  case 'production':
    return production
  case 'testing':
    return testing
  case 'development':
  default:
    return development
  }
}
