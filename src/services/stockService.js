module.exports = ({ database, logger }) => {
  return {
    getValuesByMarketName (marketName) {
      return database.select().from('stock_values')
    }
  }
}
