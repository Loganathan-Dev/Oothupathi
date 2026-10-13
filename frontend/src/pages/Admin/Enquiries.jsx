import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { toast } from 'react-toastify'
import {
  FaSearch, FaEnvelope, FaPhone, FaEye, FaTimes, FaTrash,
} from 'react-icons/fa'

const AdminEnquiries = () => {
  const { user } = useSelector((state) => state.auth)
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      const res = await api.get('/enquiries')
      setEnquiries(res.data.data.enquiries || [])
    } catch (err) {
      console.error('Fetch error:', err)
      toast.error('Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}/status`, { status })
      toast.success('Status updated')
      fetchEnquiries()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return
    try {
      await api.delete(`/enquiries/${id}`)
      toast.success('Enquiry deleted')
      fetchEnquiries()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-yellow-100 text-yellow-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      !search ||
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.subject?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          Enquiries & Quote Requests
        </h1>
        <p className="text-dark-500 text-sm">
          {enquiries.length} total enquiries
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow mb-4 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field sm:max-w-[180px]"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-6xl mb-4">📩</div>
          <h3 className="font-heading text-lg font-semibold mb-2">
            No enquiries found
          </h3>
          <p className="text-dark-500 text-sm">
            Enquiries from the contact page and quote requests will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Sender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-dark-900 text-sm">{e.name}</p>
                      <p className="text-xs text-dark-500 flex items-center gap-1">
                        <FaEnvelope size={10} /> {e.email}
                      </p>
                      <p className="text-xs text-dark-500 flex items-center gap-1">
                        <FaPhone size={10} /> {e.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm text-dark-800 line-clamp-1">
                        {e.subject}
                      </p>
                      <p className="text-xs text-dark-500 line-clamp-1">
                        {e.message?.slice(0, 60)}...
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 font-medium capitalize ${getStatusColor(
                          e.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-dark-500 whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelected(e)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-dark-900/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="p-5 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-heading text-lg font-bold">Enquiry Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1 text-dark-500 hover:text-dark-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="font-medium">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wider">
                    Company
                  </p>
                  <p className="font-medium">{selected.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    {selected.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wider">
                    Phone
                  </p>
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    {selected.phone}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Subject
                </p>
                <p className="font-medium">{selected.subject}</p>
              </div>

              <div>
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-1">
                  Message
                </p>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line text-sm leading-relaxed">
                  {selected.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="btn-primary justify-center"
                >
                  <FaEnvelope /> Reply via Email
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="btn-outline justify-center"
                >
                  <FaPhone /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEnquiries