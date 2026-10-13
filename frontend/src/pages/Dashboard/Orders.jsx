import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../features/orders/orderSlice'
import { FaBox, FaEye } from 'react-icons/fa'

const CustomerOrders = () => {
  const dispatch = useDispatch()
  const { orders = [], loading, error } = useSelector(
    (state) => state.orders || {}
  )

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

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
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
            My Orders
          </h1>
          <p className="text-dark-500 text-sm">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">
            No orders yet
          </h3>
          <p className="text-dark-500 text-sm mb-6">
            Start shopping to see your orders here!
          </p>
          <Link to="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Order #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-primary-600">
                      #{order.orderNumber || order._id?.slice(-6)}
                    </td>
                    <td className="px-4 py-3 text-sm text-dark-600">
                      {order.items?.length || 0} item(s)
                    </td>
                    <td className="px-4 py-3 text-sm font-bold">
                      ₹{order.total?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-dark-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/dashboard/orders/${order._id}`}
                        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 text-sm"
                      >
                        <FaEye size={12} /> View
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

export default CustomerOrders
