import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, currentUser }) => {
  const [hiddenDetails, setHiddenDetails] = useState(true)

  const detailVisible = { display: hiddenDetails ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} &nbsp;
        <button
          onClick={() => setHiddenDetails(!hiddenDetails)}
        >
          {hiddenDetails ? 'View' : 'Hide'}
        </button>
      </div>
      {hiddenDetails ? null : (
        <div style={detailVisible}>
          {blog.url} <br />
          Likes: {blog.likes} &nbsp;
          <button
            onClick={() => handleLikes(blog)}
          >
            Like
          </button> <br />

          {blog.user.username === currentUser.username ?
            <p><button onClick={() => handleDelete(blog)}>Remove</button></p> :
            ''
          }
        </div>
      )}
      {blog.author}
    </div>
  )
}

export default Blog