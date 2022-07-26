import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

test('Blog comp. renders blog and title but no url and likes', () => {

  const blog = {
    title: 'test',
    author: 'mikki',
    url: 'www',
    likes: 10
  }

  render(<Blog blog={blog}/>)

  const titleElement = screen.getByText('test')
  const authorElement = screen.getByText('mikki')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  expect(screen.queryByText('www')).toBeNull()
  expect(screen.queryByText('10')).toBeNull()

  expect(titleElement).toHaveTextContent('test')
  expect(authorElement).toHaveTextContent('mikki')
})

test('when button pressed show url and likes too', async () => {
  const blog = {
    title: 'test',
    author: 'mikki',
    url: 'www',
    likes: 10,
    user: { username: 'Mikki' }
  }

  const mockUser = { username: 'Mikki' }

  render(<Blog blog={blog} user={mockUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const titleElement = screen.getByTestId('title')
  const authorElement = screen.getByTestId('author')
  const urlElement = screen.getByTestId('url')
  const likesElement = screen.getByTestId('likes')

  expect(titleElement).toContainHTML('test')
  expect(authorElement).toContainHTML('mikki')
  expect(urlElement).toContainHTML('www')
  expect(likesElement).toContainHTML('10')
})

test('if like is pressed twice then updateBlogs is called twice', async () => {
  const blog = {
    title: 'asd',
    author: 'joku',
    user: { username: 'Mikki' }
  }

  const mockUser = { username: 'Mikki' }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={mockUser} updateblogs={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})