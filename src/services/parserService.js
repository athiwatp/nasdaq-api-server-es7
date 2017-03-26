const cheerio = require('cheerio')

module.exports = () => {
  return {
    parse (content) {
      const $ = cheerio.load(content)
      const targetHTML = $('table[id="indexTable"] > script').html()
      const regex = /nasdaqHomeIndexChart.storeIndexInfo\((.*)\);/g
      const results = []
      let match

      while (match = regex.exec(targetHTML)) {
        const parsed = JSON.parse(`[${match[1]}]`)
        results.push({
          label: parsed[0],
          label_norm: this.clean(parsed[0]),
          value: Number(parsed[1]),
          change: Number(parsed[2]),
          change_percent: Number(parsed[3]),
          high: Number(parsed[5]),
          low: Number(parsed[6])
        })
      }

      return results
    },
    clean (orgText) {
      return orgText
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^\w\d\s-]+/g, '')
        .replace(/\s+/g, ' ')
        .replace(/-/g, '_')
        .replace(/\s/g, '_')
        .trim()
    }
  }
}
