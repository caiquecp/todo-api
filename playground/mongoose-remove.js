'use strict'

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '6c756be838bcc708f1c37a26'

Todo
  .findByIdAndDelete(id)
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.error(err)
  })