"use client"

import { Building, Paintbrush, Clock, Award, Shield, CheckCircle } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: Building,
    title: "Expert Construction",
    description: "Premium materials and skilled craftsmanship for structures built to last generations",
    highlight: "500+ Projects"
  },
  {
    icon: Paintbrush,
    title: "Award-Winning Design",
    description: "Innovative interior solutions that perfectly balance aesthetics with functionality",
    highlight: "50+ Awards"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Proven track record of completing 100% of projects within agreed timelines",
    highlight: "100% Success"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control with comprehensive warranties and ongoing support",
    highlight: "10 Year Warranty"
  },
  {
    icon: Award,
    title: "20+ Years Legacy",
    description: "Two decades of excellence serving Bangalore's construction and design needs",
    highlight: "Since 2003"
  }
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const Icon = feature.icon
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 hover:shadow-lg h-full">
        <div className="flex flex-col h-full">
          {/* Icon and Highlight */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {feature.highlight}
            </span>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const FeatureSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 bg-[#f5f5f7]">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-4 sm:mb-6"
          >
            Why we're different.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            We combine decades of expertise with innovative approaches to deliver 
            construction and interior design solutions that stand the test of time.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Trust Indicators - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 lg:mt-32"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "500+",
                label: "Projects Completed",
                description: "From luxury villas to commercial spaces"
              },
              {
                number: "100%",
                label: "On-Time Delivery",
                description: "Commitment to deadlines without compromise"
              },
              {
                number: "4.8★",
                label: "Client Rating",
                description: "Based on 200+ verified reviews"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 p-8 sm:p-12 lg:p-16 bg-gray-900 rounded-2xl sm:rounded-3xl text-center"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
              Ready to transform your space?
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have trusted us with their dream projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium border border-white/30 hover:bg-white/10 transition-colors duration-200"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection