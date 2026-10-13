import React, { useState } from 'react'

const BrandingStep = () => {
  const [branding, setBranding] = useState('')

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 5: Branding</h2>
          <p className="text-dark-600">Would you like custom branding on your product?</p>
        </div>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          rows="4"
          placeholder="Describe your branding requirements (logo, colors, labels, etc.)..."
          value={branding}
          onChange={(e) => setBranding(e.target.value)}
        />
      </div>
    </section>
  );
};

export default BrandingStep;