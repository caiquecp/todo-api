const expect = require('expect')
const supertest = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../../server/server')
const {Todo} = require('./../../server/models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: 'Create my blog'
  }, {
    _id: new ObjectID(),
    text: 'Take a break to have lunch'
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
      .expect(201)
      .expect(function (res) {
        expect(res.body.createdTodo.text).toBe(todo.text)
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
  it('should return all todos', function (done) {
    supertest(app)
      .get('/todos')
      .expect(200)
      .expect(function (res) {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', function () {
  it('should return todo by its id', function (done) {
    const firstTodo = todos[0]

    supertest(app)
    .get(`/todos/${firstTodo._id.toHexString()}`)
    .expect(200)
    .expect(function (res) {
      expect(res.body.todo.text).toBe(firstTodo.text)
    })
    .end(done)
  })

  it('should return 404 if not found', function (done) {
    const unusedId = new ObjectID()

    supertest(app)
    .get(`/todos/${unusedId}`)
    .expect(404)
    .end(done)
  })

  it('should return 400 if id is invalid', function (done) {
    const invalidId = new ObjectID().toHexString() + 'abc'

    supertest(app)
    .get(`/todos/${invalidId}`)
    .expect(400)
    .end(done)
  })
})