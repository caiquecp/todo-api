'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid e-mail'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  const user = this
  const access = 'auth'

  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc@123').toString()

  user.tokens = user.tokens.concat([{
    access,
    token
  }])

  return user
    .save()
    .then(function () {
      return token
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = {
  User
}