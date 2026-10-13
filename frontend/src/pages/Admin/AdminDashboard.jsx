import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardStats } from '../../features/admin/adminSlice'
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
  FaEnvelope,
  FaChartLine,
  FaArrowRight,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { stats, analytics, loading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])

  if (loading && !stats) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: FaRupeeSign,
      color: 'from-green-500 to-green-600',
      today: `₹${(stats?.todayRevenue || 0).toLocaleString('en-IN')} today`,
    },
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: FaShoppingCart,
      color: 'from-blue-500 to-blue-600',
      today: `${stats?.todayOrders || 0} today`,
    },
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FaUsers,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: FaBox,
      color: 'from-orange-500 to-orange-600',
    },
  ]

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Dashboard</h1>
          <p className="text-dark-500 text-sm">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <Link
          to="/admin/analytics"
          className="btn-primary flex items-center gap-2"
        >
          <FaChartLine /> View Analytics
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`bg-gradient-to-br ${card.color} text-white p-3 rounded-lg`}
              >
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-sm text-dark-500">{card.label}</p>
            <p className="text-2xl font-bold text-dark-900 mt-1">
              {card.value}
            </p>
            {card.today && (
              <p className="text-xs text-green-600 mt-1">{card.today}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-dark-900">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
            >
              View All <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="p-6">
            {!analytics?.recentOrders || analytics.recentOrders.length === 0 ? (
              <p className="text-center text-dark-500 py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {analytics.recentOrders.slice(0, 5).map((order) => (
                  <Link
                    key={order._id}
                    to={`/admin/orders/${order._id}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="font-medium text-dark-900 text-sm">
                        #{order.orderNumber}
                      </p>
                      <p className="text-xs text-dark-500">
                        {order.user?.name || 'Unknown'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{order.total}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(
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

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-dark-900">Top Selling Products</h2>
            <Link
              to="/admin/products"
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
            >
              Manage <FaArrowRight size={10} />
            </Link>
          </div>
          <div className="p-6">
            {!analytics?.topProducts || analytics.topProducts.length === 0 ? (
              <p className="text-center text-dark-500 py-8">No sales yet</p>
            ) : (
              <div className="space-y-4">
                {analytics.topProducts.map((product, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-dark-900 text-sm line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-dark-500">
                          {product.totalSold} sold
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">
                      ₹{product.revenue?.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-dark-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/new"
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-center transition-colors"
          >
            <FaBox className="text-blue-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-700">Add Product</p>
          </Link>
          <Link
            to="/admin/orders"
            className="p-4 bg-green-50 hover:bg-green-100 rounded-xl text-center transition-colors"
          >
            <FaShoppingCart className="text-green-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">View Orders</p>
          </Link>
          <Link
            to="/admin/users"
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl text-center transition-colors"
          >
            <FaUsers className="text-purple-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-700">Manage Users</p>
          </Link>
          <Link
            to="/admin/analytics"
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl text-center transition-colors"
          >
            <FaChartLine className="text-orange-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-orange-700">View Analytics</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard