import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaShieldAlt, FaAward, FaCog } from 'react-icons/fa'

const QualitySection = () => {
  const qualityItems = [
    { icon: FaCheckCircle, title: 'ISO Certified', description: 'ISO 9001:2015 certified quality management' },
    { icon: FaShieldAlt, title: 'Quality Assurance', description: 'Rigorous testing and quality checks' },
    { icon: FaAward, title: 'Industry Recognition', description: 'Awarded for manufacturing excellence' },
    { icon: FaCog, title: 'Continuous Improvement', description: 'Always evolving and improving' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Quality Commitment</h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            We are committed to delivering the highest quality products and services.
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
              <item.icon className="text-secondary-500 text-3xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-dark-900 mb-2">{item.title}</h3>
              <p className="text-sm text-dark-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;