module.exports = ({ database, logger, request, parser }) => {
  return {
    fetch (url) {
      return this.request(url).get('/')
    },
    parse (content) {
      return this.parser.parse(content)
    },
    save (data) {
      
    }
  }
}
