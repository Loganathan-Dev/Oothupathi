import React, { useState } from 'react'

const GalleryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = [
    'All',
    'Facility',
    'Products',
    'Manufacturing',
    'Team',
    'Quality',
  ]

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border transition ${
                activeCategory === category
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryFilter