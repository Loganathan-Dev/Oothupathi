import Enquiry from '../models/Enquiry.js'

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company: company || '',
      subject,
      message,
      user: req.user?._id || null,
    })

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: { enquiry },
    })
  } catch (error) {
    console.error('Create enquiry error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('user', 'name email')
      .sort('-createdAt')
    res.json({ success: true, count: enquiries.length, data: { enquiries } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ user: req.user._id }).sort('-createdAt')
    res.json({ success: true, data: { enquiries } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    res.json({ success: true, data: { enquiry } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['new', 'read', 'replied', 'closed']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' })
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Not found' })
    }
    res.json({ success: true, data: { enquiry } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}