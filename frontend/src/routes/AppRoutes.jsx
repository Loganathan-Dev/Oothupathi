import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import CustomerLayout from '../layouts/CustomerLayout'
import AdminLayout from '../layouts/AdminLayout'

// Routes protection
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

// Public Pages
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Products from '../pages/Products/Products'
import ProductDetails from '../pages/Products/ProductDetails'
import Manufacturing from '../pages/Manufacturing/Manufacturing'
import Customize from '../pages/Customize/Customize'
import Gallery from '../pages/Gallery/Gallery'
import Careers from '../pages/Careers/Careers'
import JobDetails from '../pages/Careers/JobDetails'
import Contact from '../pages/Contact/Contact'
import FAQ from '../pages/FAQ/FAQ'
import RequestQuote from '../pages/Quote/RequestQuote'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy'
import Terms from '../pages/Legal/Terms'

// Auth Pages
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ResetPassword from '../pages/Auth/ResetPassword'

// Customer Dashboard Pages
import CustomerDashboard from '../pages/Dashboard/CustomerDashboard'
import Profile from '../pages/Dashboard/Profile'
import CustomerOrders from '../pages/Dashboard/Orders'
import CustomerOrderDetails from '../pages/Dashboard/OrderDetails'
import CustomerEnquiries from '../pages/Dashboard/Enquiries'
import CustomerCustomRequests from '../pages/Dashboard/CustomRequests'
import CustomerApplications from '../pages/Dashboard/Applications'

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import AdminProducts from '../pages/Admin/Products'
import AdminProductForm from '../pages/Admin/ProductForm'
import AdminOrders from '../pages/Admin/Orders'
import AdminUsers from '../pages/Admin/Users'
import AdminAnalytics from '../pages/Admin/Analytics'
import AdminJobs from '../pages/Admin/Jobs'
import AdminApplications from '../pages/Admin/Applications'
import AdminEnquiries from '../pages/Admin/Enquiries'

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="manufacturing" element={<Manufacturing />} />
        <Route path="customize" element={<Customize />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="careers" element={<Careers />} />
        <Route path="careers/:id" element={<JobDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="quote" element={<RequestQuote />} />
        <Route path="cart" element={<Cart />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
      </Route>

      {/* ========== AUTH ROUTES ========== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ========== CUSTOMER ROUTES (Protected) ========== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="orders/:id" element={<CustomerOrderDetails />} />
          <Route path="enquiries" element={<CustomerEnquiries />} />
          <Route path="custom-requests" element={<CustomerCustomRequests />} />
          <Route path="applications" element={<CustomerApplications />} />
        </Route>
      </Route>

      {/* ========== ADMIN ROUTES (Protected + Admin only) ========== */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      {/* ========== FALLBACK ========== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes