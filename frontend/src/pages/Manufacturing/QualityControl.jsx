import React from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaClipboardCheck, FaFlask, FaChartLine } from 'react-icons/fa'

const QualityControl = () => {
  const qualityItems = [
    { icon: FaShieldAlt, title: 'ISO Certified', description: 'ISO 9001:2015 certified processes' },
    { icon: FaClipboardCheck, title: 'Inspection', description: 'Comprehensive quality inspections' },
    { icon: FaFlask, title: 'Testing', description: 'Advanced material and product testing' },
    { icon: FaChartLine, title: 'Continuous Improvement', description: 'Ongoing quality enhancement' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Quality Control</h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            Our commitment to quality ensures every product meets the highest standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <item.icon className="text-secondary-500 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-dark-900 mb-2">{item.title}</h3>
              <p className="text-sm text-dark-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QualityControl