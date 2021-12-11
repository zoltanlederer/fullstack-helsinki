import React, { useState } from "react"

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = e => {
        e.preventDefault()
        createBlog ({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

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
            <button type="submit">Submit New Blog</button>
            </form>
        </div>
    )
}

export default NewBlogForm