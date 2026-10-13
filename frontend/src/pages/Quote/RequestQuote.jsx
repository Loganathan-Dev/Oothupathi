import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import { toast } from 'react-toastify'
import {
  FaPaperPlane, FaCheckCircle, FaUser, FaEnvelope,
  FaPhone, FaBox, FaCommentDots, FaBuilding,
} from 'react-icons/fa'

const RequestQuote = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
    productType: 'sambrani',
    quantity: '',
    budget: '',
    deliveryDate: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all required fields')
      setSubmitting(false)
      return
    }

    try {
      await api.post('/enquiries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Quote Request - ${formData.productType}`,
        message: `
Company: ${formData.company || 'N/A'}
Product Type: ${formData.productType}
Quantity: ${formData.quantity || 'N/A'}
Budget: ${formData.budget || 'N/A'}
Delivery Date: ${formData.deliveryDate || 'N/A'}

${formData.message}
        `.trim(),
      })

      toast.success('Quote request submitted successfully!')
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          company: '',
          productType: 'sambrani',
          quantity: '',
          budget: '',
          deliveryDate: '',
          message: '',
        })
      }, 3000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 sm:py-20">
        <div className="container-custom max-w-lg text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mb-3">
            Quote Request Received!
          </h1>
          <p className="text-dark-600 mb-6">
            Thank you for your interest. Our team will review your request and get
            back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-dark-900 text-white py-12 sm:py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Request a Quote
          </h1>
          <p className="text-base sm:text-lg text-primary-200 max-w-2xl mx-auto">
            Get a personalized quote for your sambrani, incense, or herbal product needs.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="container-custom py-8 sm:py-12 max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 space-y-5"
        >
          {/* Personal Info */}
          <div>
            <h2 className="font-heading text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
              <FaUser className="text-primary-600" /> Your Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="label-field">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="label-field">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="label-field">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-5 border-t border-gray-100">
            <h2 className="font-heading text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
              <FaBox className="text-primary-600" /> Product Requirements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="sambrani">🔥 Sambrani Products</option>
                  <option value="dhoop">🌿 Dhoop</option>
                  <option value="incense">🕉️ Incense Sticks</option>
                  <option value="herbal">🌱 Herbal Products</option>
                  <option value="pooja">🪔 Pooja Items</option>
                  <option value="gift">🎁 Gift Boxes</option>
                  <option value="custom">⚙️ Custom Order</option>
                </select>
              </div>
              <div>
                <label className="label-field">Quantity Needed</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 100 units"
                />
              </div>
              <div>
                <label className="label-field">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., ₹5,000 - ₹10,000"
                />
              </div>
              <div>
                <label className="label-field">Expected Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="pt-5 border-t border-gray-100">
            <h2 className="font-heading text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
              <FaCommentDots className="text-primary-600" /> Additional Details
            </h2>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Tell us about your requirements, customizations, packaging needs, etc."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:opacity-50"
          >
            <FaPaperPlane />
            {submitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestQuote