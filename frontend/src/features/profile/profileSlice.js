import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

// Fetch profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile')
      return response.data.data.user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      )
    }
  }
)

// Update profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put('/profile', profileData)
      return response.data.data.user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      )
    }
  }
)

// Change password
export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put('/profile/password', passwordData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to change password'
      )
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    updating: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProfileError: (state) => {
      state.error = null
      state.success = false
    },
    resetSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update
      .addCase(updateProfile.pending, (state) => {
        state.updating = true
        state.error = null
        state.success = false
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false
        state.user = action.payload
        state.success = true
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.updating = true
        state.error = null
        state.success = false
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.updating = false
        state.success = true
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })
  },
})

export const { clearProfileError, resetSuccess } = profileSlice.actions
export default profileSlice.reducer