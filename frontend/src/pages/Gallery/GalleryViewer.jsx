import React, { useState } from 'react'

const GalleryViewer = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    {
      id: 1,
      title: 'Manufacturing Facility',
    },
    {
      id: 2,
      title: 'Product Showcase',
    },
    {
      id: 3,
      title: 'Production Process',
    },
  ]

  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Gallery Preview
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition"
              >
                <span className="text-gray-600 text-sm">
                  {image.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <span className="text-gray-500">
                Image Placeholder
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedImage.title}
            </h3>

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryViewer