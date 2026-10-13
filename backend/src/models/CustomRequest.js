import mongoose from 'mongoose'

const customRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['mm', 'cm', 'm', 'in', 'ft'],
      default: 'mm',
    },
  },
  materials: [String],
  colors: [String],
  packaging: {
    type: String,
  },
  branding: {
    type: String,
  },
  budget: {
    min: Number,
    max: Number,
  },
  timeline: {
    type: String,
  },
  attachments: [{
    url: String,
    publicId: String,
    name: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'quoted', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  notes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
})

export default mongoose.model('CustomRequest', customRequestSchema)