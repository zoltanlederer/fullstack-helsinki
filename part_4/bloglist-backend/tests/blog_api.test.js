const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
        title: 'JavaScript info',
        author: 'Mia Liu',
        url: 'https://javascript.info/',
        likes: 23,
    },
    {
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

describe('when there is initially some blog posts saved', () => {
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
})


describe('addition of a new blog post', () => {
    test('a valid blog post can be added', async () => {
        const getToken = async () => {
            const user = await User.findOne({ username: 'root' })            
            const userForToken = {
                username: user.username,
                id: user._id
            }            
            return 'bearer ' + jwt.sign(userForToken, process.env.SECRET)
        }

        const newPost = {
            title: 'The Truth',
            author: 'Miss Hanna',
            url: 'http://www.thetruth.com',
            likes: 5,
        }
        
        await api
            .post('/api/blogs')
            .send(newPost)
            .set('Authorization', await getToken())
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(r => r.title)
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain('The Truth')
    })

    test('the likes property is missing from the request when blog post added', async () => {
        const getToken = async () => {
            const user = await User.findOne({ username: 'root' })            
            const userForToken = {
                username: user.username,
                id: user._id
            }            
            return 'bearer ' + jwt.sign(userForToken, process.env.SECRET)
        }

        const newPost = {
            title: 'Interstellar',
            author: 'Thomas Gilligan',
            url: 'http://www.interstellar.com'
        }
        
        await api
            .post('/api/blogs')
            .send(newPost)
            .set('Authorization', await getToken())
            .expect(200)
    
        const testPost = await Blog.findOne({ title: 'Interstellar' })
        expect(testPost.likes).toBe(0)
    })

    test('verifies that if the title and url properties are missing from the request data', async () => {
        const getToken = async () => {
            const user = await User.findOne({ username: 'root' })            
            const userForToken = {
                username: user.username,
                id: user._id
            }            
            return 'bearer ' + jwt.sign(userForToken, process.env.SECRET)
        }

        const newPost = {
            author: 'Bob Ross',
            likes: 48
        }
        
        await api
            .post('/api/blogs')
            .send(newPost)
            .set('Authorization', await getToken())
            .expect(400)
    })    
})

describe('deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const getToken = async () => {
            const user = await User.findOne({ username: 'root' })            
            const userForToken = {
                username: user.username,
                id: user._id
            }            
            return 'bearer ' + jwt.sign(userForToken, process.env.SECRET)
        }

        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]
        console.log('blogToDelete', blogToDelete)
        // console.log('blogToDelete 0', blogToDelete[0])
        console.log('blogToDelete ID', blogToDelete.id)
        const token = await getToken()
        console.log('token', token)

    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', await getToken())
          .expect(204)
    
        const blogsAtEnd = await Blog.find({})
    
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    
        const titles = blogsAtEnd.map(r => r.title)
    
        expect(titles).not.toContain(blogToDelete.title)
      })
})


describe('updating of an existed blog post', () => {
    test('update the amount of likes for a blog post', async () => {
        const blog = await Blog.find({})
        const blogToUpdate = blog[0]
        const blogUpdate = {
            ...blogToUpdate,
            likes: 99,
        }

        await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogUpdate)
        .expect(200)

        const blogAfterUpdate = await Blog.find({})
        const checkNewLikes = blogAfterUpdate[0].likes
        expect(checkNewLikes).toBe(99)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })
