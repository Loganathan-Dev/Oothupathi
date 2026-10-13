import React, { useState } from 'react'

const RequirementsStep = () => {
  const [requirements, setRequirements] = useState('')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 2: Describe Your Requirements</h2>
          <p className="text-dark-600">Provide detailed specifications for your product</p>
        </div>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          rows="6"
          placeholder="Describe your product requirements, specifications, and any special features..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </div>
    </section>
  );
};

export default RequirementsStep;