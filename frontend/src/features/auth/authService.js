import api from '../../services/api'

const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      
      if (response.data?.success) {
        const { user, token } = response.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return { user, token }
      }
      throw new Error(response.data?.message || 'Login failed')
    } catch (error) {
      const message = 
        error?.response?.data?.message || 
        error?.message || 
        'Login failed'
      throw new Error(message)
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      
      if (response.data?.success) {
        const { user, token } = response.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return { user, token }
      }
      throw new Error(response.data?.message || 'Registration failed')
    } catch (error) {
      const message = 
        error?.response?.data?.message || 
        error?.message || 
        'Registration failed'
      throw new Error(message)
    }
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (userStr && token) {
        return {
          user: JSON.parse(userStr),
          token,
          isAuthenticated: true,
        }
      }
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      }
    } catch (error) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      }
    }
  },
}

export default authService