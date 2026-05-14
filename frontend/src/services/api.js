import axios from 'axios'

const API = axios.create({
  baseURL:
    'https://expense-tracker-s74f.onrender.com/api',
})

// ADD TOKEN AUTOMATICALLY
API.interceptors.request.use(
  req => {
    const user = JSON.parse(
      localStorage.getItem('user')
    )

    if (user?.token) {
      req.headers.Authorization =
        `Bearer ${user.token}`
    }

    return req
  }
)

export default API