'use strict'

const express = require('express')
const bodyParser = require('body-parser')

// connects to mongodb
const {mongoose} = require('./db/mongoose')

// declaring port through environment variables (to work in different environments)
const port = process.env.PORT || 3000

// create an Express app
const app = express()

// set body-parser as middleware for json
app.use(bodyParser.json())

// create routes
const todoRoutes = require('./routes/todo')(app)

// start listening to requests
app.listen(port, function () {
  console.log(`Server is running on port ${port}`)
})

module.exports = {
  app
}