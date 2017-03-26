## Sample API for Stock Market

This project apply dependency injection approach. 
Make it code more independent from dependencies and easy to write tests.


### Requirement

Node >= 7.6 because we use async/await syntax.


### Setup and Start

```
git clone git@github.com:khasathan/nasdaq-api-server-es7.git
cd nasdaq-api-server-es7
npm run start
```

The server will running on `http://localhost:10001` (for development environment).
You can access via browser or REST client. It should return JSON.

Example URLs:
```
http://localhost:10001/stock/nasdaq/values
http://localhost:10001/stock/s_and_p_500/values
```

Exsample result

```
{
  "name": "NASDAQ",
  "values": [
    {
      "label": "NASDAQ",
      "value": 5828.74,
      "created_at": "2017-03-26T08:46:59.000Z",
      "change": 11.05,
      "change_percent": 0.19,
      "high": 5858.95,
      "low": 5807.83,
      "label_norm": "nasdaq",
      "id": 21
    },
    {
      "label": "NASDAQ",
      "value": 5828.74,
      "created_at": "2017-03-26T07:53:55.000Z",
      "change": 11.05,
      "change_percent": 0.19,
      "high": 5858.95,
      "low": 5807.83,
      "label_norm": "nasdaq",
      "id": 11
    },
    {
      "label": "NASDAQ",
      "value": 5828.74,
      "created_at": "2017-03-26T07:43:55.000Z",
      "change": 11.05,
      "change_percent": 0.19,
      "high": 5858.95,
      "low": 5807.83,
      "label_norm": "nasdaq",
      "id": 1
    }
  ]
}
```


### How to test

#### Unit testing

```
npm run test:unit
```

#### End-to-End testing

**NOTE** MUST setup your database (MySQL) and create table first. We provide SQL files in `sql/` 
directory.

```
npm run test:e2e
```
