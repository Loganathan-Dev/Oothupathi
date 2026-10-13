import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBriefcase,
  FaClipboardList,
  FaEnvelope,
  FaExternalLinkAlt,
  FaImages,
  FaCog,
  FaTachometerAlt,
} from 'react-icons/fa'

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  // ✅ Complete navigation with all admin pages
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt, exact: true },
    { name: 'Products', path: '/admin/products', icon: FaBox },
    { name: 'Orders', path: '/admin/orders', icon: FaShoppingCart },
    { name: 'Enquiries', path: '/admin/enquiries', icon: FaEnvelope },
    { name: 'Jobs', path: '/admin/jobs', icon: FaBriefcase },
    { name: 'Applications', path: '/admin/applications', icon: FaClipboardList },
    { name: 'Gallery', path: '/admin/gallery', icon: FaImages },
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Analytics', path: '/admin/analytics', icon: FaChartLine },
  ]

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* ===== MOBILE HEADER ===== */}
      <header className="lg:hidden sticky top-0 z-40 bg-dark-900 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-base">
              O
            </div>
            <div>
              <p className="font-heading font-bold text-sm leading-tight">Oothupathi</p>
              <p className="text-[10px] text-dark-400">Admin Panel</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="bg-dark-900 border-t border-dark-700 animate-fade-in">
            <nav className="p-3 space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
              {/* Admin Info */}
              <div className="p-3 mb-2 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-dark-400 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    isActive(item.path, item.exact)
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:bg-dark-800'
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-dark-700 space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-300 hover:bg-dark-800 font-medium text-sm"
                >
                  <FaExternalLinkAlt size={14} />
                  View Site
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 font-medium text-sm"
                >
                  <FaSignOutAlt size={16} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-dark-900 text-white h-screen sticky top-0 flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center font-bold text-lg">
              O
            </div>
            <div>
              <p className="font-heading font-bold">Oothupathi</p>
              <p className="text-xs text-dark-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    isActive(item.path, item.exact)
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-dark-700 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-300 hover:bg-dark-800 hover:text-white font-medium text-sm transition-colors"
          >
            <FaExternalLinkAlt size={14} />
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 font-medium text-sm transition-colors"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout