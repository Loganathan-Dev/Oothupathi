import React from 'react'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaAward, FaRocket, FaLeaf } from 'react-icons/fa'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: FaShieldAlt,
      title: 'Quality Assurance',
      description: 'We maintain the highest quality standards with ISO 9001:2015 certification.',
      color: 'primary'
    },
    {
      icon: FaAward,
      title: 'Industry Expertise',
      description: 'With over 25 years of experience, we understand the nuances of manufacturing.',
      color: 'secondary'
    },
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'We continuously invest in new technologies to stay ahead of the curve.',
      color: 'accent'
    },
    {
      icon: FaLeaf,
      title: 'Sustainability',
      description: 'Our eco-friendly practices ensure minimal environmental impact.',
      color: 'primary'
    },
  ]

  return (
    <section className="py-20 bg-dark-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary-400 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-secondary-400 to-secondary-500 bg-clip-text text-transparent">
              Oothupathi
            </span>{' '}
            Advantage
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Discover what sets us apart from the competition and why our clients trust us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-dark-800 rounded-2xl p-8 text-center hover:bg-dark-700 transition-colors duration-300 border border-dark-700"
            >
              <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <reason.icon className="text-secondary-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
              <p className="text-sm text-dark-300 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs