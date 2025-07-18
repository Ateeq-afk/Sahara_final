"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

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

  const [currentStep, setCurrentStep] = useState(0)
  
  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }
  
  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <section ref={ref} className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20 mt-8 md:mt-16"
        >
          <span className="text-xs md:text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-4 md:mb-6 tracking-[-0.03em]">
            From Vision to Reality
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            A thoughtfully guided journey from concept to completion.
          </p>
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="relative bg-white rounded-2xl shadow-lg mx-4 overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4"
                  >
                    <span className="text-3xl font-bold text-gray-900">
                      {steps[currentStep].phase}
                    </span>
                  </motion.div>
                  
                  <span className="text-xs font-medium text-gray-500 tracking-[0.2em] uppercase block mb-2">
                    PHASE {steps[currentStep].phase}
                  </span>
                  
                  <h3 className="text-2xl font-semibold mb-4">
                    {steps[currentStep].title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {steps[currentStep].duration}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? 'w-8 bg-gray-900' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevStep}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextStep}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          {/* CTA Button */}
          <div className="mt-6 px-4">
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Chat with Neha - Project Manager!
            </button>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-300 md:-translate-x-1/2" />

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
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} ml-16 md:ml-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <span className={`text-sm font-medium text-gray-500 tracking-[0.2em] uppercase ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    Phase {step.phase}
                  </span>
                  <h3 className="text-3xl font-semibold mt-2 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <p className={`text-sm text-gray-700 font-medium flex items-center gap-1 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span>🕒</span>
                    Duration: {step.duration}
                  </p>
                </motion.div>
              </div>

              {/* Circle */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center z-10 shadow-sm"
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