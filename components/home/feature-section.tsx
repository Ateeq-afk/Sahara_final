"use client"

import { Building, Paintbrush, Clock, Award, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Building,
    title: "Expert Construction",
    description: "Premium materials and skilled craftsmanship for structures built to last generations"
  },
  {
    icon: Paintbrush,
    title: "Award-Winning Design",
    description: "Innovative interior solutions that perfectly balance aesthetics with functionality"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Proven track record of completing 100% of projects within agreed timelines"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control with comprehensive warranties and ongoing support"
  },
  {
    icon: Award,
    title: "20+ Years Legacy",
    description: "Two decades of excellence serving Bangalore's construction and design needs"
  }
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const Icon = feature.icon
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

const FeatureSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Excellence in Every Detail
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine decades of expertise with innovative approaches to deliver construction and interior design solutions 
            that exceed expectations and stand the test of time.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 sm:p-12 text-white text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-serif mb-6">
            Trusted by 500+ Satisfied Clients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">500+</div>
              <div className="text-white/90">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">100%</div>
              <div className="text-white/90">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/90">Client Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection