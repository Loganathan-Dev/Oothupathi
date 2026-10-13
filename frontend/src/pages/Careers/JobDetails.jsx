import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify'
import {
  FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaClock,
  FaRupeeSign, FaCheckCircle,
} from 'react-icons/fa'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '',
    coverLetter: '',
    resumeUrl: '',
    linkedinUrl: '',
  })

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`)
      setJob(res.data.data.job)
    } catch (err) {
      toast.error('Job not found')
      navigate('/careers')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post(`/jobs/${id}/apply`, formData)
      toast.success('Application submitted successfully!')
      setShowForm(false)
      setFormData({
        name: '', email: '', phone: '', experience: '',
        currentCompany: '', expectedSalary: '', noticePeriod: '',
        coverLetter: '', resumeUrl: '', linkedinUrl: '',
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container-custom max-w-4xl">
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6"
        >
          <FaArrowLeft /> Back to Careers
        </Link>

        {/* Job Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mb-3">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-dark-600 mb-6 pb-6 border-b">
            <span className="flex items-center gap-1.5"><FaBriefcase className="text-primary-600" /> {job.department}</span>
            <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-primary-600" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><FaClock className="text-primary-600" /> {job.employmentType}</span>
            {job.experience && <span>📋 {job.experience}</span>}
            {job.salaryRange?.min > 0 && (
              <span className="flex items-center gap-1.5">
                <FaRupeeSign className="text-primary-600" />
                {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max?.toLocaleString()}
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-lg font-bold text-dark-900 mb-2">Job Description</h2>
              <p className="text-dark-600 whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>

            {job.responsibilities?.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-dark-900 mb-2">Responsibilities</h2>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark-600">
                      <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" size={14} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements?.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-dark-900 mb-2">Requirements</h2>
                <ul className="space-y-1.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark-600">
                      <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" size={14} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits?.length > 0 && (
              <div>
                <h2 className="font-heading text-lg font-bold text-dark-900 mb-2">Benefits</h2>
                <ul className="space-y-1.5">
                  {job.benefits.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark-600">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={14} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn-primary w-full mt-8"
          >
            Apply for this Position
          </button>
        </div>

        {/* Application Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold mb-6">Submit Your Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="label-field">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="label-field">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="label-field">Experience</label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="input-field" placeholder="e.g., 3 years" />
                </div>
                <div>
                  <label className="label-field">Current Company</label>
                  <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="label-field">Expected Salary</label>
                  <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} className="input-field" placeholder="₹ 25,000" />
                </div>
                <div>
                  <label className="label-field">Notice Period</label>
                  <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="input-field" placeholder="e.g., 30 days" />
                </div>
                <div>
                  <label className="label-field">LinkedIn Profile</label>
                  <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="input-field" />
                </div>
              </div>

              <div>
                <label className="label-field">Resume URL</label>
                <input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="input-field" placeholder="Link to your resume (Google Drive, Dropbox, etc.)" />
              </div>

              <div>
                <label className="label-field">Cover Letter *</label>
                <textarea rows="5" name="coverLetter" value={formData.coverLetter} onChange={handleChange} className="input-field resize-none" placeholder="Tell us why you're a great fit..." required />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobDetails