import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaUserGraduate, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa'

const CareersSection = () => {
  const benefits = [
    { icon: FaUserGraduate, title: 'Learning & Development', description: 'Continuous learning opportunities' },
    { icon: FaUsers, title: 'Great Culture', description: 'Collaborative and inclusive environment' },
    { icon: FaRocket, title: 'Career Growth', description: 'Fast-track your career with us' },
    { icon: FaShieldAlt, title: 'Job Security', description: 'Stable and secure employment' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Careers</span>
            <h2 className="section-title mt-2">
              Join Our{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-dark-600 leading-relaxed mb-6">
              At Oothupathi, we believe in nurturing talent and fostering innovation. We're always looking for passionate individuals who want to make a difference.
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <benefit.icon className="text-secondary-500 text-lg mt-1" />
                  <div>
                    <h4 className="font-semibold text-dark-800">{benefit.title}</h4>
                    <p className="text-sm text-dark-500">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/careers" className="btn-primary flex items-center gap-2">
              View Openings
              <FaArrowRight />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/src/assets/images/careers/careers-team.jpg"
                alt="Join Our Team"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CareersSection;