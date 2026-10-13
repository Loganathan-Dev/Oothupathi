import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaStar, FaHandshake, FaLeaf } from 'react-icons/fa'

const ValuesSection = () => {
  const values = [
    { icon: FaHeart, title: 'Integrity', description: 'We operate with honesty and transparency' },
    { icon: FaStar, title: 'Excellence', description: 'We strive for perfection in everything we do' },
    { icon: FaHandshake, title: 'Customer First', description: 'Our customers are at the heart of our business' },
    { icon: FaLeaf, title: 'Sustainability', description: 'We are committed to environmental responsibility' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Values</h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            The principles that guide everything we do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center"
            >
              <value.icon className="text-primary-600 text-3xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-dark-900 mb-2">{value.title}</h3>
              <p className="text-sm text-dark-500">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;