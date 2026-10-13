import React, { useState } from 'react'

const ProductStep = () => {
  const [productType, setProductType] = useState('')

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 1: Choose Product Type</h2>
          <p className="text-dark-600">Select what you'd like to manufacture</p>
        </div>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">Select a product type</option>
          <option value="components">Industrial Components</option>
          <option value="tooling">Custom Tooling</option>
          <option value="machinery">Machinery Parts</option>
          <option value="packaging">Packaging Solutions</option>
          <option value="other">Other</option>
        </select>
      </div>
    </section>
  );
};

export default ProductStep;