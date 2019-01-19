'use strict'

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.error(err);
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // deleteMany
    // db.collection('Todos').deleteMany({
    //     text: 'Something to do'
    // }).then(function (result) {
    //     console.log(result)
    // }).catch(function (err) {
    //     console.error(err)
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({
    //     text: 'It\'s a todo you know'
    // }).then(function (result) {
    //     console.log(result)
    // }).catch(function (err) {
    //     console.error(err)
    // })

    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({
        _id: new ObjectID('5c4398553aa984ec28af8784')
    }).then(function (result) {
        console.log(result)
    }).catch(function (err) {
        console.error(err)
    })

    client.close()
})