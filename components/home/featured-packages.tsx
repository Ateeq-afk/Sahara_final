"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [currentPackage, setCurrentPackage] = useState(1) // Start with Premium (index 1)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  const nextPackage = () => {
    setCurrentPackage((prev) => (prev + 1) % packages.length)
    setShowAllFeatures(false)
  }

  const prevPackage = () => {
    setCurrentPackage((prev) => (prev - 1 + packages.length) % packages.length)
    setShowAllFeatures(false)
  }

  return (
    <section ref={ref} className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Packages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 sm:mt-4 mb-3 sm:mb-6 tracking-[-0.03em]">
            Transparent Excellence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your path to exceptional living. Each package is crafted to deliver 
            uncompromising quality at every level.
          </p>
        </motion.div>

        {/* Mobile Package Carousel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Package Tabs */}
            <div className="flex justify-center mb-6 gap-2">
              {packages.map((pkg, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPackage(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPackage === index
                      ? pkg.popular 
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {pkg.title}
                </button>
              ))}
            </div>

            {/* Package Card */}
            <motion.div
              key={currentPackage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl mx-auto max-w-sm"
            >
              <div className="p-6">
                {/* Popular Badge */}
                {packages[currentPackage].popular && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Recommended
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 font-medium mb-1">{packages[currentPackage].subtitle}</p>
                  <h3 className="text-2xl font-semibold mb-3">{packages[currentPackage].title}</h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-2">
                    {packages[currentPackage].originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{packages[currentPackage].originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold">{packages[currentPackage].price}</span>
                    <span className="text-gray-500 text-sm">{packages[currentPackage].unit}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-3">{packages[currentPackage].description}</p>
                </div>

                {/* Features - Show first 4, then expand */}
                <ul className="space-y-3 mb-6">
                  {packages[currentPackage].features.slice(0, showAllFeatures ? undefined : 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full ${packages[currentPackage].accent} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Show More/Less Button */}
                {packages[currentPackage].features.length > 4 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                  >
                    {showAllFeatures ? 'Show less' : `+${packages[currentPackage].features.length - 4} more features`}
                  </button>
                )}

                {/* CTA Button */}
                <Link
                  href="/quote"
                  className={`block text-center py-3 px-6 rounded-full font-medium transition-all duration-300 ${
                    packages[currentPackage].popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevPackage}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Previous package"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextPackage}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Next package"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Packages Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            All packages include project management, quality assurance, and post-completion support.
          </p>
          <Link
            href="/packages"
            className="text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            View detailed specifications →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}