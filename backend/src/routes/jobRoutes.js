import express from 'express'
import {
  getJobs,
  getJob,
  applyToJob,
  createJob,
  updateJob,
  deleteJob,
  getAllJobsAdmin,
  getAllApplications,
  getMyApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/jobController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Specific routes FIRST
router.get('/applications/my', protect, getMyApplications)
router.get('/applications/all', protect, admin, getAllApplications)
router.put('/applications/:id', protect, admin, updateApplicationStatus)
router.delete('/applications/:id', protect, admin, deleteApplication)

router.get('/admin/all', protect, admin, getAllJobsAdmin)

// Public routes
router.get('/', getJobs)
router.post('/:id/apply', applyToJob)

// Admin job CRUD
router.post('/', protect, admin, createJob)

// Dynamic /:id routes LAST
router.get('/:id', getJob)
router.put('/:id', protect, admin, updateJob)
router.delete('/:id', protect, admin, deleteJob)

export default router
