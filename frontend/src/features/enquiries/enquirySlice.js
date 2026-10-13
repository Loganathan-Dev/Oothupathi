import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const createEnquiry = createAsyncThunk(
  'enquiries/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/enquiries', data)
      return res.data.data.enquiry
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed')
    }
  }
)

export const fetchUserEnquiries = createAsyncThunk(
  'enquiries/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/enquiries/user')
      return res.data.data.enquiries || []
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed')
    }
  }
)

const enquirySlice = createSlice({
  name: 'enquiries',
  initialState: {
    enquiries: [],
    loading: false,
    submitting: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEnquiryError: (state) => {
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEnquiries.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserEnquiries.fulfilled, (state, action) => {
        state.loading = false
        state.enquiries = action.payload
      })
      .addCase(fetchUserEnquiries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createEnquiry.pending, (state) => {
        state.submitting = true
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.submitting = false
        state.enquiries.unshift(action.payload)
        state.success = true
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload
      })
  },
})

export const { clearEnquiryError } = enquirySlice.actions
export default enquirySlice.reducer