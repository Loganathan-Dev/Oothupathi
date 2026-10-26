import React, { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../features/cart/cartSlice'
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaCog,
} from 'react-icons/fa'

const PublicLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const cartCount = useSelector(selectCartCount)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        { name: 'All Products', path: '/products' },
        { name: 'Customize', path: '/customize' },
        { name: 'Request Quote', path: '/quote' },
      ],
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const toggleDropdown = (name) =>
    setActiveDropdown(activeDropdown === name ? null : name)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="hidden lg:block bg-dark-900 text-white py-2 text-sm">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919787772674" className="flex items-center gap-2 hover:text-secondary-400">
              <FaPhone className="text-secondary-500 text-xs" />
              +91 9787772674
            </a>
            <a href="mailto:SAI@oothupathi.com" className="flex items-center gap-2 hover:text-secondary-400">
              <FaEnvelope className="text-secondary-500 text-xs" />
              SAI@oothupathi.com
            </a>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-secondary-500 text-xs" />
              Chennai, India
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-1 hover:text-secondary-400">
                    <FaCog size={12} /> Admin
                  </Link>
                )}
                <Link to="/dashboard" className="hover:text-secondary-400">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-secondary-400">Sign In</Link>
                <span className="text-dark-400">|</span>
                <Link to="/register" className="hover:text-secondary-400">Register</Link>
              </>
            )}
            <div className="flex items-center gap-3 ml-2">
              <a href="#" className="hover:text-secondary-400"><FaFacebook size={13} /></a>
              <a href="#" className="hover:text-secondary-400"><FaTwitter size={13} /></a>
              <a href="#" className="hover:text-secondary-400"><FaLinkedin size={13} /></a>
              <a href="#" className="hover:text-secondary-400"><FaYoutube size={13} /></a>
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg sm:text-xl shadow-lg">
                O
              </div>
              <div>
                <h1 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 leading-tight">
                  Oothupathi
                </h1>
                <p className="hidden sm:block text-[10px] text-dark-500 tracking-widest uppercase">
                  Sambrani & Herbal
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.name)}
                      className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all ${
                        isActive(item.path)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-dark-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.name}
                      <FaChevronDown size={10} className={activeDropdown === item.name ? 'rotate-180' : ''} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive(item.path)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-dark-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2.5 text-sm text-dark-700 hover:bg-primary-50 hover:text-primary-600"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-primary-50">
                <FaShoppingCart className="text-dark-700 text-lg sm:text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-secondary-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/quote" className="hidden lg:inline-flex btn-primary text-sm">
                Get a Quote
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-primary-50"
              >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container-custom py-4">
              <div className="pb-4 mb-4 border-b border-gray-100">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-dark-900 text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-dark-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1 text-center py-2.5 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold text-sm" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" className="flex-1 text-center py-2.5 bg-primary-600 text-white rounded-lg font-semibold text-sm" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.name)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-dark-700 hover:bg-primary-50 rounded-lg"
                        >
                          <span className="font-medium">{item.name}</span>
                          <FaChevronDown size={12} className={activeDropdown === item.name ? 'rotate-180' : ''} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-4 space-y-1 mt-1">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 text-sm text-dark-600 hover:bg-primary-50 rounded-lg"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-medium ${
                          isActive(item.path)
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-dark-700 hover:bg-primary-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-dark-700 hover:bg-primary-50 rounded-lg font-medium"
                  >
                    My Dashboard
                  </Link>
                )}
                <Link to="/quote" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children || <Outlet />}
      </main>

      <footer className="bg-dark-900 text-white">
        <div className="container-custom py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center font-heading font-bold text-lg">
                  O
                </div>
                <h2 className="font-heading text-xl font-bold">Oothupathi</h2>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed mb-5">
                Premium sambrani, dhoop, incense sticks, and herbal products crafted with natural ingredients.
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                {[FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 bg-dark-700 rounded-lg flex items-center justify-center hover:bg-primary-600">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                <li><Link to="/about" className="text-dark-300 hover:text-secondary-400 text-sm">About Us</Link></li>
                <li><Link to="/products" className="text-dark-300 hover:text-secondary-400 text-sm">Products</Link></li>
                <li><Link to="/customize" className="text-dark-300 hover:text-secondary-400 text-sm">Customize</Link></li>
                <li><Link to="/gallery" className="text-dark-300 hover:text-secondary-400 text-sm">Gallery</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-heading text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2.5">
                <li><Link to="/faq" className="text-dark-300 hover:text-secondary-400 text-sm">FAQ</Link></li>
                <li><Link to="/contact" className="text-dark-300 hover:text-secondary-400 text-sm">Contact Us</Link></li>
                <li><Link to="/quote" className="text-dark-300 hover:text-secondary-400 text-sm">Request Quote</Link></li>
                <li><Link to="/privacy-policy" className="text-dark-300 hover:text-secondary-400 text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-dark-300 hover:text-secondary-400 text-sm">Terms</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-heading text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-dark-300">
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <FaMapMarkerAlt className="text-secondary-500 mt-0.5 flex-shrink-0" />
                  <span>SAI Manufacturing Hub, Chennai, India</span>
                </li>
                <li className="flex items-center gap-3 justify-center sm:justify-start">
                  <FaPhone className="text-secondary-500 flex-shrink-0" />
                  <a href="tel:+91978772674" className="hover:text-secondary-400">+91 978772674</a>
                </li>
                <li className="flex items-center gap-3 justify-center sm:justify-start">
                  <FaEnvelope className="text-secondary-500 flex-shrink-0" />
                  <a href="mailto:SAI@oothupathi.com" className="hover:text-secondary-400">SAI@oothupathi.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-dark-400">
              © {new Date().getFullYear()} Oothupathi. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-dark-400">
              <Link to="/privacy-policy" className="hover:text-secondary-400">Privacy</Link>
              <Link to="/terms" className="hover:text-secondary-400">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
