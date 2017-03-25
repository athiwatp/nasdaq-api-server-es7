module.exports = ({ database, logger }) => {
  return {
    getValuesByMarketId (id, limit = 50) {
      return database
        .select()
        .from('stock_values')
        .innerJoin('stock_markets', 'stock_values.market_id', '=', 'stock_markets.id')
        .where('stock_markets.id', '=', id)
        .orderBy('stock_values.created_at', 'desc')
        .limit(limit)
    }
  }
}
