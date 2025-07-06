"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    phase: "01",
    title: "Discovery",
    description: "Understanding your vision, lifestyle, and aspirations through thoughtful consultation.",
    duration: "2-3 weeks",
  },
  {
    phase: "02",
    title: "Conceptualization",
    description: "Translating insights into compelling design concepts that capture your essence.",
    duration: "3-4 weeks",
  },
  {
    phase: "03",
    title: "Development",
    description: "Refining every detail from materials to finishes with meticulous precision.",
    duration: "4-6 weeks",
  },
  {
    phase: "04",
    title: "Realization",
    description: "Bringing designs to life through expert craftsmanship and rigorous quality control.",
    duration: "12-16 weeks",
  },
]

export default function ProcessTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Our Process
          </span>
          <h2 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 tracking-[-0.03em]">
            From Vision to Reality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A carefully orchestrated journey that transforms your dreams into extraordinary living spaces.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 md:-translate-x-1/2" />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-20 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'} ml-16 md:ml-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
                    Phase {step.phase}
                  </span>
                  <h3 className="text-3xl font-semibold mt-2 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <p className="text-sm text-gray-500 font-medium">Duration: {step.duration}</p>
                </motion.div>
              </div>

              {/* Circle */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center z-10"
              >
                <span className="text-sm font-semibold">{step.phase}</span>
              </motion.div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to begin your journey with us?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}