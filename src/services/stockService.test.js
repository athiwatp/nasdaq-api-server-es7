/* eslint-env jest */

const knex = require('knex')
const mockKnex = require('mock-knex')
const winston = require('winston')
const chai = require('chai')
const stockService = require('./stockService')

const expect = chai.expect
const tracker = mockKnex.getTracker()

describe('#stock service', () => {
  tracker.install()

  describe('getValuesByMarketName()', () => {
    beforeAll(() => {
      tracker.on('query', (query) => {
        const result = {
          name: 'NASDAQ',
          values: []
        }
        query.response(result)
      })
    })

    it('should return list of values when query by market name', () => {
      const logger = winston
      const database = knex({ client: 'mysql', debug: false });
      mockKnex.mock(database, 'knex@0.12');
      const service = stockService({ database, logger })

      return service.getValuesByMarketName('NASDAQ').then((result) => {
        expect(result).to.be.eql({
          name: 'NASDAQ',
          values: []
        })
      })
    })
  })
})
