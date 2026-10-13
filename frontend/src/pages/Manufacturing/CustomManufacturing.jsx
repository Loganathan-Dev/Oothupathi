import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const CustomManufacturing = () => {
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Manufacturing Solutions</h2>
          <p className="text-lg text-primary-200 mb-8">
            Need something specific? We can create custom solutions tailored to your exact requirements.
          </p>
          <Link to="/customize" className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Start Your Custom Project
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomManufacturing