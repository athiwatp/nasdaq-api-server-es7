module.exports = ({ database, logger }) => {
  return {
    async getLabelValuesById (id) {
      const labels = await this.getLablesById(id)

      if (labels.length < 1) return { name: '', values: [] }

      const values = await this.getValuesByLabelId(id)

      return {
        name: labels[0].name,
        values
      }
    },
    getValuesByLabelId (id, limit = 50) {
      return database
        .select()
        .from('stock_values')
        .where('stock_values.label_id', '=', id)
        .orderBy('stock_values.created_at', 'desc')
        .limit(limit)
    },
    getLablesById (id) {
      return database
        .select()
        .from('stock_labels')
        .where('stock_labels.id', '=', id)
        .limit(1)
    }
  }
}
