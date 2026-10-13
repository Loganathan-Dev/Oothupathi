import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import { FaClipboardList, FaClock, FaCheckCircle } from 'react-icons/fa'

const CustomerCustomRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await api.get('/customization/my')
      setRequests(res.data.data.requests || [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    const info = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: FaClock },
      reviewing: { color: 'bg-blue-100 text-blue-800', label: 'Reviewing', icon: FaClock },
      quoted: { color: 'bg-purple-100 text-purple-800', label: 'Quoted', icon: FaClipboardList },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved', icon: FaCheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected', icon: FaClock },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed', icon: FaCheckCircle },
    }
    return info[status] || info.pending
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          Custom Requests
        </h1>
        <p className="text-dark-500 text-sm">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">
            No custom requests yet
          </h3>
          <p className="text-dark-500 text-sm mb-6">
            Need something special? Request a custom product!
          </p>
          <Link to="/customize" className="btn-primary inline-block">
            Start Customizing
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const statusInfo = getStatusInfo(req.status)
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-dark-900 mb-1">
                      {req.productName || 'Custom Product'}
                    </h3>
                    <p className="text-sm text-dark-600 line-clamp-2 mb-2">
                      {req.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-dark-500">
                      <span>Quantity: {req.quantity || 'N/A'}</span>
                      {req.budget?.min > 0 && (
                        <span>
                          Budget: ₹{req.budget.min} - ₹{req.budget.max}
                        </span>
                      )}
                      <span>
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>
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

export default CustomerCustomRequests
