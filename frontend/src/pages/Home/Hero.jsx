import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaFire, FaLeaf, FaSpa, FaGift } from 'react-icons/fa'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center 
                        bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 
                        overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-primary-500 rounded-full opacity-10 top-20 -left-10 sm:left-10 animate-float"></div>
        <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-secondary-500 rounded-full opacity-10 bottom-20 -right-10 sm:right-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Side - Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 
                              bg-primary-500/20 backdrop-blur-sm
                              text-primary-200 rounded-full 
                              text-xs sm:text-sm font-medium mb-6">
                🔥 Traditional Sambrani Since 1995
              </span>

              <h1 className="font-heading font-bold text-white 
                            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                            leading-[1.1] tracking-tight mb-6">
                Premium{' '}
                <span className="bg-gradient-to-r from-secondary-400 to-secondary-500 
                                bg-clip-text text-transparent">
                  Sambrani
                </span>
                <br className="hidden sm:block" />
                {' '}& Herbal Products
              </h1>

              <p className="text-base sm:text-lg lg:text-xl 
                           text-dark-300 leading-relaxed 
                           mb-8 max-w-xl mx-auto lg:mx-0">
                Oothupathi brings you traditional sambrani, dhoop, incense sticks, 
                and herbal products crafted with natural ingredients and time-honored methods.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 
                             justify-center lg:justify-start">
                <Link to="/products" className="btn-secondary">
                  Shop Now
                  <FaArrowRight size={14} />
                </Link>
                <Link to="/quote" 
                      className="inline-flex items-center justify-center gap-2
                                px-6 py-3 bg-white/10 backdrop-blur-sm 
                                text-white font-semibold text-sm sm:text-base
                                rounded-xl border-2 border-white/20
                                hover:bg-white/20 active:scale-[0.98]
                                transition-all duration-300">
                  Request Quote
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: FaFire, title: 'Sambrani', sub: 'Natural benzoin', color: 'from-orange-500 to-red-500', delay: 0 },
                { icon: FaLeaf, title: 'Herbal', sub: '100% natural', color: 'from-green-500 to-emerald-600', delay: 'mt-6 sm:mt-8' },
                { icon: FaSpa, title: 'Incense', sub: 'Pure fragrances', color: 'from-purple-500 to-pink-500', delay: '' },
                { icon: FaGift, title: 'Gift Boxes', sub: 'For festivals', color: 'from-blue-500 to-indigo-600', delay: 'mt-6 sm:mt-8' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-5 
                            border border-white/20 text-white 
                            hover:bg-white/20 transition-all duration-300
                            hover:scale-105 ${item.delay}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 
                                  bg-gradient-to-br ${item.color}
                                  rounded-xl flex items-center justify-center mb-3`}>
                    <item.icon className="text-white text-lg sm:text-xl" />
                  </div>
                  <p className="font-heading font-bold text-base sm:text-lg">{item.title}</p>
                  <p className="text-xs text-dark-300 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 
                          bg-white rounded-2xl p-3 sm:p-4 shadow-2xl">
              <p className="font-heading text-xl sm:text-2xl font-bold text-primary-600">5000+</p>
              <p className="text-[10px] sm:text-xs text-dark-500">Happy Customers</p>
            </div>
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 
                          bg-white rounded-2xl p-3 sm:p-4 shadow-2xl">
              <p className="font-heading text-xl sm:text-2xl font-bold text-secondary-500">100%</p>
              <p className="text-[10px] sm:text-xs text-dark-500">Natural</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero