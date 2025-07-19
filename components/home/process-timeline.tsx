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
    <section ref={ref} className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sahara-primary rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sahara-secondary rounded-full filter blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 mt-8 sm:mt-12 lg:mt-16"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            OUR PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-4 sm:mb-6 tracking-[-0.03em]">
            From Vision to Reality
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            A thoughtfully guided journey from concept to completion.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Enhanced Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sahara-primary/20 via-sahara-primary/50 to-sahara-primary/20 md:-translate-x-1/2" />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 sm:mb-16 lg:mb-20 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} ml-16 md:ml-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50"
                >
                  <span className={`text-sm font-medium text-gray-500 tracking-[0.2em] uppercase ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    Phase {step.phase}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold mt-2 mb-3 sm:mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <p className={`text-sm text-sahara-primary font-medium flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="w-5 h-5 rounded-full bg-sahara-primary/10 flex items-center justify-center text-xs">⏱</span>
                    Duration: {step.duration}
                  </p>
                </motion.div>
              </div>

              {/* Circle */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-gradient-to-br from-sahara-primary to-sahara-secondary text-white rounded-full flex items-center justify-center z-10 shadow-lg"
              >
                <span className="text-sm font-bold">{step.phase}</span>
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
          <p className="text-lg text-gray-600 mb-4">
            Get a free consultation with our experts today.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Ready to begin your journey with us?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Start Your Project →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}