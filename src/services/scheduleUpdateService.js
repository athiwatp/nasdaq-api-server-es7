module.exports = ({ database, logger, request, parser }) => {
  return {
    fetch (url) {
      logger.info(`fetching ${url}`)
      return request.get(url).then(res => res.text)
    },
    parse (content) {
      return parser.parse(content)
    },
    save (data) {
      return database('stock_values').insert(data)
    }
  }
}
