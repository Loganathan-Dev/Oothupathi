import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllJobs,
  deleteJob,
  createJob,
  updateJob,
} from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import {
  FaPlus, FaEdit, FaTrash, FaBriefcase, FaTimes, FaSave,
} from 'react-icons/fa'

const AdminJobs = () => {
  const dispatch = useDispatch()
  const { jobs = [], loading, submitting } = useSelector(
    (state) => state.admin || {}
  )
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    department: 'Production',
    employmentType: 'full-time',
    experience: '',
    location: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    salaryMin: '',
    salaryMax: '',
    openings: 1,
    isActive: true,
    isFeatured: false,
  })

  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [dispatch])

  const resetForm = () => {
    setFormData({
      title: '',
      department: 'Production',
      employmentType: 'full-time',
      experience: '',
      location: '',
      description: '',
      responsibilities: '',
      requirements: '',
      benefits: '',
      salaryMin: '',
      salaryMax: '',
      openings: 1,
      isActive: true,
      isFeatured: false,
    })
    setEditingJob(null)
    setShowForm(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleEdit = (job) => {
    setFormData({
      title: job.title || '',
      department: job.department || 'Production',
      employmentType: job.employmentType || 'full-time',
      experience: job.experience || '',
      location: job.location || '',
      description: job.description || '',
      responsibilities: (job.responsibilities || []).join('\n'),
      requirements: (job.requirements || []).join('\n'),
      benefits: (job.benefits || []).join('\n'),
      salaryMin: job.salaryRange?.min || '',
      salaryMax: job.salaryRange?.max || '',
      openings: job.openings || 1,
      isActive: job.isActive ?? true,
      isFeatured: job.isFeatured ?? false,
    })
    setEditingJob(job)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    try {
      await dispatch(deleteJob(id)).unwrap()
      toast.success('Job deleted')
    } catch (err) {
      toast.error(err || 'Failed to delete')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ VALIDATE FIRST
    if (!formData.title?.trim()) {
      toast.error('Job title is required')
      return
    }
    if (!formData.description?.trim()) {
      toast.error('Job description is required')
      return
    }
    if (!formData.location?.trim()) {
      toast.error('Location is required')
      return
    }
    if (!formData.experience?.trim()) {
      toast.error('Experience is required')
      return
    }

    // ✅ BUILD PAYLOAD with EXACT backend field names
    const payload = {
      title: formData.title.trim(),
      department: formData.department,
      employmentType: formData.employmentType,
      experience: formData.experience.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      openings: Number(formData.openings) || 1,
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      responsibilities: formData.responsibilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: formData.requirements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: formData.benefits
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    // Salary (only if provided)
    if (formData.salaryMin || formData.salaryMax) {
      payload.salaryRange = {
        min: Number(formData.salaryMin) || 0,
        max: Number(formData.salaryMax) || 0,
        currency: 'INR',
      }
    }


    try {
      if (editingJob) {
        await dispatch(
          updateJob({ id: editingJob._id, jobData: payload })
        ).unwrap()
        toast.success('Job updated successfully')
      } else {
        await dispatch(createJob(payload)).unwrap()
        toast.success('Job created successfully')
      }
      resetForm()
    } catch (err) {
      console.error('❌ Submit failed:', err)
      toast.error(err || 'Failed to save job')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
            Careers / Jobs
          </h1>
          <p className="text-dark-500 text-sm">{jobs.length} total jobs</p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="btn-primary w-full sm:w-auto"
        >
          <FaPlus size={14} /> Add Job
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border-l-4 border-primary-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold">
              {editingJob ? 'Edit Job' : 'Create New Job'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-dark-500 hover:text-dark-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-field">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Production Supervisor"
                  required
                />
              </div>

              <div>
                <label className="label-field">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="Production">Production</option>
                  <option value="Quality">Quality</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Admin">Admin</option>
                  <option value="Logistics">Logistics</option>
                  <option value="R&D">R&D</option>
                </select>
              </div>

              <div>
                <label className="label-field">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="label-field">
                  Experience Required <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Fresher, 2-3 years"
                  required
                />
              </div>

              <div>
                <label className="label-field">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Chennai, Tamil Nadu"
                  required
                />
              </div>

              <div>
                <label className="label-field">Number of Openings</label>
                <input
                  type="number"
                  name="openings"
                  min="1"
                  value={formData.openings}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-field">Salary Min (₹)</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="15000"
                />
              </div>

              <div>
                <label className="label-field">Salary Max (₹)</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="30000"
                />
              </div>
            </div>

            <div>
              <label className="label-field">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Describe the job role..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label-field">Responsibilities (one per line)</label>
                <textarea
                  name="responsibilities"
                  rows="5"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="input-field resize-none text-sm"
                  placeholder={'Supervise production\nQuality checks'}
                />
              </div>
              <div>
                <label className="label-field">Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  rows="5"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="input-field resize-none text-sm"
                  placeholder={'Diploma in Engineering\n2+ years experience'}
                />
              </div>
              <div>
                <label className="label-field">Benefits (one per line)</label>
                <textarea
                  name="benefits"
                  rows="5"
                  value={formData.benefits}
                  onChange={handleChange}
                  className="input-field resize-none text-sm"
                  placeholder={'Health insurance\nPaid leave'}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-dark-700">
                  Active (visible to public)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-dark-700">Featured</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50"
              >
                <FaSave size={14} />
                {submitting ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 sm:p-12 text-center">
          <FaBriefcase className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">No jobs posted</h3>
          <p className="text-dark-500 mb-6 text-sm">
            Start by adding your first job opening
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <FaPlus size={14} /> Add Job
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow p-4 sm:p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-dark-900 text-base sm:text-lg">
                      {job.title}
                    </h3>
                    {job.isFeatured && (
                      <span className="badge bg-yellow-100 text-yellow-800">
                        ⭐ Featured
                      </span>
                    )}
                    <span
                      className={`badge ${
                        job.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-600">
                    <span>🏢 {job.department}</span>
                    <span>📍 {job.location}</span>
                    <span>💼 {job.employmentType}</span>
                    {job.experience && <span>⏳ {job.experience}</span>}
                    <span>👥 {job.openings} openings</span>
                    <span>📩 {job.applicationsCount || 0} applications</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(job)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id, job.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminJobs

