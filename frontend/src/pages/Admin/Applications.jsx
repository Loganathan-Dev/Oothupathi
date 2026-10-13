import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllApplications, updateApplicationStatus,
} from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { FaSearch, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa'

const Applications = () => {
  const dispatch = useDispatch()
  const { applications, loading } = useSelector((state) => state.admin)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)

  useEffect(() => {
    dispatch(fetchAllApplications())
  }, [dispatch])

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateApplicationStatus({ id, status })).unwrap()
      toast.success(`Marked as ${status}`)
    } catch (err) {
      toast.error(err)
    }
  }

  const filtered = applications.filter((a) => {
    const matchesStatus = !statusFilter || a.status === statusFilter
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-purple-100 text-purple-800',
      interviewed: 'bg-indigo-100 text-indigo-800',
      offered: 'bg-green-100 text-green-800',
      hired: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">Applications</h1>
        <p className="text-dark-500 text-sm">{applications.length} total applications</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow mb-4 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
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
          <option value="reviewing">Reviewing</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="offered">Offered</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-5xl mb-4">📩</p>
          <h3 className="font-heading text-lg font-semibold mb-2">No applications found</h3>
          <p className="text-dark-500 text-sm">Try adjusting filters</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Applicant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-dark-900 text-sm">{app.name}</p>
                      <p className="text-xs text-dark-500">{app.experience || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-dark-700">
                      {app.job?.title || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs flex items-center gap-1">
                        <FaEnvelope className="text-dark-400" /> {app.email}
                      </p>
                      <p className="text-xs flex items-center gap-1 mt-0.5">
                        <FaPhone className="text-dark-400" /> {app.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 font-medium ${getStatusColor(app.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="offered">Offered</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-dark-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-dark-900/70 z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedApp(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-heading text-lg font-bold">Application Details</h2>
              <button onClick={() => setSelectedApp(null)} className="text-dark-500 hover:text-dark-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-dark-500">Name</p>
                <p className="font-medium">{selectedApp.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-dark-500">Email</p>
                  <p className="font-medium text-sm">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-500">Phone</p>
                  <p className="font-medium text-sm">{selectedApp.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-dark-500">Experience</p>
                  <p className="font-medium text-sm">{selectedApp.experience || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-500">Current Company</p>
                  <p className="font-medium text-sm">{selectedApp.currentCompany || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-dark-500">Cover Letter</p>
                <p className="text-sm whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                  {selectedApp.coverLetter}
                </p>
              </div>
              {selectedApp.resumeUrl && (
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  <FaDownload /> Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications