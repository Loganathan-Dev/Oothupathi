import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPaintBrush, FaCube, FaPalette, FaRuler } from 'react-icons/fa'

const CustomProductSection = () => {
  const features = [
    { icon: FaPaintBrush, title: 'Custom Design', description: 'Bring your unique vision to life' },
    { icon: FaCube, title: '3D Modeling', description: 'Visualize before production' },
    { icon: FaPalette, title: 'Material Selection', description: 'Choose from quality materials' },
    { icon: FaRuler, title: 'Precision Crafting', description: 'Exact specifications, every time' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Custom Orders</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2 mb-6">
              Bring Your{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Ideas
              </span>{' '}
              to Life
            </h2>
            <p className="text-dark-600 leading-relaxed mb-6">
              Looking for a custom sambrani blend, personalized incense sticks, or a 
              special herbal formulation? Our team can create products tailored to your 
              exact requirements.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon className="text-secondary-500 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-dark-800 text-sm">{feature.title}</h4>
                    <p className="text-xs text-dark-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/customize" className="btn-primary flex items-center gap-2">
              Start Customizing
              <FaArrowRight />
            </Link>
          </motion.div>

          {/* Custom card instead of image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-8 shadow-2xl">
              <div className="text-white">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-2xl font-bold mb-3">Custom Sambrani</h3>
                <p className="text-primary-100 leading-relaxed mb-4">
                  Choose your own blend of herbs, fragrances, and packaging 
                  to create a unique product that reflects your brand.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-secondary-300">✓</span>
                    Custom scent formulations
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-secondary-300">✓</span>
                    Private label options
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-secondary-300">✓</span>
                    Bulk order discounts
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CustomProductSection