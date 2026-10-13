import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaLeaf, FaFlask, FaAward, FaCheckCircle } from 'react-icons/fa'

const ManufacturingSection = () => {
  const features = [
    { icon: FaLeaf, title: 'Natural Ingredients', desc: 'Pure benzoin resin and natural herbs' },
    { icon: FaFlask, title: 'Traditional Methods', desc: 'Time-honored crafting techniques' },
    { icon: FaAward, title: 'Quality Assured', desc: 'Every product tested for purity' },
    { icon: FaCheckCircle, title: '100% Chemical-Free', desc: 'No artificial additives' },
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
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mt-2 mb-6">
              Crafted with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Tradition & Care
              </span>
            </h2>
            <p className="text-dark-600 leading-relaxed mb-6">
              Every product at Oothupathi is crafted using traditional methods passed down 
              through generations. We source only the finest natural ingredients and process 
              them with care to preserve their natural goodness.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-secondary-500 text-lg mt-1">✓</span>
                <span className="text-dark-600">Hand-rolled by skilled artisans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary-500 text-lg mt-1">✓</span>
                <span className="text-dark-600">No chemicals or artificial fragrances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary-500 text-lg mt-1">✓</span>
                <span className="text-dark-600">Environmentally friendly packaging</span>
              </li>
            </ul>
            <Link to="/manufacturing" className="btn-primary flex items-center gap-2">
              Learn More
              <FaArrowRight />
            </Link>
          </motion.div>

          {/* Grid instead of images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 ${
                  i % 2 === 1 ? 'mt-8' : ''
                }`}
              >
                <feature.icon className="text-primary-600 text-3xl mb-3" />
                <h3 className="font-semibold text-dark-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-dark-600">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ManufacturingSection