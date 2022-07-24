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

export default { getAll, create }