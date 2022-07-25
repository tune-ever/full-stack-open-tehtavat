import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog, token) => 
axios.post(baseUrl, newBlog, 
  { headers: 
    { 'Authorization': `Bearer ${token}`}
  }
)
.then(response => response)

const addLike = async (blog) => {
  console.log(blog)
  const updateBlog = {
    user: blog.user.id,
    likes: blog.likes +1,
    author: blog.author,
    url: blog.url
  }
  await axios.put(`/api/blogs/${blog.id}`, updateBlog)
}

const removeBlog = async (id, token) => {
  await axios.delete(`/api/blogs/${id}`, 
  { headers: { 'Authorization': `Bearer ${token}`}})
}

export default { getAll, create, addLike, removeBlog }