import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateBlog = async e => {
    e.preventDefault()
    // setToke again if page manually refreshed
    blogService.setToken(user.token)

    const newBlog = { title, author, url }
    const response = await blogService.create(newBlog)
    console.log(response)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
  }

  const loginForm = () => {
    return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
              <div>
                  username
              <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
              />
              </div>
              <div>
                  password
                  <input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={({ target }) => setPassword(target.value)}
                  />
              </div>
              <button type="submit">Login</button>
          </form>
        </div>
      )
  }

  const newBlogForm = () => {
    return (
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
            Title
            <input 
              type="text"
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input 
              type="text"
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url
            <input 
              type="text"
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }

  
  if (user === null) {
    return (
      <>
        {loginForm()}
      </>
    )
  }

  return (
    <div>
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