'use strict'

const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.error(err);
    }

    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // const filter = {
        
    // }

    // db.collection('Todos').find(filter).toArray().then(function (docs) {
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }).catch(function (err) {
    //     console.error(err)
    // })

    // db.collection('Todos').find(filter).count().then(function (count) {
    //     console.log('count: ', count)
    // }).catch(function (err) {
    //     console.error(err)
    // })

    const usersFilter = {
        name: 'Caique C Pereira'
    }

    db.collection('Users').find(usersFilter).toArray().then(function (docs) {
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch(function (err) {
        console.error(err)
    })

    client.close()
})