const e = require("cors")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length > 0)
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  else
    return {}
}

const mostLikes = (blogs) => {
  if(blogs.length === 0)
    return undefined
  const authors = {}
  const result = {
    author: "",
    likes: 0
  }
  blogs.map(blog => {
    const currentAuthor = blog.author
    const currentLikes = blog.likes
    if(!(authors.hasOwnProperty(currentAuthor)))
      authors[currentAuthor] = currentLikes
    else{
      authors[currentAuthor] += currentLikes
    }
    if(authors[currentAuthor] > result.likes){
      result.author = currentAuthor
      result.likes = authors[currentAuthor]
    }
  })
  return result
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0)
    return undefined
  const authors = {}
  const result = {
    author: "",
    blogs: 0
  }
  blogs.map(blog => {
    const currentAuthor = blog.author
    if(!(authors.hasOwnProperty(currentAuthor)))
      authors[currentAuthor] = 1
    else
      authors[currentAuthor] += 1
    if(authors[currentAuthor] > result.blogs){
      result.blogs = authors[currentAuthor]
      result.author = currentAuthor
    }
  })
  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}