"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

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

export default function ProcessTimelineMobile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform scroll progress to step index
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const stepIndex = Math.min(Math.floor(latest * steps.length), steps.length - 1)
      setCurrentStep(stepIndex)
    })
    return unsubscribe
  }, [scrollYProgress])

  // Individual transforms for smooth transitions
  const phaseScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [1, 0.8, 0.8, 0.8])
  const phaseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5, 0.9, 1], [1, 0, 0, 1, 0, 0])
  
  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, -20, -20, -20])
  const descriptionY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, -30, -30, -30])

  return (
    <section className="md:hidden relative bg-gradient-to-b from-gray-50 to-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="px-6 py-4">
          <span className="text-xs font-medium text-gray-500 tracking-[0.2em] uppercase">
            OUR PROCESS
          </span>
          <h2 className="text-2xl font-semibold mt-1">
            From Vision to Reality
          </h2>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        {/* Fixed Position Card */}
        <div className="sticky top-32 px-6 pb-32">
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ 
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  transition: 'width 0.3s ease-out'
                }}
              />
            </div>

            {/* Header Section */}
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm mb-8 px-4">
                A thoughtfully guided journey from concept to completion.
              </p>
              
              {/* Animated Phase Number */}
              <div className="relative h-32 flex items-center justify-center mb-6">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl font-bold text-gray-900">
                    {steps[currentStep].phase}
                  </span>
                </motion.div>
              </div>

              {/* Phase Label */}
              <motion.p
                key={`phase-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase mb-4"
              >
                PHASE {steps[currentStep].phase}
              </motion.p>

              {/* Title */}
              <motion.h3
                key={`title-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl font-semibold mb-6"
              >
                {steps[currentStep].title}
              </motion.h3>

              {/* Description */}
              <motion.p
                key={`desc-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-600 leading-relaxed mb-6 px-2"
              >
                {steps[currentStep].description}
              </motion.p>

              {/* Duration */}
              <motion.div
                key={`duration-${currentStep}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="inline-flex items-center gap-2 text-sm text-gray-700 font-medium"
              >
                <Clock className="w-4 h-4" />
                <span>Duration: {steps[currentStep].duration}</span>
              </motion.div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'w-8 bg-gray-900' 
                      : index < currentStep
                      ? 'w-2 bg-gray-400'
                      : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Chat CTA - Fixed at bottom */}
          <motion.div 
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              Chat with Neha - Project Manager!
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-24 right-6 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentStep < steps.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-1">
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-6 border-2 border-gray-300 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-1" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}