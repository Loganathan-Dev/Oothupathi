import CustomRequest from '../models/CustomRequest.js'

// @desc    Create custom request
// @route   POST /api/customization
// @access  Private
export const createCustomRequest = async (req, res) => {
  try {
    const request = await CustomRequest.create({
      ...req.body,
      user: req.user._id,
    })
    res.status(201).json({
      success: true,
      message: 'Custom request submitted',
      data: { request },
    })
  } catch (error) {
    console.error('Create custom request error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get user's own custom requests
// @route   GET /api/customization/my
// @access  Private
export const getMyCustomRequests = async (req, res) => {
  try {
    const requests = await CustomRequest.find({ user: req.user._id }).sort(
      '-createdAt'
    )
    res.json({
      success: true,
      count: requests.length,
      data: { requests },
    })
  } catch (error) {
    console.error('Get my custom requests error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get all custom requests (admin)
// @route   GET /api/customization
// @access  Private/Admin
export const getAllCustomRequests = async (req, res) => {
  try {
    const requests = await CustomRequest.find()
      .populate('user', 'name email phone')
      .sort('-createdAt')
    res.json({
      success: true,
      count: requests.length,
      data: { requests },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single custom request
// @route   GET /api/customization/:id
// @access  Private
export const getCustomRequest = async (req, res) => {
  try {
    const request = await CustomRequest.findById(req.params.id).populate(
      'user',
      'name email phone'
    )
    if (!request) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    res.json({ success: true, data: { request } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update custom request status (admin)
// @route   PUT /api/customization/:id/status
// @access  Private/Admin
export const updateCustomRequestStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body
    const request = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    )
    if (!request) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    res.json({ success: true, data: { request } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete custom request
// @route   DELETE /api/customization/:id
// @access  Private
export const deleteCustomRequest = async (req, res) => {
  try {
    const request = await CustomRequest.findById(req.params.id)
    if (!request) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    // Only owner or admin can delete
    if (
      request.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }
    await request.deleteOne()
    res.json({ success: true, message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
