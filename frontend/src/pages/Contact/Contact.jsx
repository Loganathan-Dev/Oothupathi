import React from 'react'
import ContactHero from './ContactHero'
import ContactInformation from './ContactInformation'
import ContactForm from './ContactForm'
import LocationMap from './LocationMap'

const Contact = () => {
  return (
    <div>
      <ContactHero />
      <ContactInformation />
      <ContactForm />
      <LocationMap />
    </div>
  );
};

export default Contact;