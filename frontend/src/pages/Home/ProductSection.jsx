import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaFire, FaLeaf, FaSpa, FaGift } from 'react-icons/fa'

const ProductSection = () => {
  const products = [
    {
      icon: FaFire,
      title: 'Sambrani Products',
      description: 'Traditional sambrani cups, dhoop sticks, and loban cones made with pure benzoin resin.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FaLeaf,
      title: 'Herbal Products',
      description: 'Natural bath powders, face packs, and hair oils made with traditional herbs.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: FaSpa,
      title: 'Incense Sticks',
      description: 'Premium incense sticks in sandalwood, jasmine, rose and more natural fragrances.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaGift,
      title: 'Gift Boxes',
      description: 'Beautifully curated gift boxes for festivals, weddings, and special occasions.',
      color: 'from-blue-500 to-indigo-600'
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2 mb-4">
            Premium{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Sambrani & Herbal
            </span>{' '}
            Products
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            Discover our range of traditional products made with natural ingredients and time-honored methods.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden group"
            >
              {/* Gradient header instead of image */}
              <div className={`h-32 bg-gradient-to-br ${product.color} flex items-center justify-center relative`}>
                <product.icon className="text-white text-5xl opacity-90 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{product.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed mb-4">{product.description}</p>
                <Link
                  to="/products"
                  className="text-primary-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  Shop Now
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/products" className="btn-primary">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductSection