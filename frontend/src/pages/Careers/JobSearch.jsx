import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="container-custom max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search jobs by title, department, or keyword..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
        </form>
      </div>
    </section>
  );
};

export default JobSearch;
