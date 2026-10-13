import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

const QuoteSummary = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Quote Request Submitted!</h2>
          <p className="text-dark-600">
            Thank you for your request. Our team will review your requirements and get back to you within 24-48 hours with a detailed quote.
          </p>
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-dark-900 mb-2">What happens next?</h3>
            <ul className="text-left text-dark-600 space-y-2">
              <li>1. Our team reviews your requirements</li>
              <li>2. We prepare a detailed quote</li>
              <li>3. You receive the quote via email</li>
              <li>4. We discuss and refine as needed</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSummary;