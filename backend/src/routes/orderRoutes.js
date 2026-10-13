import express from 'express'
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

// Specific routes BEFORE dynamic :id routes
router.post('/', createOrder)
router.get('/', getOrders)
router.put('/:id/cancel', cancelOrder)
router.put('/:id/status', admin, updateOrderStatus)
router.get('/:id', getOrder)
router.delete('/:id', admin, deleteOrder)

export default router
