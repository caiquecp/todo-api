const expect = require('expect')
const supertest = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [
  {
    text: 'Test 1'
  }, {
    text: 'Test 2'
  }
]

beforeEach(function (done) {
  Todo
    .deleteMany({})
    .then(function () {
      return Todo.insertMany(todos)
    })
    .then(function () {
      done()
    })
    .catch(function (err) {
      done(err)
    })
})

describe('POST /todos', function () {
  it('should create a new todo', function (done) {
    const todo = {
      text: 'Test todo text'
    }

    supertest(app)
      .post('/todos')
      .send(todo)
      .expect(200)
      .expect(function (res) {
        expect(res.body.text).toBe(todo.text)
      })
      .end(function (err, res) {
        if (err)
          return done(err)

        Todo
          .find(todo)
          .then(function (todos) {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(todo.text)
            done()
          })
          .catch(function (err) {
            done(err)
          })
      })
  })

  it('should not create with invalid body data', function (done) {
    const invalidTodo = {
      invalidData: -1
    }

    supertest(app)
      .post('/todos')
      .send(invalidTodo)
      .expect(400)
      .end(function (err, res) {
        if (err)
          return done(err)

        Todo
          .find()
          .then(function (todos) {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(function (err) {
            done(err)
          })
      })
  })
})

describe('GET /todos', function () {
  it('should get all todos', function (done) {
    supertest(app)
      .get('/todos')
      .expect(200)
      .expect(function (res) {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})