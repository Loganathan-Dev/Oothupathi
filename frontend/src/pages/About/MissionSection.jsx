import React from 'react'
import { motion } from 'framer-motion'
import { FaBullseye } from 'react-icons/fa'

const MissionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <FaBullseye className="text-4xl text-secondary-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Mission</h2>
          <p className="text-lg text-dark-600 leading-relaxed">
            To deliver exceptional manufacturing solutions that empower businesses to succeed, 
            through innovation, quality craftsmanship, and unwavering commitment to customer satisfaction.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;