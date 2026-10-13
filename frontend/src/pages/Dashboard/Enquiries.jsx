import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserEnquiries } from '../../features/enquiries/enquirySlice'
import { FaEnvelope, FaReply, FaClock, FaCheckCircle } from 'react-icons/fa'

const CustomerEnquiries = () => {
  const dispatch = useDispatch()
  const { enquiries = [], loading, error } = useSelector(
    (state) => state.enquiries || {}
  )

  useEffect(() => {
    dispatch(fetchUserEnquiries())
  }, [dispatch])

  const getStatusInfo = (status) => {
    const info = {
      new: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, label: 'New' },
      read: { color: 'bg-blue-100 text-blue-800', icon: FaEnvelope, label: 'Read' },
      replied: { color: 'bg-green-100 text-green-800', icon: FaReply, label: 'Replied' },
      closed: { color: 'bg-gray-100 text-gray-800', icon: FaCheckCircle, label: 'Closed' },
    }
    return info[status] || info.new
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          My Enquiries
        </h1>
        <p className="text-dark-500 text-sm">
          {enquiries.length} {enquiries.length === 1 ? 'enquiry' : 'enquiries'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">
            No enquiries yet
          </h3>
          <p className="text-dark-500 text-sm mb-6">
            Have a question? Send us your first enquiry!
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => {
            const statusInfo = getStatusInfo(enquiry.status)
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={enquiry._id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-dark-900 mb-1">
                      {enquiry.subject}
                    </h3>
                    <p className="text-sm text-dark-600 line-clamp-2 mb-2">
                      {enquiry.message}
                    </p>
                    <p className="text-xs text-dark-500">
                      Submitted on {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium self-start ${statusInfo.color}`}
                  >
                    <StatusIcon size={10} /> {statusInfo.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomerEnquiries
