import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
} from '../../features/cart/cartSlice'
import { FaTrash, FaArrowRight, FaShoppingBag } from 'react-icons/fa'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotal)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const tax = subtotal * 0.18
  const shipping = subtotal > 5000 ? 0 : 100
  const total = subtotal + tax + shipping

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom max-w-2xl text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-dark-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-dark-500 mb-8">
            Add some products to get started!
          </p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-dark-900 mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 flex gap-4"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">📦</span>
                  )}
                </div>

                <div className="flex-1">
                  <Link
                    to={`/products/${item._id}`}
                    className="font-semibold text-dark-900 hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-primary-600 font-bold mt-1">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item._id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item._id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    >
                      <FaTrash size={12} /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-dark-500">Subtotal</p>
                  <p className="font-bold text-dark-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-dark-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary-600">₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <FaShoppingBag />
                Proceed to Checkout
                <FaArrowRight size={12} />
              </button>

              <Link
                to="/products"
                className="block text-center mt-3 text-sm text-primary-600 hover:text-primary-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart