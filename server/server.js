'use strict'

const mongoose = require('mongoose')

// set built-in promises as the promise library used by mongoose
mongoose.Promise = global.Promise

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })

// set Todo model schema
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

// set User model schema
const User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
})

// const newTodo = new Todo({
//     text: 'Cook dinner'
// })

// newTodo.save()
//     .then(function (doc) {
//         console.log('Todo has been saved', doc)
//     }).catch(function (err) {
//         console.err(err)
//     })

// const oneMoreTodo = new Todo({
//     text: 'Commit changes'
// })

// oneMoreTodo.save()
//     .then(function (doc) {
//         console.log('Todo has been saved', doc)
//     }).catch(function (err) {
//         console.err(err)
//     })

const newUser = new User({
    email: 'caique@email.com'
})

newUser.save()
    .then(function (doc) {
        console.log('User has been saved', doc)
    }).catch(function (err) {
        console.err(err)
    })