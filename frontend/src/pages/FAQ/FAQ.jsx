import React from 'react'
import FAQHero from './FAQHero'
import FAQCategories from './FAQCategories'
import FAQItem from './FAQItem'

const FAQ = () => {
  return (
    <div>
      <FAQHero />
      <div className="container-custom">
        <FAQCategories />
        <FAQItem />
      </div>
    </div>
  )
}

export default FAQ