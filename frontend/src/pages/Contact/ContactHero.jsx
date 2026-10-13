import React from 'react'
import { motion } from 'framer-motion'

const ContactHero = () => {
  return (
    <section className="bg-primary-900 text-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Have questions or need a quote? We're here to help. Reach out to us today.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;