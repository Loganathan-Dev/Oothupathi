import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import jobRoutes from './routes/jobRoutes.js'


dotenv.config()
connectDB()

const app = express()

// âœ… CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.options('*', cors())

// âœ… CRITICAL: Body parsers MUST come before routes!
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// âœ… Request logger (helpful for debugging)
app.use((req, res, next) => {
  console.log(`ðŸ“¡ ${req.method} ${req.originalUrl}`)
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('   Body:', JSON.stringify(req.body, null, 2))
  }
  next()
})

// âœ… Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/jobs', jobRoutes)

// Health
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'OK' })
})

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('âŒ Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

export default app
