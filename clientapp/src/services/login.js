import axios from 'axios'
const baseUrl = '/api/guest'

const login = async credentials => {
  const response = await axios.get(baseUrl, {
    params: {
      ...credentials
    }
  })
  return response.data 
}

export default { login }