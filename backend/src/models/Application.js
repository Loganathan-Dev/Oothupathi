import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: String,
    currentCompany: String,
    expectedSalary: String,
    noticePeriod: String,
    coverLetter: { type: String, required: true },
    resumeUrl: String,
    portfolioUrl: String,
    linkedinUrl: String,
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected'],
      default: 'pending',
    },
    adminNotes: [{
      note: String,
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      addedAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
)

export default mongoose.model('Application', applicationSchema)