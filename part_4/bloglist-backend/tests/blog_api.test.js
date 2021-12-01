const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog lists are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('id is an identifier', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.id)
    // const firstId = contents[0]
    expect(contents[0]).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})