import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const ProductCard = () => {
  const products = [
    { id: 1, name: 'Industrial Component A', category: 'Components', price: '$149.99', image: '/src/assets/images/products/product1.jpg' },
    { id: 2, name: 'Custom Tooling Set', category: 'Tooling', price: '$299.99', image: '/src/assets/images/products/product2.jpg' },
    { id: 3, name: 'Machinery Part X', category: 'Machinery', price: '$89.99', image: '/src/assets/images/products/product3.jpg' },
    { id: 4, name: 'Packaging Solution Pro', category: 'Packaging', price: '$199.99', image: '/src/assets/images/products/product4.jpg' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-dark-400">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-dark-900">{product.name}</h3>
                <p className="text-sm text-dark-500">{product.category}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">{product.price}</p>
                <Link to={`/products/${product.id}`} className="mt-3 inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium text-sm">
                  View Details
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCard