'use strict'

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.error('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, function (err, result) {
    //     if (err) {
    //         return console.error('Unable to insert todo')
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({
    //     name: 'Caique C Pereira ',
    //     age: 24,
    //     location: 'Sao Paulo, Brazil'
    // }, function (err, result) {
    //     if (err) {
    //         return console.error('Unable to insert user')
    //     }

    //     const user = result.ops[0]
        
    //     console.log(JSON.stringify(user, undefined, 2))
    //     console.log(user._id.getTimestamp())

    // })

    client.close()
})