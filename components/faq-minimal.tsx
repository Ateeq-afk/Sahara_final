"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Mail, ArrowRight, Flame } from 'lucide-react'

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our project timelines vary based on scope and complexity. A typical residential construction project takes 12-18 months, while interior design projects usually complete within 3-6 months. We provide detailed timelines during the consultation phase.",
    isMostAsked: true
  },
  {
    question: "Do you offer design consultations?",
    answer: "Yes, we offer comprehensive design consultations. Our team of experienced architects and interior designers will work with you to understand your vision and create a personalized design plan that meets your needs and budget.",
    isMostAsked: true
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Bangalore and surrounding areas. Our main service areas include BTM Layout, JP Nagar, Jayanagar, Koramangala, HSR Layout, and Electronic City, though we do take select projects in other parts of Bangalore.",
    isMostAsked: false
  },
  {
    question: "How do you ensure quality construction?",
    answer: "We maintain strict quality standards through regular inspections, use of premium materials, and employment of skilled craftsmen. Each project has a dedicated project manager who ensures all work meets our high standards.",
    isMostAsked: false
  },
  {
    question: "What is your payment structure?",
    answer: "We offer flexible payment structures tailored to each project. Typically, we work with milestone-based payments that align with project progress. Detailed payment schedules are provided in our contracts.",
    isMostAsked: false
  }
]

export default function FAQMinimal() {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Questions? Answered.
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about working with us.
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
              <motion.div
                key={index}
                layout
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  index > 0 ? 'mt-3' : ''
                } ${openIndex === index ? 'shadow-sm' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 pr-4">
                    {/* Question with Most Asked badge */}
                    <div className="flex items-start flex-col gap-1 flex-1">
                      <span className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {faq.question}
                      </span>
                      {faq.isMostAsked && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 text-xs font-medium rounded-full">
                          <Flame className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced Plus/Minus icons */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 ml-2"
                  >
                    <Plus className={`w-5 h-5 transition-all duration-300 ${
                      openIndex === index ? 'text-gray-400' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.3 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-14">
                          <p className="text-base text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced Help CTA */}
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
            <motion.a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              Contact our team
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}