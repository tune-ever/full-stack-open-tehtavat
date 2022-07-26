import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  const blog = props.blog
  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title}`)){
      const id = blog.id
      const token = JSON.parse(window.localStorage.loggedBlogappUser).token
      await blogService.removeBlog(id, token)
      props.updateBlogs()
    }
    props.setNotification(`${blog.title} was removed`)
    setTimeout(() => {
      props.setNotification(null)
    }, 5000)
  }

  if(!showAll)
    return(
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  return (
    <div style={blogStyle}>
      <div data-testid='title'>{blog.title}</div><br/>
      <div data-testid='url'>{blog.url}</div><br/>
      <div data-testid='likes'>{blog.likes}</div>
      <button onClick={() => props.addLike(blog)}>like</button>
      <br/>
      <div data-testid='author'>{blog.author}</div>
      <button onClick={toggleVisibility}>hide</button>
      <br/>
      {(props.blog.user.username === props.user.username)
      && <button onClick={handleDelete}>remove</button>
      }
    </div>
  )
}

export default Blog