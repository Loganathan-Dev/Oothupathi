import React from 'react'

const GalleryGrid = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Manufacturing Facility',
      category: 'Facility',
    },
    {
      id: 2,
      title: 'Product Showcase',
      category: 'Products',
    },
    {
      id: 3,
      title: 'Production Process',
      category: 'Manufacturing',
    },
    {
      id: 4,
      title: 'Quality Control',
      category: 'Quality',
    },
    {
      id: 5,
      title: 'Our Team',
      category: 'Team',
    },
    {
      id: 6,
      title: 'Finished Products',
      category: 'Products',
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-56 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  Image Placeholder
                </span>
              </div>

              <div className="p-5">
                <p className="text-sm text-primary-600 font-medium mb-2">
                  {item.category}
                </p>

                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryGrid