import React from 'react'
import { FaImages } from 'react-icons/fa'

const AdminGallery = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
          Gallery
        </h1>
        <p className="text-dark-500 text-sm">Manage your product images</p>
      </div>

      <div className="bg-white rounded-xl shadow p-8 sm:p-12 text-center">
        <FaImages className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-semibold mb-2">
          Gallery Coming Soon
        </h3>
        <p className="text-dark-500 text-sm">
          Upload and manage product images here.
        </p>
      </div>
    </div>
  )
}

export default AdminGallery
