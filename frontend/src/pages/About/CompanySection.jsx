import React from 'react'
import { motion } from 'framer-motion'

const CompanySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Company</h2>
          <p className="text-lg text-dark-600 max-w-3xl mx-auto">
            Oothupathi has been at the forefront of manufacturing innovation for over 25 years. 
            We combine traditional craftsmanship with modern technology to deliver products that exceed expectations.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-primary-600">25+</div>
              <p className="text-dark-600 mt-2">Years of Experience</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-primary-600">500+</div>
              <p className="text-dark-600 mt-2">Happy Clients</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl font-bold text-primary-600">50+</div>
              <p className="text-dark-600 mt-2">Awards Won</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanySection;