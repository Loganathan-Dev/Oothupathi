import React from 'react'

const LocationMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-dark-900 mb-8">Our Location</h2>
        <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📍</div>
            <p className="text-dark-500">Google Maps Location</p>
            <p className="text-sm text-dark-400 mt-2">123 Manufacturing Hub, Chennai, India</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;