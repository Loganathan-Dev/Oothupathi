import React from 'react'

const ReviewStep = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your customization request has been submitted.')
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-900">Step 7: Review & Submit</h2>
          <p className="text-dark-600">Review your customization request before submitting</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <h3 className="font-semibold text-dark-900 mb-4">Request Summary</h3>
          <div className="space-y-2 text-dark-600">
            <p><strong>Product Type:</strong> Industrial Components</p>
            <p><strong>Requirements:</strong> Custom specifications entered</p>
            <p><strong>Quantity:</strong> 100 units</p>
            <p><strong>Packaging:</strong> Standard Packaging</p>
            <p><strong>Branding:</strong> Custom logo and labels</p>
            <p><strong>Files:</strong> 3 files uploaded</p>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn-primary w-full">
          Submit Customization Request
        </button>
      </div>
    </section>
  );
};

export default ReviewStep;