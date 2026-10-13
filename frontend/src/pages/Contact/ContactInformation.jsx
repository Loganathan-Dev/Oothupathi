import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const ContactInformation = () => {
  const info = [
    { icon: FaPhone, title: 'Phone', detail: '+1 (234) 567-890', link: 'tel:+1234567890' },
    { icon: FaEnvelope, title: 'Email', detail: 'info@oothupathi.com', link: 'mailto:info@oothupathi.com' },
    { icon: FaMapMarkerAlt, title: 'Address', detail: '123 Manufacturing Hub, Chennai, India', link: null },
    { icon: FaClock, title: 'Working Hours', detail: 'Mon - Sat, 9:00 AM - 6:00 PM', link: null },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <item.icon className="text-primary-600 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-dark-800">{item.title}</h3>
              {item.link ? (
                <a href={item.link} className="text-dark-600 text-sm hover:text-primary-600 transition-colors">
                  {item.detail}
                </a>
              ) : (
                <p className="text-dark-600 text-sm">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;