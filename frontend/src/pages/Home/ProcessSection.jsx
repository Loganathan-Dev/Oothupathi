import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaLightbulb, 
  FaPencilRuler, 
  FaIndustry, 
  FaCheckCircle, 
  FaBoxOpen, 
  FaHandshake 
} from 'react-icons/fa'

const ProcessSection = () => {
  const steps = [
    {
      icon: FaLightbulb,
      title: 'Ideation',
      description: 'We work with you to understand your requirements and develop innovative solutions.'
    },
    {
      icon: FaPencilRuler,
      title: 'Design & Development',
      description: 'Our team creates detailed designs and prototypes to bring your vision to life.'
    },
    {
      icon: FaIndustry,
      title: 'Manufacturing',
      description: 'Using advanced technology and skilled craftsmanship, we produce high-quality products.'
    },
    {
      icon: FaCheckCircle,
      title: 'Quality Control',
      description: 'Every product undergoes rigorous testing and inspection to ensure perfection.'
    },
    {
      icon: FaBoxOpen,
      title: 'Packaging & Delivery',
      description: 'We package your products with care and deliver them on time, every time.'
    },
    {
      icon: FaHandshake,
      title: 'After-Sales Support',
      description: 'Our commitment to you continues even after delivery with dedicated support.'
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
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Process</span>
          <h2 className="section-title">
            How We{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="section-subtitle">
            From ideation to delivery, our streamlined process ensures excellence at every step.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card p-6 text-center group hover:border-primary-200 border-2 border-transparent"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                <step.icon className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-dark-900 mb-2">{step.title}</h3>
              <p className="text-sm text-dark-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection