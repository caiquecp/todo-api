module.exports = function (app) {
  const _ = require('lodash')
  const {ObjectID} = require('mongodb')
  const {User} = require('./../models/user')

  // post "/users" endpoint to create a new User
  const postUser = app.post('/users', function (req, res) {
    const body = _.pick(req.body, ['email', 'password'])

    if (!body.email || !body.password)
      return res.status(400).send('Bad Request')

    const user = new User(body)

    user
      .save()
      .then(function (createdUser) {
        res
          .status(201)
          .send({
            createdUser
          })
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
  })

  return {
    postUser
  }
}