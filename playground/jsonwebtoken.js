'use strict'

const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

const secret = 'dont@tryt0f00lm3'

const data = {
  id: 10
}

const token = jwt.sign(data, secret)

const decodedToken = jwt.verify(token, secret)

console.log(token)
console.log(decodedToken)