import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm component test', () => {

  test('test form calls the event handler it received as props with the right details when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <NewBlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'Superman' }
    })

    fireEvent.change(author, {
      target: { value: 'Clark Kent' }
    })

    fireEvent.change(url, {
      target: { value: 'https://www.superman.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Superman')
    expect(createBlog.mock.calls[0][0].author).toBe('Clark Kent')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.superman.com')
  })

})