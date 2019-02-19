'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

// declaring port through environment variables
const port = process.env.PORT || 3000

// create an Express app
const app = express()

// set body-parser as middleware for json
app.use(bodyParser.json())

// post "/todos" endpoint to create a new Todo
app.post('/todos', function (req, res) {
  if (!req.body.text)
    return res.status(400).send('Bad Request')

  const todo = new Todo({
    text: req.body.text
  })  

  todo
    .save()
    .then(function (doc) {
      res.send(doc)
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
})

// get "/todos" endpoint to get all Todos
app.get('/todos', function (req, res) {
  Todo
    .find()
    .then(function (todos) {
      res.send({
        todos
      })
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
})

// start listening to requests
app.listen(port, function () {
  console.log(`Server is running on port ${port}`)
})

module.exports = {
  app
}