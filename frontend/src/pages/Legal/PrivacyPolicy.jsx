import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="container-custom max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-dark-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-dark-600">Last updated: January 2024</p>
          
          <h2 className="text-2xl font-semibold text-dark-900 mt-6">1. Information We Collect</h2>
          <p className="text-dark-600">We collect information you provide directly, such as name, email, phone number, and company details.</p>
          
          <h2 className="text-2xl font-semibold text-dark-900 mt-6">2. How We Use Your Information</h2>
          <p className="text-dark-600">We use your information to process orders, provide services, and improve our offerings.</p>
          
          <h2 className="text-2xl font-semibold text-dark-900 mt-6">3. Information Sharing</h2>
          <p className="text-dark-600">We do not sell or share your personal information with third parties.</p>
          
          <h2 className="text-2xl font-semibold text-dark-900 mt-6">4. Data Security</h2>
          <p className="text-dark-600">We implement appropriate security measures to protect your personal information.</p>
          
          <h2 className="text-2xl font-semibold text-dark-900 mt-6">5. Contact Us</h2>
          <p className="text-dark-600">If you have questions about this policy, contact us at privacy@oothupathi.com</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy