import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa'

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [department])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (department) params.append('department', department)
      if (search) params.append('search', search)
      const res = await api.get(`/jobs?${params}`)
      setJobs(res.data.data.jobs || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-dark-900 text-white py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Join Our Team
          </h1>
          <p className="text-base sm:text-lg text-primary-200 max-w-2xl mx-auto">
            Build your career with a company that values tradition, quality, and people.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 sm:top-20 z-10 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input-field sm:max-w-[220px]"
            >
              <option value="">All Departments</option>
              <option value="Production">Production</option>
              <option value="Quality">Quality</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Admin">Admin</option>
              <option value="Logistics">Logistics</option>
              <option value="R&D">R&D</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="container-custom py-8 sm:py-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <FaBriefcase className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">No openings right now</h3>
            <p className="text-dark-500">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-dark-900">
                        {job.title}
                      </h3>
                      {job.isFeatured && (
                        <span className="badge bg-yellow-100 text-yellow-800">⭐ Featured</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-600 mb-3">
                      <span className="flex items-center gap-1"><FaBriefcase className="text-primary-600" /> {job.department}</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary-600" /> {job.location}</span>
                      <span className="flex items-center gap-1"><FaClock className="text-primary-600" /> {job.employmentType}</span>
                      {job.salaryRange?.min > 0 && (
                        <span className="flex items-center gap-1"><FaRupeeSign className="text-primary-600" /> {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max?.toLocaleString()}</span>
                      )}
                    </div>

                    <p className="text-dark-600 text-sm line-clamp-2 mb-3">{job.description}</p>

                    <div className="text-xs text-dark-500">
                      {job.experience && <span className="mr-3">Experience: {job.experience}</span>}
                      <span>Openings: {job.openings}</span>
                    </div>
                  </div>

                  <Link
                    to={`/careers/${job._id}`}
                    className="btn-primary w-full md:w-auto"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Careers