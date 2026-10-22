import express from 'express'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import customizationRoutes from './routes/customizationRoutes.js'

const app = express()

// CORS configuration
const allowedOrigins = [
  'https://oothupathi.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.error('CORS blocked origin:', origin)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Parse request bodies
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Request logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'OK' })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/customization', customizationRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

export default app
