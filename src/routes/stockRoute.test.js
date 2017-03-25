/* eslint-env jest */

const Promise = require('bluebird')
const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const expect = require('chai').expect

const stockRoute = require('./stockRoute')

describe('#stock route', () => {
  const validResult = {
    name: 'NASDAQ',
    values: [
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
  const invalidResult = {
    name: 'ABC',
    values: []
  }
  const services = {
    stock: {
      getValuesByMarketName: (marketName) => {
        return Promise.resolve(marketName === 'NASDAQ' ? validResult : invalidResult)
      }
    }
  }
  const route = stockRoute(services)
  let app

  beforeAll(() => {
    app = express()
    app.use(bodyParser.json())
    app.use('/stock', route)
  })

  describe('stock values api', () => {
    it('should return result with not empty values', () => {
      return request(app)
        .get('/stock/NASDAQ/values')
        .expect(200)
    })

    it('should return result values with empty array', () => {
      return request(app)
        .get('/stock/ABC/values')
        .expect(200)
    })
  })
})
