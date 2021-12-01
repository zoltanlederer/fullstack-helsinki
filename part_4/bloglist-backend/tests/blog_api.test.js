const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: '1111111',
        title: 'JavaScript info',
        author: 'Mia Liu',
        url: 'https://javascript.info/',
        likes: 23,
    },
    {
        id: '2222222',
        title: 'Fullstack open',
        author: 'Michael Bond',
        url: 'http://www.fullstackopen.com',
        likes: 32,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blog lists are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is an identifier', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.id)
    expect(contents[0]).toBeDefined()
})


test('a valid blog post can be added', async () => {
    const newPost = {
        title: 'The Truth',
        author: 'Miss Hanna',
        likes: 5,
      }
    
    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(r => r.title)
    console.log(titles)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('The Truth')
})

afterAll(() => {
    mongoose.connection.close()
  })