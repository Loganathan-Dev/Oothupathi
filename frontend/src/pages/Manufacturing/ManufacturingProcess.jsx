import React from 'react'
import { motion } from 'framer-motion'
import { FaLightbulb, FaPencilRuler, FaIndustry, FaCheckCircle } from 'react-icons/fa'

const ManufacturingProcess = () => {
  const steps = [
    { icon: FaLightbulb, title: 'Design', description: 'Collaborative design and prototyping' },
    { icon: FaPencilRuler, title: 'Engineering', description: 'Detailed engineering and planning' },
    { icon: FaIndustry, title: 'Production', description: 'Precision manufacturing and assembly' },
    { icon: FaCheckCircle, title: 'Quality', description: 'Rigorous quality control testing' },
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
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Process</h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            A streamlined process ensuring quality at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-center p-6 bg-white rounded-xl shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <step.icon className="text-primary-600 text-2xl" />
                </div>
                <div className="text-sm font-bold text-primary-600 mb-1">Step {index + 1}</div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{step.title}</h3>
                <p className="text-sm text-dark-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-primary-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ManufacturingProcess