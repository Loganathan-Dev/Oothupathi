import Order from '../models/Order.js'
import Product from '../models/Product.js'

// @desc    Create order (LOGGED-IN USERS ONLY)
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      notes,
    } = req.body

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order',
      })
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
      })
    }

    // Calculate totals and validate products
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        })
      }

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0]?.url || '',
      })

      // Reduce stock
      product.stock -= item.quantity
      await product.save()
    }

    // Calculate costs
    const tax = subtotal * 0.18 // 18% GST
    const shippingCost = subtotal > 5000 ? 0 : 100 // Free shipping over 5000
    const total = subtotal + tax + shippingCost

    // Estimated delivery: 5-7 days
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      subtotal,
      tax,
      shippingCost,
      total,
      estimatedDelivery,
      notes,
      statusHistory: [{
        status: 'pending',
        note: 'Order placed successfully',
      }],
    })

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { order },
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Get user's orders (LOGGED-IN USERS - only their own)
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('items.product', 'name images')

    res.json({
      success: true,
      count: orders.length,
      data: { orders },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single order (LOGGED-IN USER - only their own, admin sees all)
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images')
      .populate('user', 'name email phone')

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Check ownership
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      })
    }

    res.json({ success: true, data: { order } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update order status (ADMIN)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.status = status
    order.statusHistory.push({
      status,
      note: note || `Status changed to ${status}`,
    })

    if (status === 'delivered') {
      order.deliveredAt = new Date()
    }

    await order.save()

    res.json({
      success: true,
      message: 'Order status updated',
      data: { order },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete order (ADMIN)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    res.json({ success: true, message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Cancel order (user can cancel pending/confirmed orders)
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    // Check ownership (only owner or admin can cancel)
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order',
      })
    }

    // Only pending or confirmed orders can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`,
      })
    }

    order.status = 'cancelled'
    order.statusHistory = order.statusHistory || []
    order.statusHistory.push({
      status: 'cancelled',
      note: 'Order cancelled by customer',
      timestamp: new Date(),
    })

    await order.save()

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order },
    })
  } catch (error) {
    console.error('Cancel order error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}