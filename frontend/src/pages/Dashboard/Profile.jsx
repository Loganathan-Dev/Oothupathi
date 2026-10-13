import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProfile,
  updateProfile,
  changePassword,
  clearProfileError,
} from '../../features/profile/profileSlice'
import { FaSave, FaTimes, FaLock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, loading, updating, error, success } = useSelector(
    (state) => state.profile
  )

  const [editing, setEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    address: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        company: user.company || '',
        address: user.address || '',
      })
    }
  }, [user])

  useEffect(() => {
    if (success) {
      setEditing(false)
      setShowPasswordForm(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => dispatch(clearProfileError()), 3000)
    }
  }, [success, dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    setPasswordError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProfile(formData))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    dispatch(
      changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
    )
  }

  const handleCancel = () => {
    setEditing(false)
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        company: user.company || '',
        address: user.address || '',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-900">My Profile</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn-primary flex items-center gap-2"
          >
            <FaUser size={14} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✅ Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ❌ {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-900">{user?.name}</h2>
            <p className="text-dark-500 text-sm capitalize">{user?.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                disabled={!editing}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  !editing
                    ? 'bg-gray-50 border-gray-200 text-gray-600'
                    : 'border-gray-300'
                }`}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email (always readonly) */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                value={user?.email || ''}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                disabled={!editing}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  !editing
                    ? 'bg-gray-50 border-gray-200 text-gray-600'
                    : 'border-gray-300'
                }`}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                disabled={!editing}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  !editing
                    ? 'bg-gray-50 border-gray-200 text-gray-600'
                    : 'border-gray-300'
                }`}
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-dark-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              rows="3"
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                !editing
                  ? 'bg-gray-50 border-gray-200 text-gray-600'
                  : 'border-gray-300'
              }`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
            />
          </div>

          {/* Buttons */}
          {editing && (
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={updating}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <FaSave size={14} />
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-outline flex items-center gap-2"
              >
                <FaTimes size={14} />
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-dark-900 flex items-center gap-2">
            <FaLock className="text-primary-600" />
            Change Password
          </h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            {showPasswordForm ? 'Cancel' : 'Change'}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {passwordError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="btn-primary disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile