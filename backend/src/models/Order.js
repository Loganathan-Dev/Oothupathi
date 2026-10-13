import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, default: '' },
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: { type: String, unique: true },

    items: [orderItemSchema],

    // Delivery info
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },

    // Payment info
    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'upi', 'netbanking'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentDetails: {
      transactionId: String,
      paidAt: Date,
    },

    // Totals
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },

    // Order status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // Delivery tracking
    trackingNumber: String,
    estimatedDelivery: Date,
    deliveredAt: Date,

    notes: String,
    statusHistory: [{
      status: String,
      note: String,
      timestamp: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
)

orderSchema.pre('save', function (next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const rand = Math.floor(1000 + Math.random() * 9000)
    this.orderNumber = `ORD-${year}${month}${day}-${rand}`
  }
  next()
})

export default mongoose.model('Order', orderSchema)