const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
  })
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
  try {
    console.log('user blogs', user)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)  

  } catch (error) {
    console.log(error)
    next(error)
  }
  
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token  
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === decodedToken.id ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      res.status(400).send({ error: 'Not authorized to delete' })
    }

  } catch (error) {
    next(error)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(update.toJSON())  
  } catch (error) {
    next(error)
  }
    

})

module.exports = blogsRouter
