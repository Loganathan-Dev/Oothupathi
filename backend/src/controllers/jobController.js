import Job from '../models/Job.js'
import Application from '../models/Application.js'

// ============ PUBLIC ROUTES ============

// @desc    Get all active jobs
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const { department, type, search } = req.query
    const filter = { isActive: true }

    if (department) filter.department = department
    if (type) filter.employmentType = type
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const jobs = await Job.find(filter).sort('-isFeatured -createdAt')
    res.json({ success: true, count: jobs.length, data: { jobs } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single job
// @route   GET /api/jobs/:id
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    job.views = (job.views || 0) + 1
    await job.save()
    res.json({ success: true, data: { job } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    if (!job.isActive) {
      return res.status(400).json({ success: false, message: 'Position is closed' })
    }

    const {
      name, email, phone, experience, currentCompany,
      expectedSalary, noticePeriod, coverLetter,
      resumeUrl, portfolioUrl, linkedinUrl,
    } = req.body

    if (!name || !email || !phone || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, and cover letter',
      })
    }

    const application = await Application.create({
      job: job._id,
      name, email, phone, experience, currentCompany,
      expectedSalary, noticePeriod, coverLetter,
      resumeUrl, portfolioUrl, linkedinUrl,
    })

    job.applicationsCount = (job.applicationsCount || 0) + 1
    await job.save()

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application },
    })
  } catch (error) {
    console.error('Apply error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ============ ADMIN ROUTES ============

// @desc    Create job (admin)
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  try {
    // âœ… Debug logs
    console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•')
    console.log('ðŸ“¥ createJob received body:')
        console.log('ðŸ“¥ Content-Type:', req.headers['content-type'])
    console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•')

    // âœ… Validate required fields
    const { title, description, location, experience, employmentType, department } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' })
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: 'Description is required' })
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ success: false, message: 'Location is required' })
    }
    if (!experience || !experience.trim()) {
      return res.status(400).json({ success: false, message: 'Experience is required' })
    }
    if (!employmentType) {
      return res.status(400).json({ success: false, message: 'Employment type is required' })
    }
    if (!department) {
      return res.status(400).json({ success: false, message: 'Department is required' })
    }

    // âœ… Build clean payload
    const jobData = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      experience: experience.trim(),
      employmentType,
      department,
      openings: Number(req.body.openings) || 1,
      isActive: req.body.isActive !== false,
      isFeatured: req.body.isFeatured === true,
      responsibilities: Array.isArray(req.body.responsibilities) ? req.body.responsibilities : [],
      requirements: Array.isArray(req.body.requirements) ? req.body.requirements : [],
      benefits: Array.isArray(req.body.benefits) ? req.body.benefits : [],
    }

    if (req.body.salaryRange) {
      jobData.salaryRange = req.body.salaryRange
    }

    const job = await Job.create(jobData)
    console.log('âœ… Job created:', job._id)

    res.status(201).json({ success: true, data: { job } })
  } catch (error) {
    console.error('âŒ Create job error:', error)
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors,
    })
  }
}

// @desc    Update job (admin)
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    res.json({ success: true, data: { job } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete job (admin)
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    await Application.deleteMany({ job: req.params.id })
    res.json({ success: true, message: 'Job deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get all jobs (admin)
// @route   GET /api/jobs/admin/all
export const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().sort('-createdAt')
    res.json({ success: true, count: jobs.length, data: { jobs } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get all applications (admin)
// @route   GET /api/jobs/applications/all
export const getAllApplications = async (req, res) => {
  try {
    const { jobId, status } = req.query
    const filter = {}
    if (jobId) filter.job = jobId
    if (status) filter.status = status

    const applications = await Application.find(filter)
      .populate('job', 'title department')
      .sort('-createdAt')
    res.json({ success: true, count: applications.length, data: { applications } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update application status (admin)
// @route   PUT /api/jobs/applications/:id
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, note } = req.body
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' })
    }

    if (status) application.status = status
    if (note) {
      application.adminNotes.push({ note, addedBy: req.user._id })
    }

    await application.save()
    res.json({ success: true, data: { application } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete application (admin)
// @route   DELETE /api/jobs/applications/:id
export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Application deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
// @desc    Get user's applications
// @route   GET /api/jobs/applications/my
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ email: req.user.email })
      .populate('job', 'title department location')
      .sort('-createdAt')
    res.json({
      success: true,
      count: applications.length,
      data: { applications },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
