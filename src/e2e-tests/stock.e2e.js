/* eslint-env mocha */

const Promise = require('bluebird')
const request = require('supertest')
const expect = require('chai').expect

const environment = process.env.NODE_ENV
const Config = require('../configs')
const Database = require('../database')

describe('end-to-end test for api', () => {
  const apiURL = 'http://localhost:10002'
  let config
  let database

  before(() => {
    // initialize dependencies
    config = Config(environment)
    database = Database(config)

    // start actual server
    require('../')
  })

  describe('stock api', () => {
    beforeEach(() => {
      // insert sample data
      return database('stock_values').truncate().then(() => {
        return database('stock_values').insert([
          {
            label: 'NASDAQ',
            label_norm: 'nasdaq',
            value: 5000,
            created_at: '2017-03-25 16:00:00'
          },
          {
            label: 'NASDAQ',
            label_norm: 'nasdaq',
            value: 5100,
            created_at: '2017-03-25 16:10:00'
          },
          {
            label: 'NASDAQ',
            label_norm: 'nasdaq',
            value: 5200,
            created_at: '2017-03-25 16:20:00'
          },
          {
            label: 'ABC',
            label_norm: 'abc',
            value: 1500,
            created_at: '2017-03-25 16:00:00'
          },
          {
            label: 'ABC',
            label_norm: 'abc',
            value: 1510,
            created_at: '2017-03-25 16:10:00'
          }
        ])
      })
    })

    afterEach(() => {
      // clear sample data
      return database('stock_values').truncate()
    })

    it('should return 404', () => {
      return request(apiURL)
        .get('/stock/invalid_path')
        .expect(404)
    })

    it('should return list of values from db', () => {
      return request(apiURL)
        .get('/stock/nasdaq/values')
        .expect(200)
        .then((res) => {
          expect(res.body.name).to.be.equal('NASDAQ')
          expect(res.body.values.length).length.equal(3)
        })
    })
  })
})
