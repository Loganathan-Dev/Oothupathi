import React from 'react'

const Manufacturing = () => {
  const processSteps = [
    {
      id: 1,
      title: 'Raw Material Selection',
      description:
        'We carefully select quality raw materials from reliable sources to maintain consistent product quality.',
    },
    {
      id: 2,
      title: 'Processing',
      description:
        'Selected materials are processed using controlled and standardized manufacturing procedures.',
    },
    {
      id: 3,
      title: 'Quality Control',
      description:
        'Products undergo quality checks throughout the manufacturing process to maintain required standards.',
    },
    {
      id: 4,
      title: 'Packaging',
      description:
        'Finished products are safely packed and prepared for storage and delivery.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manufacturing
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl">
            Quality-focused manufacturing solutions designed to
            deliver reliable herbal and customized products.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Our Manufacturing Process
            </h2>

            <p className="text-gray-600 leading-7">
              Oothupathi follows a systematic manufacturing approach
              with attention to raw materials, production processes,
              quality control and final packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.id}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-6">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality
              </h3>

              <p className="text-gray-600">
                Consistent quality checks throughout the manufacturing
                process.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reliability
              </h3>

              <p className="text-gray-600">
                Reliable processes designed to meet customer
                requirements.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customization
              </h3>

              <p className="text-gray-600">
                Flexible solutions for customized product
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Manufacturing