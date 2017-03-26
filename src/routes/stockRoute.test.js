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
    name: '',
    values: []
  }
  const services = {
    stock: {
      getLabelValuesById: (id) => {
        return Promise.resolve(id === 1 ? validResult : invalidResult)
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
        .get('/stock/1/values')
        .expect(200)
        .then(res => {
          return expect(res.body.values).to.not.eql([])
        })
    })

    it('should return result values with empty array', () => {
      return request(app)
        .get('/stock/2/values')
        .expect(200)
        .then(res => {
          return expect(res.body.values).to.eql([])
        })
    })
  })
})
