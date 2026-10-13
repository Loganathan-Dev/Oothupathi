import express from 'express'
import {
  createEnquiry,
  getEnquiries,
  getUserEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createEnquiry)
router.get('/user', protect, getUserEnquiries)
router.get('/', protect, admin, getEnquiries)
router.get('/:id', protect, admin, getEnquiry)
router.put('/:id/status', protect, admin, updateEnquiryStatus)
router.delete('/:id', protect, admin, deleteEnquiry)

export default router