import User from '../models/User.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Enquiry from '../models/Enquiry.js'

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalEnquiries,
      orders,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Enquiry.countDocuments(),
      Order.find({ paymentStatus: 'paid' }),
      Order.find().sort('-createdAt').limit(10).populate('user', 'name email'),
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            name: { $first: '$items.name' },
            totalSold: { $sum: '$items.quantity' },
            revenue: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] },
            },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
      ]),
    ])

    // Calculate revenue
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    // Today's stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } })
    const todayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: today }, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ])

    // Status breakdown
    const statusBreakdown = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ])

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ])

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalEnquiries,
          totalRevenue,
          todayOrders,
          todayRevenue: todayRevenue[0]?.total || 0,
        },
        recentOrders,
        topProducts,
        statusBreakdown,
        monthlyRevenue,
      },
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get all users
// @route   GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt')
    res.json({ success: true, count: users.length, data: { users } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single user with order history
// @route   GET /api/admin/users/:id
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const orders = await Order.find({ user: user._id }).sort('-createdAt')
    const totalSpent = orders
      .filter((o) => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0)

    res.json({
      success: true,
      data: { user, orders, totalSpent, orderCount: orders.length },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password')

    res.json({ success: true, message: 'Role updated', data: { user } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/status
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'}`,
      data: { user },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query
    const filter = {}
    if (status) filter.status = status
    if (paymentStatus) filter.paymentStatus = paymentStatus

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort('-createdAt')

    res.json({ success: true, count: orders.length, data: { orders } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update order status (admin)
// @route   PUT /api/admin/orders/:id/status
export const adminUpdateOrderStatus = async (req, res) => {
  try {
    const { status, note, trackingNumber } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.status = status
    if (trackingNumber) order.trackingNumber = trackingNumber
    order.statusHistory.push({
      status,
      note: note || `Status changed to ${status} by admin`,
    })

    if (status === 'delivered') {
      order.deliveredAt = new Date()
      if (order.paymentMethod === 'cod') {
        order.paymentStatus = 'paid'
      }
    }

    await order.save()

    res.json({
      success: true,
      message: 'Order updated',
      data: { order },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update payment status
// @route   PUT /api/admin/orders/:id/payment
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.paymentStatus = paymentStatus
    if (transactionId) {
      order.paymentDetails = {
        transactionId,
        paidAt: new Date(),
      }
    }

    await order.save()

    res.json({
      success: true,
      message: 'Payment status updated',
      data: { order },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get sales analytics
// @route   GET /api/admin/analytics
export const getSalesAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query
    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(period))

    // Daily sales
    const dailySales = await Order.aggregate([
      { $match: { createdAt: { $gte: daysAgo }, paymentStatus: 'paid' } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    // Category-wise sales
    const categorySales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: { path: '$productInfo', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$productInfo.category',
          revenue: {
            $sum: { $multiply: ['$items.price', '$items.quantity'] },
          },
          itemsSold: { $sum: '$items.quantity' },
        },
      },
      { $sort: { revenue: -1 } },
    ])

    // Payment method breakdown
    const paymentMethods = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          revenue: { $sum: '$total' },
        },
      },
    ])

    // Top customers
    const topCustomers = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          name: '$userInfo.name',
          email: '$userInfo.email',
          totalSpent: 1,
          orderCount: 1,
        },
      },
    ])

    res.json({
      success: true,
      data: {
        dailySales,
        categorySales,
        paymentMethods,
        topCustomers,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}