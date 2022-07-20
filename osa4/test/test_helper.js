const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Sali blogi",
    author: "Aku Ankka",
    url: "testi",
    likes: 5
  },
  {
    title: "Matkailu blogi",
    author: "Iines ankka",
    url: "testi",
    likes: 10
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'remove' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}