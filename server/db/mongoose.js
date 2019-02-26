'use strict'

const mongoose = require('mongoose')

// set built-in promises as the promise library used by mongoose
mongoose.Promise = global.Promise

const mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'

// connect to mongodb
mongoose.connect(mongoDBURI, { useNewUrlParser: true })

module.exports = {
  mongoose
}