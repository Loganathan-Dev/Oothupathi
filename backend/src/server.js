import app from './app.js'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`)
  console.log(`📍 http://localhost:${PORT}`)
  console.log(`📡 API Test: http://localhost:${PORT}/api/test`)
  console.log(`🏥 Health: http://localhost:${PORT}/health`)
  console.log(`\n✨ Ready to accept requests!\n`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err.message)
  console.error(err.stack)
  server.close(() => process.exit(1))
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err.message)
  console.error(err.stack)
  server.close(() => process.exit(1))
})

export default server