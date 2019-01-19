'use strict'

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.error('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c4398523aa984ec28af8782')
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    }).then(function (result) {
        console.log(result)
    }).catch(function (err) {
        console.error(err)
    })

    client.close()
})