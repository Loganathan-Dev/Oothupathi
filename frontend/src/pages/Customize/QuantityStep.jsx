import React, { useState } from 'react'

const QuantityStep = () => {
  const [quantity, setQuantity] = useState('')

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 3: Quantity</h2>
          <p className="text-dark-600">How many units do you need?</p>
        </div>
        <input
          type="number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
    </section>
  );
};

export default QuantityStep;