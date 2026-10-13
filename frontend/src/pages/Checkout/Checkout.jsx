import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, clearCart } from '../../features/cart/cartSlice'
import { createOrder } from '../../features/orders/orderSlice'
import { toast } from 'react-toastify'
import {
  FaTruck,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaCheck,
} from 'react-icons/fa'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotal)
  const { user } = useSelector((state) => state.auth)
  const { submitting } = useSelector((state) => state.orders)

  const [step, setStep] = useState(1) // 1=Delivery, 2=Payment, 3=Review
  const [delivery, setDelivery] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const tax = subtotal * 0.18
  const shipping = subtotal > 5000 ? 0 : 100
  const total = subtotal + tax + shipping

  const handleDeliveryChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value })
  }

  const validateDelivery = () => {
    const required = ['fullName', 'phone', 'street', 'city', 'state', 'zipCode']
    for (const field of required) {
      if (!delivery[field]) {
        toast.error(`Please fill in ${field}`)
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateDelivery()) return
    setStep(step + 1)
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: delivery,
        paymentMethod,
      }

      const result = await dispatch(createOrder(orderData)).unwrap()
      dispatch(clearCart())
      toast.success('Order placed successfully!')
      navigate(`/dashboard/orders/${result._id}`)
    } catch (error) {
      toast.error(error || 'Failed to place order')
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {['Delivery', 'Payment', 'Review'].map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step > i
                      ? 'bg-primary-600 text-white'
                      : step === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > i + 1 ? <FaCheck /> : i + 1}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    step >= i + 1 ? 'text-primary-600' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`w-16 h-1 mx-4 ${
                    step > i + 1 ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Step 1: Delivery */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaTruck className="text-primary-600" /> Delivery Address
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    value={delivery.fullName}
                    onChange={handleDeliveryChange}
                    className="input-field"
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={delivery.phone}
                    onChange={handleDeliveryChange}
                    className="input-field"
                  />
                  <input
                    name="street"
                    placeholder="Street Address"
                    value={delivery.street}
                    onChange={handleDeliveryChange}
                    className="input-field md:col-span-2"
                  />
                  <input
                    name="city"
                    placeholder="City"
                    value={delivery.city}
                    onChange={handleDeliveryChange}
                    className="input-field"
                  />
                  <input
                    name="state"
                    placeholder="State"
                    value={delivery.state}
                    onChange={handleDeliveryChange}
                    className="input-field"
                  />
                  <input
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={delivery.zipCode}
                    onChange={handleDeliveryChange}
                    className="input-field"
                  />
                  <input
                    name="country"
                    value={delivery.country}
                    disabled
                    className="input-field bg-gray-100"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-primary-600" /> Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: FaMoneyBillWave, desc: 'Pay when you receive' },
                    { id: 'card', label: 'Credit/Debit Card', icon: FaCreditCard, desc: 'Visa, Mastercard, RuPay' },
                    { id: 'upi', label: 'UPI', icon: FaMobileAlt, desc: 'Google Pay, PhonePe, Paytm' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <method.icon className="text-primary-600 text-xl" />
                      <div>
                        <p className="font-medium text-dark-900">{method.label}</p>
                        <p className="text-sm text-dark-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                  <div className="text-dark-700 space-y-1">
                    <p className="font-medium">{delivery.fullName}</p>
                    <p>{delivery.phone}</p>
                    <p>
                      {delivery.street}, {delivery.city}, {delivery.state} -{' '}
                      {delivery.zipCode}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <p className="text-dark-700 capitalize">
                    {paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : paymentMethod === 'card'
                      ? 'Credit/Debit Card'
                      : 'UPI'}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Order Items</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-dark-500">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Nav Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn-outline"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary ml-auto"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  className="btn-primary ml-auto disabled:opacity-50"
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <h2 className="text-lg font-bold text-dark-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-600">Shipping</span>
                  <span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout