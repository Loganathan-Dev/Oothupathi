import React, { useState } from 'react'

const JobFilters = () => {
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    location: ''
  })

  const departments = ['All', 'Engineering', 'IT', 'Product', 'Design', 'Sales']
  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship']
  const locations = ['All', 'On-site', 'Remote', 'Hybrid']

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <button className="btn-primary">Apply Filters</button>
        </div>
      </div>
    </section>
  );
};

export default JobFilters;