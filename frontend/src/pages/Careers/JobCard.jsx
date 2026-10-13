import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'

const JobCard = () => {
  const jobs = [
    { id: 1, title: 'Senior Software Engineer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Product Manager', department: 'Product', type: 'Full-time', location: 'On-site' },
    { id: 3, title: 'UI/UX Designer', department: 'Design', type: 'Contract', location: 'Hybrid' },
    { id: 4, title: 'Sales Executive', department: 'Sales', type: 'Full-time', location: 'On-site' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-dark-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm text-dark-500">
                      <FaBriefcase className="text-primary-600" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-dark-500">
                      <FaMapMarkerAlt className="text-primary-600" />
                      {job.location}
                    </span>
                    <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link to={`/careers/${job.id}`} className="btn-primary flex items-center gap-2">
                  Apply Now
                  <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCard;