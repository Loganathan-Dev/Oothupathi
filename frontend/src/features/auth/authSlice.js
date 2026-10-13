import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getStoredAuth = () => {
  try {
    return authService.getCurrentUser()
  } catch (error) {
    return { user: null, token: null, isAuthenticated: false }
  }
}

const storedAuth = getStoredAuth()

const initialState = {
  user: storedAuth.user || null,
  token: storedAuth.token || null,
  isAuthenticated: storedAuth.isAuthenticated || false,
  isLoading: false,
  error: null,
}

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed')
    }
  }
)

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Registration failed')
    }
  }
)

// Logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    authService.logout()
    return null
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearError, setCredentials } = authSlice.actions

// ✅ Alias export for compatibility
export const logout = logoutUser

export default authSlice.reducer