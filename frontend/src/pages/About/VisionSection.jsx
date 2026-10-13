import React from 'react'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'

const VisionSection = () => {
  return (
    <section className="py-20 bg-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <FaEye className="text-4xl text-primary-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Vision</h2>
          <p className="text-lg text-dark-600 leading-relaxed">
            To be the global leader in manufacturing innovation, setting new standards of quality 
            and excellence while creating sustainable value for our customers and communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;