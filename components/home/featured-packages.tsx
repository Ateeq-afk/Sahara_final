"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

const packages = [
  {
    title: "Essential",
    subtitle: "Thoughtful Design",
    price: "₹1,699",
    originalPrice: "₹1,850",
    unit: "per sq.ft",
    description: "Quality construction meeting international standards",
    features: [
      "Premium RCC Structure",
      "Designer Bathroom Fittings",
      "Modern Electrical Systems",
      "Quality Floor tiles upto 65/sqft",
      "Standard Branded Steel & Cement",
      "Contemporary Kitchen",
      "3-Year Warranty"
    ],
    accent: "bg-gray-900",
    popular: false,
    type: "construction"
  },
  {
    title: "Premium",
    subtitle: "Elevated Living",
    price: "₹1,999",
    originalPrice: "₹2,299",
    unit: "per sq.ft",
    description: "Superior craftsmanship with curated design elements",
    features: [
      "Reinforced RCC Structure",
      "Luxury Bathroom Suites",
      "Smart Electrical Systems",
      "Premium Floor tiles upto 110/sqft",
      "Premium Steel & Cement",
      "Modular Kitchen Design",
      "Interior Consultation",
      "5-Year Warranty"
    ],
    accent: "bg-gradient-to-br from-amber-600 to-amber-800",
    popular: true,
    type: "construction"
  },
  {
    title: "Luxury",
    subtitle: "Bespoke Excellence",
    price: "₹2,399",
    originalPrice: "₹2,599",
    unit: "per sq.ft",
    description: "Exclusive materials and personalized design solutions",
    features: [
      "Advanced Structural Design",
      "Ultra-Luxury Fixtures",
      "Home Automation Ready",
      "Luxury Floor Tiles upto 170/sqft",
      "Luxury Steel & Cement",
      "Custom Kitchen Solutions",
      "Full Interior Design",
      "10-Year Warranty"
    ],
    accent: "bg-gradient-to-br from-gray-700 to-gray-900",
    popular: false,
    type: "construction"
  }
]

export const interiorPackages = [
  {
    title: "Standard",
    subtitle: "2 BHK Interior",
    price: "₹2.24",
    originalPrice: "₹2.50",
    unit: "Lakhs",
    description: "Complete interior solution for your 2 BHK home",
    features: [
      "Basic False Ceiling Design",
      "Standard Kitchen Cabinets",
      "Essential Wardrobes",
      "Basic Electrical Work",
      "Standard Paint & Finishes",
      "Living Room TV Unit",
      "1-Year Warranty"
    ],
    accent: "bg-gray-900",
    popular: false,
    type: "interior",
    startingFrom: true
  },
  {
    title: "Premium",
    subtitle: "2 BHK Interior",
    price: "₹5.49",
    originalPrice: "₹5.99",
    unit: "Lakhs",
    description: "Premium interiors with designer elements",
    features: [
      "Designer False Ceiling",
      "Modular Kitchen with Chimney",
      "Premium Wardrobes",
      "Decorative Lighting",
      "Premium Paint & Wallpapers",
      "Entertainment Unit & Crockery",
      "Study Table & Shoe Rack",
      "3-Year Warranty"
    ],
    accent: "bg-gradient-to-br from-amber-600 to-amber-800",
    popular: true,
    type: "interior",
    startingFrom: true
  },
  {
    title: "Luxury",
    subtitle: "2 BHK Interior",
    price: "₹10.95",
    originalPrice: "₹11.99",
    unit: "Lakhs",
    description: "Ultra-luxury interiors with imported materials",
    features: [
      "Luxury False Ceiling with Cove Lighting",
      "Imported Modular Kitchen",
      "Walk-in Wardrobes",
      "Smart Home Automation",
      "Imported Tiles & Marble",
      "Custom Furniture Design",
      "Premium Bathroom Fittings",
      "5-Year Warranty"
    ],
    accent: "bg-gradient-to-br from-gray-700 to-gray-900",
    popular: false,
    type: "interior",
    startingFrom: true
  }
]

export default function FeaturedPackages() {
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
            Packages
          </span>
          <h2 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 tracking-[-0.03em]">
            Transparent Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your path to exceptional living. Each package is crafted to deliver 
            uncompromising quality at every level.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`relative bg-white rounded-2xl p-8 h-full transition-all duration-500 ${
                pkg.popular 
                  ? 'shadow-2xl scale-105' 
                  : 'shadow-lg hover:shadow-2xl'
              }`}>
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Recommended
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 font-medium mb-2">{pkg.subtitle}</p>
                  <h3 className="text-3xl font-semibold mb-4">{pkg.title}</h3>
                  <div className="flex items-baseline gap-3">
                    {pkg.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">{pkg.originalPrice}</span>
                    )}
                    <span className="text-4xl font-semibold">{pkg.price}</span>
                    <span className="text-gray-500">{pkg.unit}</span>
                  </div>
                  <p className="text-gray-600 mt-4">{pkg.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full ${pkg.accent} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/quote"
                  className={`block text-center py-4 px-8 rounded-full font-medium transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            All packages include project management, quality assurance, and post-completion support.
          </p>
          <Link
            href="/packages"
            className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            View detailed specifications →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}