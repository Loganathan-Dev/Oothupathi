import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FAQItem = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'What is Oothupathi?',
      answer: 'Oothupathi provides manufacturing and herbal product solutions with a focus on quality and customer requirements. We combine traditional expertise with modern manufacturing processes.'
    },
    {
      id: 2,
      question: 'What products does Oothupathi manufacture?',
      answer: 'Oothupathi manufactures a range of herbal and customized products based on customer requirements. Our product portfolio includes industrial components, custom tooling, machinery parts, and packaging solutions.'
    },
    {
      id: 3,
      question: 'Can I request a customized product?',
      answer: 'Yes. You can submit a customization request through the Customize or Request Quote section. Our team will review your requirements and get back to you with a solution.'
    },
    {
      id: 4,
      question: 'How can I contact Oothupathi?',
      answer: 'You can contact Oothupathi through the Contact page or submit an enquiry through your customer account. You can also reach us via phone at +1 (234) 567-890 or email at info@oothupathi.com.'
    },
    {
      id: 5,
      question: 'Can I request a product quotation?',
      answer: 'Yes. You can submit your requirements through the Request Quote page. Our team will prepare a detailed quote based on your specifications.'
    },
    {
      id: 6,
      question: 'Do I need an account to submit a request?',
      answer: 'An account may be required for protected customer services such as enquiries, custom requests and orders. However, you can browse our products and contact us without an account.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={faq.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
            >
              <span className="font-semibold text-dark-800 text-base md:text-lg">
                {faq.question}
              </span>
              <span className="ml-4 flex-shrink-0">
                {openIndex === index ? (
                  <FaMinus className="text-primary-600 w-4 h-4" />
                ) : (
                  <FaPlus className="text-primary-600 w-4 h-4" />
                )}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5 text-dark-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQItem