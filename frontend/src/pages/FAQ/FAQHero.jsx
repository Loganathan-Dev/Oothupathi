import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

const FAQHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 text-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-primary-200">
            Find answers to common questions about Oothupathi products, manufacturing and services.
          </p>
          <div className="relative mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-4 py-3 pl-12 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQHero