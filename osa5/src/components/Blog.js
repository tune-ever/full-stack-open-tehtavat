import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)
  const blogUsername = props.blog.user.username
  const loggedUser = props.user.username

  const blog = props.blog
  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = async () => {
    await blogService.addLike(blog)
    props.updateBlogs()
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog}`)){
      const id = blog.id
      const token = JSON.parse(window.localStorage.loggedBlogappUser).token
      await blogService.removeBlog(id, token)
      props.updateBlogs()
    }
  }

  if(!showAll)
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  return (
    <div style={blogStyle}>
      {blog.title}<br/>
      {blog.url}<br/>
      {blog.likes}
      <button onClick={addLike}>like</button>
      <br/>
      {blog.author}
      <button onClick={toggleVisibility}>hide</button>
      <br/>
      {(blogUsername === loggedUser) 
      && <button onClick={handleDelete}>remove</button>
      }
    </div>
  )
}

export default Blog