"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Sparkles, ArrowRight, Star, Zap, Gem } from 'lucide-react'

const packages = [
  {
    id: "essential",
    title: "Essential",
    tagline: "Foundational quality for modern living",
    price: "1,699",
    originalPrice: "1,850",
    unit: "per sq.ft",
    description: "Where quality meets value. Every detail considered, every corner perfected.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
    features: [
      "Premium RCC Structure",
      "Designer Bathroom Fittings", 
      "Modern Electrical Systems",
      "Vitrified Tile Flooring",
      "Contemporary Kitchen Setup",
      "Professional Project Management"
    ],
    gradient: "from-stone-900 to-stone-700",
    iconBg: "bg-stone-100",
    iconColor: "text-stone-700",
    warranty: "3 Years",
    timeline: "8-10 Months"
  },
  {
    id: "premium",
    title: "Premium",
    tagline: "Exceptionally Designed", 
    price: "1,999",
    originalPrice: "2,299",
    unit: "per sq.ft",
    description: "Elevated living redefined. Where luxury becomes your everyday experience.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90",
    features: [
      "Reinforced RCC Structure",
      "Luxury Bathroom Suites",
      "Smart Home Ready",
      "Premium Wood/Marble Flooring", 
      "Modular Kitchen with Appliances",
      "Interior Design Consultation",
      "Landscape Architecture"
    ],
    gradient: "from-amber-900 to-amber-700",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    warranty: "5 Years",
    timeline: "10-12 Months",
    popular: true
  },
  {
    id: "luxury",
    title: "Luxury",
    tagline: "Uncompromising design for extraordinary spaces",
    price: "2,399",
    originalPrice: "2,599",
    unit: "per sq.ft",
    description: "The pinnacle of personalized luxury. Your vision, our masterpiece.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=90",
    features: [
      "Advanced Structural Design",
      "Ultra-Luxury Fixtures",
      "Complete Home Automation",
      "Imported Italian Marble",
      "German Modular Kitchen",
      "Full Interior Design Service",
      "Private Pool & Landscaping",
      "Dedicated Concierge Service"
    ],
    gradient: "from-black to-gray-800",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-800",
    warranty: "10 Years",
    timeline: "12-16 Months"
  }
]

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function PackagesPage() {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string>("premium")
  
  const heroRef = useRef(null)
  const packagesRef = useRef(null)
  const detailsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const packagesInView = useInView(packagesRef, { once: true, margin: "-200px" })
  const detailsInView = useInView(detailsRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const selectedPkg = packages.find(pkg => pkg.id === selectedPackage) || packages[1]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
            animate={floatingAnimation.animate}
            initial={floatingAnimation.initial}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"
            animate={floatingAnimation.animate}
            initial={floatingAnimation.initial}
            transition={{ delay: 2 }}
          />
        </div>
        
        <motion.div 
          className="relative container mx-auto px-8 text-center z-10"
          style={{ y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.05em] leading-[0.9]">
              Choose your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">
                perfect
              </span>
              <br />
              package.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
          >
            Three paths to exceptional living. Each thoughtfully designed. 
            All uncompromisingly crafted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              href="#packages"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-amber-600 transition-colors"
            >
              <span className="text-sm font-medium">Explore Packages</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Packages Section */}
      <section id="packages" ref={packagesRef} className="py-32 relative">
        <div className="container mx-auto px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-[-0.03em]">
              Pricing that makes sense.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing. No hidden costs. Just honest value at every level.
            </p>
          </motion.div>

          {/* Package Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative cursor-pointer ${
                  selectedPackage === pkg.id ? 'lg:-mt-4' : ''
                }`}
              >
                <motion.div
                  className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-500 min-h-[700px] flex flex-col ${
                    selectedPackage === pkg.id 
                      ? 'shadow-2xl ring-2 ring-amber-600/50' 
                      : 'shadow-xl hover:shadow-2xl'
                  }`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-6 right-6 z-10">
                      <div className="bg-amber-600 text-white px-4 py-2 md:px-4 md:py-2 text-xs md:text-sm px-2 py-1 rounded-full font-medium flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="hidden sm:inline">Most Popular</span>
                        <span className="sm:hidden">Recommended</span>
                      </div>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="p-8 pb-0 flex-1">
                    <div className={`w-16 h-16 ${pkg.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                      {pkg.id === 'essential' && <Zap className={`h-8 w-8 ${pkg.iconColor}`} />}
                      {pkg.id === 'premium' && <Star className={`h-8 w-8 ${pkg.iconColor}`} />}
                      {pkg.id === 'luxury' && <Gem className={`h-8 w-8 ${pkg.iconColor}`} />}
                    </div>
                    
                    <h3 className="text-3xl font-semibold mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 mb-6">{pkg.tagline}</p>
                    
                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-3">
                        {pkg.originalPrice && (
                          <span className="text-2xl md:text-3xl text-gray-400 line-through">₹{pkg.originalPrice}</span>
                        )}
                        <span className="text-4xl md:text-5xl font-semibold">₹{pkg.price}</span>
                        <span className="text-gray-500 text-base md:text-lg">/{pkg.unit}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-8 pb-8">
                    <ul className="space-y-4 mb-8">
                      {pkg.features.slice(0, 6).map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={hoveredPackage === pkg.id ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Check className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8 pt-8 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Warranty</p>
                        <p className="font-semibold">{pkg.warranty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Timeline</p>
                        <p className="font-semibold">{pkg.timeline}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/quote"
                      className={`block text-center py-4 rounded-full font-medium transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Choose {pkg.title}
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Package Details */}
      <section ref={detailsRef} className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={detailsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <motion.div
                key={selectedPkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              >
                <Image
                  src={selectedPkg.image}
                  alt={selectedPkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedPkg.gradient} opacity-30`} />
              </motion.div>

              {/* Content */}
              <div>
                <motion.div
                  key={selectedPkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`inline-flex items-center gap-2 ${selectedPkg.iconBg} ${selectedPkg.iconColor} rounded-full px-4 py-2 text-sm font-medium mb-6`}>
                    <Sparkles className="h-4 w-4" />
                    {selectedPkg.title} Package
                  </div>
                  
                  <h3 className="text-5xl font-semibold mb-6 tracking-[-0.03em]">
                    Everything included in {selectedPkg.title}.
                  </h3>
                  
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {selectedPkg.description} Built with premium materials and finished to perfection.
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold mb-4">All Features</h4>
                      <ul className="space-y-3">
                        {selectedPkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-white rounded-2xl">
                        <p className="text-sm text-gray-500 mb-2">Starting at</p>
                        <p className="text-3xl font-semibold">₹{selectedPkg.price}<span className="text-lg text-gray-500">/{selectedPkg.unit}</span></p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl">
                        <p className="text-sm text-gray-500 mb-2">Warranty</p>
                        <p className="text-2xl font-semibold">{selectedPkg.warranty}</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl">
                        <p className="text-sm text-gray-500 mb-2">Timeline</p>
                        <p className="text-2xl font-semibold">{selectedPkg.timeline}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-medium hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
                  >
                    Get Your Quote
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-6xl md:text-7xl font-semibold mb-8 tracking-[-0.03em]">
              Ready to start
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                building?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Get a personalized quote in minutes. No obligations. Just possibilities.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quote"
                className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-900 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}