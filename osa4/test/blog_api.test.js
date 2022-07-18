const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs ids should be named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('if like is not specified set it to 0', async () => {
  const newBlog = {
    title: "Kuva blogi",
    author: "Mikki Hiiri",
    url: "testi"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
  const response = await api.get('/api/blogs')
  const thirdBlog = response.body[2]

  expect(thirdBlog.likes).toBe(0)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('specific blog is within the returned', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Sali blogi')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Kuva blogi",
    author: "Mikki Hiiri",
    url: "testi",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain('Kuva blogi')
})

test('a blog without title is not added', async () => {
  const newBlog = {
    author: "Pluto",
    url: "wwwasdkao",
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog without url is not added', async () => {
  const newBlog = {
    title: "test",
    author: "Pluto",
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('delete succeeds with valid id', async () =>{
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length -1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})