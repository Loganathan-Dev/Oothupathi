import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const CustomRequests = () => {
  const requests = [
    { id: 1, product: 'Custom Machined Parts', client: 'ABC Manufacturing', status: 'Pending', date: '2024-01-15' },
    { id: 2, product: 'Specialized Tooling', client: 'XYZ Industries', status: 'In Progress', date: '2024-01-14' },
    { id: 3, product: 'Custom Packaging', client: 'DEF Corp', status: 'Quoted', date: '2024-01-13' },
    { id: 4, product: 'Precision Components', client: 'GHI Ltd', status: 'Approved', date: '2024-01-12' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-dark-900 mb-6">Custom Requests</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dark-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-900">{request.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-600">{request.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'Quoted' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-600">{request.date}</td>
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

export default CustomRequests;