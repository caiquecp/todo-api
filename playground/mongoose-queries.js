'use strict'

const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const todoId = '5c6f1933b84ac734fc056abe'
const userId = '5c66d491ceabc4c131cd51b2'

// verify if todo id is valid - if so, get the todo; if not, print message
if (ObjectID.isValid(todoId)) {
  Todo
    .findById(todoId)
    .then(function (todo) {
      if (!todo)
        return console.log('todo not found; id:', todoId)

      console.log('todo', todo)
    })
    .catch(function (err) {
      if (err.message)
        return console.error(err.message)

      console.error(err)
    })
} else {
  console.log('todo: id not valid')
}

// verify if user id is valid - if so, get the todo; if not, print message
if (ObjectID.isValid(userId)) {
  User
    .findById(userId)
    .then(function (user) {
      if (!user)
        return console.log('user not found; id:', userId)

      console.log('user', user)
    })
    .catch(function (err) {
      if (err.message)
        return console.error(err.message)

      console.error(err)
    })
} else {
  console.log('user: id not valid')
}