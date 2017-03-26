/* eslint-env jest */

const knex = require('knex')
const mockKnex = require('mock-knex')
const winston = require('winston')
const chai = require('chai')
const stockService = require('./stockService')

const expect = chai.expect
const tracker = mockKnex.getTracker()

describe('#stock service', () => {
  describe('getLabelValuesById()', () => {
    let logger
    let database

    beforeAll(() => {
      logger = winston
      database = knex({ client: 'mysql', debug: false });
      mockKnex.mock(database, 'knex@0.12');
    })

    beforeEach(() => {
      tracker.install()
    })

    afterEach(() => {
      tracker.uninstall()
    })

    it('should return label name with list of values', () => {
      tracker.on('query', (query, step) => {
        query.response([
          function firstStepQueryLabels () {
            return [
              {
                id: 1,
                name: 'NASDAQ'
              }
            ]
          },
          function secondStepQueryValues () {
            return [
              {
                value: 5555,
                created_at: '2017-03-25 10:30'
              },
              {
                value: 5432,
                created_at: '2017-03-25 11:00'
              }
            ]
          }
        ][step - 1]())
      })

      return stockService({ database, logger })
        .getLabelValuesById(1)
        .then(res => {
          return Promise.all([
            expect(res.name).to.be.eql('NASDAQ'),
            expect(res.values).to.not.eql([])
          ])
        })
    })

    it('should return label name as empty string with empty values', () => {
      tracker.on('query', (query, step) => {
        query.response([
          function firstStepQueryLabels () {
            return []
          },
          function secondStepQueryValues () {
            return []
          }
        ][step - 1]())
      })

      return stockService({ database, logger })
        .getLabelValuesById(2)
        .then(res => {
          return Promise.all([
            expect(res.name).to.be.eql(''),
            expect(res.values).to.eql([])
          ])
        })
    })
  })
})
