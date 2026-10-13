import React from 'react'
import { motion } from 'framer-motion'
import { FaCogs, FaTools, FaIndustry, FaMicrochip } from 'react-icons/fa'

const Capabilities = () => {
  const capabilities = [
    { icon: FaCogs, title: 'CNC Machining', description: 'Precision CNC machining for complex components' },
    { icon: FaTools, title: 'Tooling Design', description: 'Custom tooling design and manufacturing' },
    { icon: FaIndustry, title: 'Mass Production', description: 'High-volume production capabilities' },
    { icon: FaMicrochip, title: 'Quality Testing', description: 'Advanced quality testing and inspection' },
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
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Capabilities</h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            We have the expertise and technology to handle diverse manufacturing needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
            >
              <cap.icon className="text-primary-600 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-dark-900 mb-2">{cap.title}</h3>
              <p className="text-sm text-dark-500">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities