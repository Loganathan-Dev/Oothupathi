import React, { useState } from 'react'

const ProductFilters = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    material: ''
  })

  const categories = ['All', 'Components', 'Tooling', 'Machinery', 'Packaging']
  const priceRanges = ['All', 'Under $100', '$100 - $500', '$500 - $1000', 'Over $1000']
  const materials = ['All', 'Steel', 'Aluminum', 'Plastic', 'Composite']

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            {priceRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filters.material}
            onChange={(e) => handleFilterChange('material', e.target.value)}
          >
            {materials.map((mat) => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <button className="btn-primary">Apply Filters</button>
        </div>
      </div>
    </section>
  )
}

export default ProductFilters