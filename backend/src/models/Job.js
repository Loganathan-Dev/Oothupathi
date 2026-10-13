import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    slug: { type: String, unique: true, lowercase: true },
    department: {
      type: String,
      required: true,
      enum: ['Production', 'Quality', 'Sales', 'Marketing', 'Admin', 'Logistics', 'R&D'],
    },
    employmentType: {
      type: String,
      required: true,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' },
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: [String],
    requirements: [String],
    benefits: [String],
    skills: [String],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    applicationDeadline: Date,
    openings: { type: Number, default: 1 },
    views: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

jobSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

export default mongoose.model('Job', jobSchema)