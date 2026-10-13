import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/oothupathi'
    
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`)
    console.error('💡 Make sure MongoDB is running:')
    console.error('   - Windows: net start MongoDB')
    console.error('   - Or use MongoDB Atlas')
    process.exit(1)
  }
}

export default connectDB