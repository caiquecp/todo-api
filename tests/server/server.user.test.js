const expect = require('expect')
const supertest = require('supertest')

const {app} = require('./../../server/server')
const {User} = require('./../../server/models/user')

describe('POST /users', function () {
  it('should create a new user and return it', function (done) {
    const user = {
      email: 'user@email.com',
      password: 'SrSUhiM3'
    }

    supertest(app)
      .post('/users')
      .send(user)
      .expect(201)
      .expect(function (res) {
        expect(res.body.createdUser.email).toBe(user.email)
        expect(res.body.createdUser.password).toBe(user.password)
      })
      .end(function (err, res) {
        if (err)
          return done(err)

        User
          .find(user)
          .then(function (users) {
            expect(users.length).toBe(1)
            expect(users[0].email).toBe(user.email)
            expect(users[0].password).toBe(user.password)
            done()
          })
          .catch(function (err) {
            done(err)
          })
      })
  })
})