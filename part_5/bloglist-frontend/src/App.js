import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState({ message: null, type: null })
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async login => {
    try {
      const user = await loginService.login(login)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))      
      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      console.log(error)
      setNotification({ message: 'Wrong username or password. Please try again.', type: 'warning' })
      setTimeout(() => {
        setNotification({ message: null , type: null })
      }, 5000)      
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateBlog = async newBlog => {
    try {
      blogService.setToken(user.token)
      newBlogFormRef.current.toggleVisibility()

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setNotification({ message: `A new blog: ${response.title} by ${response.author} added`, type: 'notification' })
      setTimeout(() => {
        setNotification({ message: null , type: null })
      }, 5000)

    } catch (error) {
      console.log(error)
      setNotification({ message: 'Something went wrong. Please Try Again!', type: 'warning' })
      setTimeout(() => {
        setNotification({ message: null , type: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm login={handleLogin} />
  )

  const newBlogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={newBlogFormRef}>
      <NewBlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

  
  if (user === null) {
    return (
      <>
        <Notification message={notification.message} type={notification.type} />
        {loginForm()}
      </>
    )
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {newBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App