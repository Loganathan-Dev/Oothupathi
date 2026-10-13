import React, { useState } from 'react'

const PackagingStep = () => {
  const [packaging, setPackaging] = useState('')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 4: Packaging Preferences</h2>
          <p className="text-dark-600">How would you like your product packaged?</p>
        </div>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={packaging}
          onChange={(e) => setPackaging(e.target.value)}
        >
          <option value="">Select packaging type</option>
          <option value="standard">Standard Packaging</option>
          <option value="custom">Custom Packaging</option>
          <option value="bulk">Bulk Packaging</option>
          <option value="eco">Eco-friendly Packaging</option>
        </select>
      </div>
    </section>
  );
};

export default PackagingStep;