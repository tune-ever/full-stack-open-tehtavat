import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const blogFormRef = useRef()

  const updateBlogs = () => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }

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
  
  const createBlog = async (newBlog) => {
    const token = JSON.parse(window.localStorage.loggedBlogappUser).token
    blogFormRef.current.toggleVisibility()
    
    const response = await blogService.create(newBlog, token)
    setBlogs(blogs.concat(response.data))
    setNotification(`a new blog ${newBlog.title} was added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => {
    return ( 
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }
  
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>Create new blog</h2>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <br/>
      {
        blogs
         .sort((a, b) => b.likes - a.likes)
         .map(blog =><Blog 
            notification={notification} 
            setNotification={setNotification}
            updateBlogs={updateBlogs} 
            user={user} key={blog.id} 
            blog={blog}
          />)
      }
    </div>
  )
}


export default App
