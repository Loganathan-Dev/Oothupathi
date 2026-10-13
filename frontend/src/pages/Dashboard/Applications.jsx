import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { FaBriefcase, FaClock, FaCheckCircle, FaTimes } from 'react-icons/fa'

const CustomerApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await api.get('/jobs/applications/my')
      setApplications(res.data.data.applications || [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    const info = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      reviewing: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
      shortlisted: { color: 'bg-purple-100 text-purple-800', label: 'Shortlisted' },
      interviewed: { color: 'bg-indigo-100 text-indigo-800', label: 'Interviewed' },
      offered: { color: 'bg-green-100 text-green-800', label: 'Offer Received' },
      hired: { color: 'bg-emerald-100 text-emerald-800', label: 'Hired' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Not Selected' },
    }
    return info[status] || info.pending
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          My Applications
        </h1>
        <p className="text-dark-500 text-sm">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <FaBriefcase className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">
            No applications yet
          </h3>
          <p className="text-dark-500 text-sm mb-6">
            Explore careers and apply to join our team!
          </p>
          <Link to="/careers" className="btn-primary inline-block">
            View Open Positions
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const statusInfo = getStatusInfo(app.status)

            return (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-dark-900 mb-1">
                      {app.job?.title || 'Position'}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-dark-500">
                      {app.job?.department && <span>🏢 {app.job.department}</span>}
                      {app.job?.location && <span>📍 {app.job.location}</span>}
                      <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium self-start ${statusInfo.color}`}
                  >
                    {statusInfo.label}
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

export default CustomerApplications
