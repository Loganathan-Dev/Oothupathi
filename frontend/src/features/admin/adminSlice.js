import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'



// Dashboard
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/admin/stats')
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load stats')
    }
  }
)


// Jobs
export const fetchAllJobs = createAsyncThunk(
  'admin/fetchAllJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/jobs/admin/all')
      return res.data.data.jobs
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load jobs')
    }
  }
)

export const createJob = createAsyncThunk(
  'admin/createJob',
  async (jobData, { rejectWithValue }) => {   // ✅ Takes jobData
    try {
      const res = await api.post('/jobs', jobData)  // ✅ Sends it
      return res.data.data.job
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed')
    }
  }
)

export const updateJob = createAsyncThunk(
  'admin/updateJob',
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/jobs/${id}`, jobData)
      return res.data.data.job
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update job')
    }
  }
)

export const deleteJob = createAsyncThunk(
  'admin/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/jobs/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete job')
    }
  }
)

export const fetchAllApplications = createAsyncThunk(
  'admin/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/jobs/applications/all')
      return res.data.data.applications
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load applications')
    }
  }
)

export const updateApplicationStatus = createAsyncThunk(
  'admin/updateApplication',
  async ({ id, status, note }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/jobs/applications/${id}`, { status, note })
      return res.data.data.application
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update application')
    }
  }
)

// Analytics
export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async (period = '30', { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/analytics?period=${period}`)
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load analytics')
    }
  }
)

// Users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/admin/users')
      return res.data.data.users
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load users')
    }
  }
)

export const fetchUserDetails = createAsyncThunk(
  'admin/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/users/${userId}`)
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load user')
    }
  }
)

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/users/${userId}/role`, { role })
      return res.data.data.user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update role')
    }
  }
)

export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/users/${userId}/status`)
      return res.data.data.user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update status')
    }
  }
)

// Orders
export const fetchAllOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters)
      const res = await api.get(`/admin/orders?${params}`)
      return res.data.data.orders
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load orders')
    }
  }
)

export const adminUpdateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status, note, trackingNumber }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/orders/${orderId}/status`, {
        status,
        note,
        trackingNumber,
      })
      return res.data.data.order
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update order')
    }
  }
)

export const updatePaymentStatus = createAsyncThunk(
  'admin/updatePaymentStatus',
  async ({ orderId, paymentStatus, transactionId }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/orders/${orderId}/payment`, {
        paymentStatus,
        transactionId,
      })
      return res.data.data.order
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update payment')
    }
  }
)

// Products (using existing product API with admin auth)
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await api.post('/products', productData)
      return res.data.data.product
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create product')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/products/${id}`, productData)
      return res.data.data.product
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update product')
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete product')
    }
  }
)

export const fetchAllProducts = createAsyncThunk(
  'admin/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/products')
      return res.data.data.products
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load products')
    }
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    analytics: null,
    users: [],
    selectedUser: null,
    jobs: [],
applications: [],
    orders: [],
    products: [],
    loading: false,
    submitting: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null
      state.success = false
    },
    resetSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder

    // Jobs
.addCase(fetchAllJobs.fulfilled, (state, action) => {
  state.jobs = action.payload
})
.addCase(createJob.fulfilled, (state, action) => {
  state.jobs.unshift(action.payload)
  state.success = true
})
.addCase(updateJob.fulfilled, (state, action) => {
  const idx = state.jobs.findIndex((j) => j._id === action.payload._id)
  if (idx !== -1) state.jobs[idx] = action.payload
  state.success = true
})
.addCase(deleteJob.fulfilled, (state, action) => {
  state.jobs = state.jobs.filter((j) => j._id !== action.payload)
  state.success = true
})
// Applications
.addCase(fetchAllApplications.fulfilled, (state, action) => {
  state.applications = action.payload
})
.addCase(updateApplicationStatus.fulfilled, (state, action) => {
  const idx = state.applications.findIndex((a) => a._id === action.payload._id)
  if (idx !== -1) state.applications[idx] = action.payload
})
      // Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload.stats
        state.analytics = {
          recentOrders: action.payload.recentOrders,
          topProducts: action.payload.topProducts,
          statusBreakdown: action.payload.statusBreakdown,
          monthlyRevenue: action.payload.monthlyRevenue,
        }
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Analytics
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = { ...state.analytics, ...action.payload }
      })

      // Users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id)
        if (idx !== -1) state.users[idx] = action.payload
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id)
        if (idx !== -1) state.users[idx] = action.payload
      })

      // Orders
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(adminUpdateOrderStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o._id === action.payload._id)
        if (idx !== -1) state.orders[idx] = action.payload
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o._id === action.payload._id)
        if (idx !== -1) state.orders[idx] = action.payload
      })

      // Products
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload)
        state.success = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p._id === action.payload._id)
        if (idx !== -1) state.products[idx] = action.payload
        state.success = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload)
        state.success = true
      })
  },
})

export const { clearAdminError, resetSuccess } = adminSlice.actions
export default adminSlice.reducer