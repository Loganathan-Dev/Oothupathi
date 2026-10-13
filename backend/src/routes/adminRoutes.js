import express from 'express'
import {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  toggleUserStatus,
  getAllOrders,
  adminUpdateOrderStatus,
  updatePaymentStatus,
  getSalesAnalytics,
} from '../controllers/adminController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// All admin routes require auth + admin role
router.use(protect, admin)

// Dashboard
router.get('/stats', getDashboardStats)
router.get('/analytics', getSalesAnalytics)

// Users
router.get('/users', getAllUsers)
router.get('/users/:id', getUserDetails)
router.put('/users/:id/role', updateUserRole)
router.put('/users/:id/status', toggleUserStatus)

// Orders
router.get('/orders', getAllOrders)
router.put('/orders/:id/status', adminUpdateOrderStatus)
router.put('/orders/:id/payment', updatePaymentStatus)

export default router