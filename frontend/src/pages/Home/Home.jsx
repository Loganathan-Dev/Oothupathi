import React from 'react'
import Hero from './Hero'
import AboutSection from './AboutSection'
import ProductSection from './ProductSection'
import ManufacturingSection from './ManufacturingSection'
import ProcessSection from './ProcessSection'
import WhyChooseUs from './WhyChooseUs'
import CustomProductSection from './CustomProductSection'
import CareersSection from './CareersSection'
import ContactSection from './ContactSection'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <AboutSection />
      <ProductSection />
      <ManufacturingSection />
      <ProcessSection />
      <WhyChooseUs />
      <CustomProductSection />
      <CareersSection />
      <ContactSection />
    </div>
  )
}

export default Home