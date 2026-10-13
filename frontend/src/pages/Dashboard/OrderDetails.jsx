import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById, cancelOrder } from '../../features/orders/orderSlice'
import { toast } from 'react-toastify'
import {
  FaArrowLeft,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaBox,
  FaTimes,
} from 'react-icons/fa'

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentOrder: order, loading } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrderById(id))
  }, [dispatch, id])

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      await dispatch(cancelOrder(id)).unwrap()
      toast.success('Order cancelled')
      dispatch(fetchOrderById(id))
    } catch (error) {
      toast.error(error)
    }
  }

  const getStatusInfo = (status) => {
    const info = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, label: 'Pending' },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: FaCheckCircle, label: 'Confirmed' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: FaBox, label: 'Processing' },
      shipped: { color: 'bg-purple-100 text-purple-800', icon: FaTruck, label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: FaTimes, label: 'Cancelled' },
    }
    return info[status] || info.pending
  }

  if (loading || !order) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/dashboard/orders"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6"
      >
        <FaArrowLeft /> Back to Orders
      </Link>

      <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark-900">
              Order #{order.orderNumber}
            </h1>
            <p className="text-dark-500 text-sm mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${statusInfo.color}`}
          >
            <StatusIcon /> {statusInfo.label}
          </span>
        </div>

        {/* Progress Tracker */}
        {order.status !== 'cancelled' && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['pending', 'processing', 'shipped', 'delivered'].map((s, i) => {
                const steps = ['pending', 'processing', 'shipped', 'delivered']
                const currentIndex = steps.indexOf(order.status)
                const isComplete = i <= currentIndex
                return (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isComplete
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {isComplete ? <FaCheckCircle /> : i + 1}
                      </div>
                      <span className="text-xs mt-2 capitalize">{s}</span>
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          i < currentIndex ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}

        {/* Estimated Delivery */}
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <FaTruck className="text-blue-600 text-xl" />
            <div>
              <p className="font-medium text-blue-900">
                Estimated Delivery:{' '}
                {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-blue-700">
                We'll notify you when your order ships
              </p>
            </div>
          </div>
        )}

        {order.status === 'delivered' && order.deliveredAt && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl" />
            <p className="font-medium text-green-900">
              Delivered on{' '}
              {new Date(order.deliveredAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
        <h2 className="text-lg font-bold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">📦</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-dark-900">{item.name}</p>
                <p className="text-sm text-dark-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery + Payment */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-3">Delivery Address</h2>
          <div className="text-dark-700 space-y-1 text-sm">
            <p className="font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-3">Payment</h2>
          <div className="text-dark-700 space-y-2 text-sm">
            <p className="capitalize">
              <span className="text-dark-500">Method:</span>{' '}
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
            </p>
            <p>
              <span className="text-dark-500">Status:</span>{' '}
              <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                {order.paymentStatus}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 mb-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-600">Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-600">Tax</span>
            <span>₹{order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-600">Shipping</span>
            <span>
              {order.shippingCost === 0
                ? 'FREE'
                : `₹${order.shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t text-lg font-bold">
            <span>Total</span>
            <span className="text-primary-600">₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {['pending', 'confirmed'].includes(order.status) && (
        <button
          onClick={handleCancel}
          className="w-full py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          Cancel Order
        </button>
      )}
    </div>
  )
}

export default OrderDetails