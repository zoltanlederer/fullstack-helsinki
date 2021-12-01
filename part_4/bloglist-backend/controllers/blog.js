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
  
  blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    
    try {
      const saveBlog = await blog.save()
      response.json(saveBlog)  
    } catch (error) {
      console.log(error)
      next(error)
    }
    

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
  })

  module.exports = blogsRouter