import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../features/orders/orderSlice'
import { fetchUserEnquiries } from '../../features/enquiries/enquirySlice'
import {
  FaBox,
  FaEnvelope,
  FaClipboardList,
  FaBriefcase,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa'

const CustomerDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { orders = [], loading: ordersLoading } = useSelector((state) => state.orders || {})
  const { enquiries = [] } = useSelector((state) => state.enquiries || {})

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchUserEnquiries())
  }, [dispatch])

  // Calculate stats from real data
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => ['pending', 'processing'].includes(o.status)).length,
    enquiries: enquiries.length,
    applications: 0, // Coming from job applications
  }

  const recentOrders = orders.slice(0, 3)

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          Welcome back, {user?.name || 'Customer'}!
        </h1>
        <p className="text-dark-500 text-sm mt-1">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats - Real Data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-primary-50 rounded-lg">
              <FaBox className="text-primary-600" size={18} />
            </div>
          </div>
          <p className="text-xs text-dark-500">Total Orders</p>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mt-1">
            {ordersLoading ? '—' : stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <FaEnvelope className="text-green-600" size={18} />
            </div>
          </div>
          <p className="text-xs text-dark-500">Enquiries</p>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mt-1">
            {stats.enquiries}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <FaClipboardList className="text-purple-600" size={18} />
            </div>
          </div>
          <p className="text-xs text-dark-500">Custom Requests</p>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mt-1">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-yellow-50 rounded-lg">
              <FaBriefcase className="text-yellow-600" size={18} />
            </div>
          </div>
          <p className="text-xs text-dark-500">Applications</p>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mt-1">
            {stats.applications}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-heading text-lg font-bold text-dark-900">
              Recent Orders
            </h2>
            <Link
              to="/dashboard/orders"
              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="p-5">
            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-2">📦</p>
                <p className="text-dark-500 text-sm mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link to="/products" className="btn-primary inline-block text-sm">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order._id}
                    to={`/dashboard/orders/${order._id}`}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-dark-900 truncate">
                        #{order.orderNumber}
                      </p>
                      <p className="text-xs text-dark-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="font-bold text-sm">₹{order.total}</p>
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b">
            <h2 className="font-heading text-lg font-bold text-dark-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/dashboard/orders"
                className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-center transition-colors"
              >
                <FaShoppingCart className="text-primary-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-primary-700">My Orders</p>
              </Link>
              <Link
                to="/dashboard/enquiries"
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
              >
                <FaEnvelope className="text-green-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-green-700">Enquiries</p>
              </Link>
              <Link
                to="/products"
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
              >
                <FaBox className="text-purple-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-700">Shop Now</p>
              </Link>
              <Link
                to="/quote"
                className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition-colors"
              >
                <FaClipboardList className="text-yellow-600 text-xl mx-auto mb-2" />
                <p className="text-sm font-medium text-yellow-700">Get Quote</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard