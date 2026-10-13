import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomRequest',
  },
  quoteNumber: {
    type: String,
    unique: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    description: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    specifications: Map,
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  validUntil: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'],
    default: 'draft',
  },
  notes: String,
  terms: String,
  attachments: [{
    url: String,
    publicId: String,
    name: String,
  }],
}, {
  timestamps: true,
})

// Generate quote number before saving
quoteSchema.pre('save', function(next) {
  if (this.isNew) {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = Math.floor(Math.random() * 10000)
    this.quoteNumber = `QT-${year}${month}-${String(count).padStart(4, '0')}`
  }
  next()
})

export default mongoose.model('Quote', quoteSchema)