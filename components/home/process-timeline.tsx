"use client"

import { PencilRuler, ClipboardList, Hammer, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: PencilRuler,
    title: "Design Consultation",
    desc: "We collaborate closely to understand your vision, requirements, and aspirations for your space.",
  },
  {
    icon: ClipboardList,
    title: "Detailed Planning",
    desc: "Expert planning of every aspect - from architectural drawings to material selection and timelines.",
  },
  {
    icon: Hammer,
    title: "Precise Execution",
    desc: "Skilled craftsmanship and rigorous quality control ensure flawless implementation.",
  },
  {
    icon: ThumbsUp,
    title: "Seamless Handover",
    desc: "Thorough inspection, documentation, and continued support for your peace of mind.",
  },
]

const ProcessTimeline = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F6F2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#232323] mb-4">
            Our Construction Journey
          </h2>
          <p className="text-base sm:text-lg font-sans text-gray-600 max-w-2xl mx-auto">
            A refined process that transforms your vision into reality, with attention to every detail
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-8 sm:gap-y-12 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <Icon size={28} className="sm:w-8 sm:h-8 text-[#B29263]" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#232323] mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#B29263] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium shadow-md">
                    {index + 1}
                  </span>
                </div>
                
                {/* Connector Line (except for last item on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-[2px] bg-gradient-to-r from-[#B29263] to-transparent -translate-y-1/2" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline