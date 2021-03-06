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
    blogService.getAll()
      .then(blogs => {
        setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // update Token if browser manually refreshed
      blogService.setToken(user.token)
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
      newBlogFormRef.current.toggleVisibility()

      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))

      // Update blog list on frontend
      blogService.getAll()
        .then(blogs => {
          setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
        })

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

  const handleLikes = async blog => {
    try {
      const updateBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
      await blogService.update(updateBlog)
      const update = await blogService.getAll()
      setBlogs( update.sort((a, b) => b.likes - a.likes) )
    } catch (error) {
      console.log(error)
      setNotification({ message: 'Sorry, Couldn\'t like the blog. Try again.', type: 'warning' })
      setTimeout(() => {
        setNotification({ message: null , type: null })
      }, 5000)
    }
  }

  const handleDelete = async blog => {
    try {
      if (window.confirm(`Remove blog "${blog.title} by ${blog.author}" ?`)) {
        await blogService.remove(blog)
        const update = await blogService.getAll()
        setBlogs( update.sort((a, b) => b.likes - a.likes) )
        setNotification({ message: `You successfully deleted "${blog.title}" blog.`, type: 'notification' })
        setTimeout(() => {
          setNotification({ message: null , type: null })
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      setNotification({ message: 'Sorry, Couldn\'t delete the blog. Try again.', type: 'warning' })
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
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} currentUser={user}/>
      )}

    </div>
  )
}

export default App