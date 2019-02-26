module.exports = function (app) {
  const _ = require('lodash')
  const {ObjectID} = require('mongodb')
  const {Todo} = require('./../models/todo')

  // post "/todos" endpoint to create a new Todo
  const postTodo = app.post('/todos', function (req, res) {
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
  const getTodos = app.get('/todos', function (req, res) {
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

  // get "/todos/:id" endpoint to get a Todo by its id
  const getTodoById = app.get('/todos/:id', function (req, res) {
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

  // delete "/todos/:id" endpoint to delete a Todo by its id
  const deleteTodoById = app.delete('/todos/:id', function (req, res) {
    if (ObjectID.isValid(req.params.id) == false)
      return res.status(400).send('Bad Request')

    Todo
      .findByIdAndDelete(req.params.id)
      .then(function (deletedTodo) {
        if (!deletedTodo)
          return res.status(404).send('Not Found')

        res
          .status(200)
          .send({
            deletedTodo
          })
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
  })

  // patch "/todos/:id" endpoint to update a TODO byt its id and content sent
  const patchTodoById = app.patch('/todos/:id', function (req, res) {
    if (ObjectID.isValid(req.params.id) == false)
      return res.status(400).send('Bad Request')

    const body = _.pick(req.body, ['text', 'completed'])

    if (_.isBoolean(body.completed) && body.completed) {
      // todo: localize date
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }

    Todo
      .findByIdAndUpdate(req.params.id, {
        $set: body
      }, {
        new: true
      })
      .then(function (updatedTodo) {
        if (!updatedTodo)
          return res.status(404).send('Not Found')

        res
          .status(200)
          .send({
            updatedTodo
          })
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
  })

  return {
    getTodos,
    getTodoById,
    postTodo,
    patchTodoById,
    deleteTodoById
  }
}