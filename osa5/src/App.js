import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const setErrorMessage = (message) => {
    setNotification(message)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = JSON.parse(window.localStorage.loggedBlogappUser).token
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(blogObject, token)
    setNotification(`a new blog ${blogObject.title} was added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  const blogForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input 
          type="text" 
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input 
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
  

  if (!user) {
    return (
      <div>
        {
        notification && 
        <div className='error'>{notification}</div>
        }
        <h2>Log in to app</h2>
        {
        loginForm ()
        }
      </div>
    )
  }
  return (
    <div>
      {
        notification &&
        <div className='notification'>{notification}</div>
      }
      <h2>blogs</h2>
      logged in as {user.username} 
      <button onClick={handleLogout}>Logout</button>
      <h2>Create new blog</h2>
      {blogForm ()}
      {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
    </div>
  )
}


export default App
