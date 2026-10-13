import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllOrders,
  adminUpdateOrderStatus,
  updatePaymentStatus,
} from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { FaEye, FaSearch, FaTruck, FaCheck } from 'react-icons/fa'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const { orders = [], loading } = useSelector((state) => state.admin || {})
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchAllOrders(statusFilter ? { status: statusFilter } : {}))
  }, [dispatch, statusFilter])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(adminUpdateOrderStatus({ orderId, status: newStatus })).unwrap()
      toast.success(`Order marked as ${newStatus}`)
    } catch (error) {
      toast.error(error || 'Failed to update')
    }
  }

  const handlePaymentUpdate = async (orderId, paymentStatus) => {
    try {
      await dispatch(updatePaymentStatus({ orderId, paymentStatus })).unwrap()
      toast.success(`Payment marked as ${paymentStatus}`)
    } catch (error) {
      toast.error(error || 'Failed to update')
    }
  }

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const filtered = orders.filter(
    (o) =>
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">Orders</h1>
        <p className="text-dark-500 text-sm">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow mb-4 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order # or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field sm:max-w-[200px]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="font-heading text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-dark-500 text-sm">Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Order #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-primary-600">
                      #{order.orderNumber || order._id?.slice(-6)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{order.user?.name || 'Guest'}</p>
                      <p className="text-xs text-dark-500">{order.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-sm">
                      ₹{order.total?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.paymentStatus || 'pending'}
                        onChange={(e) => handlePaymentUpdate(order._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 font-medium capitalize ${getPaymentStyle(order.paymentStatus)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 font-medium capitalize ${getStatusStyle(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-dark-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/dashboard/orders/${order._id}`}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
