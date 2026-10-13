import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const Careers = () => {
  const jobs = [
    { id: 1, title: 'Senior Software Engineer', department: 'IT', type: 'Full-time', status: 'Active' },
    { id: 2, title: 'Product Manager', department: 'Product', type: 'Full-time', status: 'Active' },
    { id: 3, title: 'UI/UX Designer', department: 'Design', type: 'Contract', status: 'Inactive' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark-900">Careers</h1>
        <button className="btn-primary flex items-center gap-2">
          <FaPlus size={14} />
          Add Job
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-600">{job.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-600">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary-600 hover:text-primary-800 mr-2">
                      <FaEye />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Careers;