import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ApplicationForm = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your application has been submitted.')
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-900 mb-6">Apply for Position</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">Cover Letter</label>
            <textarea
              name="coverLetter"
              rows="6"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              value={formData.coverLetter}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
