'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

// environment variables
const port = process.env.PORT || 3000

const app = express()

// set body-parser as middleware for json
app.use(bodyParser.json())

app.post('/todos', function (req, res) {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save().then(function (doc) {
        res.send(doc)
    }).catch(function (err) {
        res.status(500).send(err)
    })
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})