const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
  })
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  try {
    const user = await User.findById(request.user)

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)  

  } catch (error) {
    console.log(error)
    next(error)
  }
  
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === request.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      
      // remove the blog from blogs array in users document
      const user = await User.findById(request.user)      
      let newBlogs = user.blogs.filter((x) => x.toString() !== blog._id.toString())
      await user.updateOne({ blogs: newBlogs })

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
