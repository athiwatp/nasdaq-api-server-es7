module.exports = ({ database, logger }) => {
  return {
    async getLabelValuesById (id) {
      const values = await this.getValuesByLabelId(id)

      if (values.length < 1) return { name: '', values: [] }

      return {
        name: values[0].label,
        values
      }
    },
    getValuesByLabelId (id, limit = 50) {
      return database
        .select()
        .from('stock_values')
        .where('stock_values.label_norm', '=', id)
        .orderBy('stock_values.created_at', 'desc')
        .limit(limit)
    }
  }
}
