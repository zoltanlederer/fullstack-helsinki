const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
  })
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
    const saveBlog = await blog.save()
    response.json(saveBlog)

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
  })

  module.exports = blogsRouter