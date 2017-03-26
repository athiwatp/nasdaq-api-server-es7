/* eslint-env mocha */

const Promise = require('bluebird')
const request = require('supertest')
const expect = require('chai').expect

const environment = process.env.NODE_ENV
const Config = require('../configs')
const Database = require('../database')

describe('end-to-end test for api', () => {
  const apiURL = 'http://localhost:10003'
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
      return database('stock_labels').truncate().then(() => {
        return database('stock_labels').insert([
          {
            id: 1,
            name: 'NASDAQ'
          },
          {
            id: 2,
            name: 'SET'
          }
        ])
      }).then(() => {
        return database('stock_values').insert([
          {
            label_id: 1,
            value: 5000,
            created_at: '2017-03-25 16:00:00'
          },
          {
            label_id: 1,
            value: 5100,
            created_at: '2017-03-25 16:10:00'
          },
          {
            label_id: 1,
            value: 5200,
            created_at: '2017-03-25 16:20:00'
          },
          {
            label_id: 2,
            value: 1500,
            created_at: '2017-03-25 16:00:00'
          },
          {
            label_id: 2,
            value: 1510,
            created_at: '2017-03-25 16:10:00'
          }
        ])
      })
    })

    afterEach(() => {
      // clear sample data
      return database('stock_labels').truncate().then(() => {
        return database('stock_values').truncate()
      })
    })

    it('should return 404', () => {
      return request(apiURL)
        .get('/stock/invalid_path')
        .expect(404)
    })

    it('should return list of values from db', () => {
      return request(apiURL)
        .get('/stock/1/values')
        .expect(200)
        .then((res) => {
          expect(res.body.name).to.be.equal('NASDAQ')
          expect(res.body.values.length).length.equal(3)
        })
    })
  })
})
