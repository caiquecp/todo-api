'use strict'

const mongoose = require('mongoose')

// set built-in promises as the promise library used by mongoose
mongoose.Promise = global.Promise

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })

module.exports = {
  mongoose
}