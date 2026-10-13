import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaAward, FaUsers, FaIndustry } from 'react-icons/fa'

function AboutSection() {
  const stats = [
    { icon: FaIndustry, value: '25+', label: 'Years of Experience' },
    { icon: FaUsers, value: '500+', label: 'Happy Clients' },
    { icon: FaAward, value: '50+', label: 'Awards Won' },
    { icon: FaCheckCircle, value: '100%', label: 'Quality Guarantee' },
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
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="section-title mt-2">
              Leading the Way in{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Manufacturing
              </span>
            </h2>
            <p className="text-dark-600 leading-relaxed mb-6">
              Oothupathi has been at the forefront of manufacturing innovation for over two decades. We combine traditional craftsmanship with modern technology to deliver products that exceed expectations.
            </p>
            <p className="text-dark-600 leading-relaxed mb-8">
              Our commitment to quality, sustainability, and customer satisfaction has made us a trusted partner for businesses worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                Learn More
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <stat.icon className="text-primary-600 w-8 h-8 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                  <p className="text-sm text-dark-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;