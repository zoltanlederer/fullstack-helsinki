import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


describe('Blog component test', () => {

  const blog = {
    title: 'Batman',
    author: 'Bruce Wayne',
    url: 'https://www.batman.com',
    likes: 62,
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Batman')
    expect(component.container).toHaveTextContent('Bruce Wayne')
    expect(component.container).not.toHaveTextContent('https://www.batman.com')
    expect(component.container).not.toHaveTextContent('62')
  })

})