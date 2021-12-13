import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      <div>
        {blog.title}&nbsp;
        <button 
          onClick={() => setHiddenDetails(!hiddenDetails)}>
            {hiddenDetails ? 'View' : 'Hide'}
        </button>
        <div style={detailVisible}>
          {blog.url} <br />
          Likes: {blog.likes} <button>Like</button><br />
          {blog.author}
        </div>
      </div>
    </div> 
  )   
}

export default Blog