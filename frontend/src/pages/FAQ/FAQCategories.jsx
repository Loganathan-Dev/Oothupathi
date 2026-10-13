import React, { useState } from 'react'

const FAQCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'products', name: 'Products' },
    { id: 'ordering', name: 'Ordering' },
    { id: 'customization', name: 'Customization' },
    { id: 'support', name: 'Support' },
  ]

  return (
    <div className="py-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                : 'bg-white text-dark-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FAQCategories