import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog component test', () => {

  const blog = {
    title: 'Batman',
    author: 'Bruce Wayne',
    url: 'https://www.batman.com',
    likes: 62,
    user: {
      username: 'root'
    }
  }

  const currentUser = {
    username: 'root'
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} currentUser={currentUser} />
    )
  })

  test('component displaying a blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    expect(component.container).toHaveTextContent('Batman')
    expect(component.container).toHaveTextContent('Bruce Wayne')
    expect(component.container).not.toHaveTextContent('https://www.batman.com')
    expect(component.container).not.toHaveTextContent('62')
  })

  test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const showBtn = component.getByText('View')
    fireEvent.click(showBtn)
    expect(component.container).toHaveTextContent('https://www.batman.com')
    expect(component.container).toHaveTextContent('62')
  })

})