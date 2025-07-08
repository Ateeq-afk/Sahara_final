"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our project timelines vary based on scope and complexity. A typical residential construction project takes 12-18 months, while interior design projects usually complete within 3-6 months. We provide detailed timelines during the consultation phase."
  },
  {
    question: "Do you offer design consultations?",
    answer: "Yes, we offer comprehensive design consultations. Our team of experienced architects and interior designers will work with you to understand your vision and create a personalized design plan that meets your needs and budget."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Bangalore and surrounding areas. Our main service areas include BTM Layout, JP Nagar, Jayanagar, Koramangala, HSR Layout, and Electronic City, though we do take select projects in other parts of Bangalore."
  },
  {
    question: "How do you ensure quality construction?",
    answer: "We maintain strict quality standards through regular inspections, use of premium materials, and employment of skilled craftsmen. Each project has a dedicated project manager who ensures all work meets our high standards."
  },
  {
    question: "What is your payment structure?",
    answer: "We offer flexible payment structures tailored to each project. Typically, we work with milestone-based payments that align with project progress. Detailed payment schedules are provided in our contracts."
  }
]

export default function FAQMinimal() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <section className="apple-section">
      <div className="apple-container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center apple-mb-xl"
          >
            <h2 className="apple-display-text apple-mb-md">
              Frequently asked questions
            </h2>
            <p className="apple-body-large apple-text-muted">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="apple-body font-medium pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 ml-2">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4">
                        <p className="apple-body apple-text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
          
          {/* Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center apple-mt-xl"
          >
            <p className="apple-body apple-text-muted apple-mb-md">
              Still have questions?
            </p>
            <a href="/contact" className="apple-button apple-button-text">
              Contact our team →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}