'use strict'

const mongoose = require('mongoose')

// set built-in promises as the promise library used by mongoose
mongoose.Promise = global.Promise

mongoose.set('useFindAndModify', false)

const mongoDBURI = process.env.MONGODB_URI

// connect to mongodb
mongoose.connect(mongoDBURI, { useNewUrlParser: true })

module.exports = {
  mongoose
}