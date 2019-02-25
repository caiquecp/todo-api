'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

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
    .then(function (createdTodo) {
      res
        .status(201)
        .send({
          createdTodo
        })
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
      res
        .status(200)
        .send({
          todos
        })
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
})

// get "/todos" endpoint to get a Todo by its id
app.get('/todos/:id', function (req, res) {
  if (ObjectID.isValid(req.params.id) == false)
    return res.status(400).send('Bad Request')

  Todo
    .findById(req.params.id)
    .then(function (todo) {
      if (!todo)
        return res.status(404).send('Not Found')

      res
        .status(200)
        .send({
          todo
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