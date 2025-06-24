"use client"

import Link from 'next/link'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const packages = [
  {
    title: "Essential",
    price: "₹1,599",
    unit: "per sq.ft",
    description: "Quality construction with standard materials and finishes",
    features: [
      "RCC Structure",
      "Standard Bathroom Fittings",
      "Basic Electrical Layout",
      "Standard Flooring",
      "Basic Kitchen Setup",
    ],
    popular: false
  },
  {
    title: "Premium",
    price: "₹2,299",
    unit: "per sq.ft",
    description: "Superior construction with premium materials and modern interiors",
    features: [
      "Enhanced RCC Structure",
      "Premium Bathroom Fittings",
      "Comprehensive Electrical Layout",
      "Premium Flooring Options",
      "Modern Kitchen Setup",
      "Basic Interior Design",
      "Quality Paint & Finishes"
    ],
    popular: true
  },
  {
    title: "Luxury",
    price: "₹3,499",
    unit: "per sq.ft",
    description: "Exclusive construction with high-end materials and bespoke interiors",
    features: [
      "Superior RCC Structure",
      "Luxury Bathroom Fittings",
      "Advanced Electrical Layout",
      "Imported Flooring Options",
      "Customized Kitchen Setup",
      "Premium Interior Design",
      "Premium Paint & Finishes",
      "Smart Home Integration"
    ],
    popular: false
  }
]

const FeaturedPackages = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Check className="h-4 w-4" />
            Our Packages
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Transparent Pricing for Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully curated packages designed to fit every budget and requirement. 
            All packages include premium materials and expert craftsmanship.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                pkg.popular 
                  ? 'ring-4 ring-primary shadow-2xl' 
                  : 'ring-1 ring-gray-100 shadow-lg hover:shadow-xl'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-6 right-6">
                  <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="font-serif text-2xl text-gray-900 mb-2">{pkg.title}</h3>
                <div className="mb-4">
                  <span className="font-serif text-4xl text-gray-900">{pkg.price}</span>
                  <span className="text-gray-600 ml-1">{pkg.unit}</span>
                </div>
                <p className="text-gray-600 mb-8 min-h-[48px]">{pkg.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full rounded-xl shadow-md ${
                    pkg.popular 
                      ? 'bg-primary hover:bg-primary-dark text-white' 
                      : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  size="lg"
                  asChild
                >
                  <Link href="/quote">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/packages" 
            className="text-primary hover:text-primary-dark font-medium underline underline-offset-4"
          >
            View detailed package information
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPackages