'use strict'

const {SHA256} = require('crypto-js')

const message = 'I\'m user number 3'
const hash = SHA256(message).toString()

console.log(`message: ${message}`)
console.log(`hash: ${hash}`)

const salt = 'donttrytofoolme'

const data = {
  id: 4
}

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + salt).toString()
}

token.data.id = 5
token.hash = SHA256(JSON.stringify(data)).toString()

const resultHash = SHA256(JSON.stringify(token.data) + salt).toString()

if (resultHash == token.hash) {
  console.log('data was not changed')
} else {
  console.log('data was changed, don\'t trust')
}