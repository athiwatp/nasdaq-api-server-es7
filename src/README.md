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
