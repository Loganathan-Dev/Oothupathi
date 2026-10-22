import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

// Connect to MongoDB FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected')
    
    // Start server ONLY after successful connection
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`✨ Ready to accept requests!`)
    })
  })
  .catch((error) => {
    console.error('❌ MongoDB Error:', error.message)
    process.exit(1) // Stop the app if DB fails
  })