import React, { createContext, useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, logoutUser } from '../features/auth/authSlice'
import authService from '../features/auth/authService'

const AuthContext = createContext()

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { user, token, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const initAuth = () => {
      try {
        const userData = authService.getCurrentUser()
        if (userData.isAuthenticated && userData.user && userData.token) {
          dispatch(setCredentials({
            user: userData.user,
            token: userData.token,
          }))
        }
      } catch (error) {
        console.error('Auth init error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext