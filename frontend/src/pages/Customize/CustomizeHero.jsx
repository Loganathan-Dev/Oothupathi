import React from 'react'
import { motion } from 'framer-motion'

const CustomizeHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-900 to-dark-900 text-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customize Your Product</h1>
          <p className="text-lg text-primary-200">
            Bring your ideas to life with our custom manufacturing service.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomizeHero;