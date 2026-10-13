import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: '+1 (234) 567-890',
      link: 'tel:+1234567890'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'info@oothupathi.com',
      link: 'mailto:info@oothupathi.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: '123 Manufacturing Hub, Chennai, India',
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      details: 'Mon - Sat, 9:00 AM - 6:00 PM',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="section-title">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="section-subtitle">
            Have questions or need a quote? We're here to help. Reach out to us today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label-field">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="label-field">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="label-field">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="label-field">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="input-field resize-none"
                  placeholder="Tell us how we can help"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-800">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-dark-500 hover:text-primary-600 transition-colors">
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-dark-500">{info.details}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
