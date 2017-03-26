/* eslint-env jest */

const expect = require('chai').expect
const parserService = require('./parserService')

describe('# parser service', () => {
  describe('parse()', () => {
    it('should parse text into object properly', (done) => {
      const service = parserService()
      const content = `
        <table id="indexTable" class="floatL marginB5px">
          <thead>
          <tr>
              <th>Index</th>
              <th>Value</th>
              <th>Change Net / %</th>
          </tr>
          </thead>
          <script type="text/javascript">
          //<![CDATA[

          nasdaqHomeIndexChart.storeIndexInfo("NASDAQ","5828.74","11.05","0.19","1,887,983,439","5858.95","5807.83");

          //]]>
           nasdaqHomeIndexChart.displayIndexes();
          </script>
        </table>
      `
      expect(service.parse(content)).to.be.eql([
        {
          label: 'NASDAQ',
          label_norm: 'nasdaq',
          value: 5828.74,
          change: 11.05,
          change_percent: 0.19,
          high: 5858.95,
          low: 5807.83
        }
      ])
      done()
    })
  })

  describe('clean()', () => {
    it('should clean up properly', () => {
      const service = parserService()
      return Promise.all([
        expect(service.clean('NASDAQ')).to.be.eql('nasdaq'),
        expect(service.clean('S&P 500')).to.be.eql('s_and_p_500'),
        expect(service.clean('NASDAQ (XX)')).to.be.eql('nasdaq_xx')
      ])
    })
  })
})
