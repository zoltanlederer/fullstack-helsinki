const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.username.length < 3){
      return response.status(400)
        .json({error: 'Username should be at least 3 characters'})
  }

  if (body.password.length < 3){
    return response.status(400)
        .json({error: 'Password should be at least 3 characters'})
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)    

  } catch (error) {
    next(error)
  }
  
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1,  title: 1, author: 1, })
    response.json(users.map((user) => user.toJSON()))
})

module.exports = usersRouter