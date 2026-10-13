import { sendResponse } from '../utils/response.js'

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error('Error:', err)

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return sendResponse(res, 400, false, `${field} already exists`)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message)
    return sendResponse(res, 400, false, errors.join(', '))
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendResponse(res, 401, false, 'Invalid token')
  }

  if (err.name === 'TokenExpiredError') {
    return sendResponse(res, 401, false, 'Token expired')
  }

  return sendResponse(res, statusCode, false, message)
}

export const notFound = (req, res) => {
  return sendResponse(res, 404, false, `Route not found: ${req.originalUrl}`)
}