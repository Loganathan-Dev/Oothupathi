import express from 'express'
import {
  createCustomRequest,
  getMyCustomRequests,
  getAllCustomRequests,
  getCustomRequest,
  updateCustomRequestStatus,
  deleteCustomRequest,
} from '../controllers/customizationController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// ⚠️ Order matters — specific routes first
router.get('/my', protect, getMyCustomRequests)
router.post('/', protect, createCustomRequest)
router.get('/', protect, admin, getAllCustomRequests)
router.put('/:id/status', protect, admin, updateCustomRequestStatus)
router.get('/:id', protect, getCustomRequest)
router.delete('/:id', protect, deleteCustomRequest)

export default router
