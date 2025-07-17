'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, X, Home, Building, Palette, Clock, Shield, Phone, Download, Check } from 'lucide-react'

export default function RenovationsPage() {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('residential')
  const router = useRouter()
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup && !localStorage.getItem('renovationExitPopupShown')) {
        setShowExitPopup(true)
        localStorage.setItem('renovationExitPopupShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitPopup])

  const renovationTypes = {
    residential: {
      title: "Home Renovations",
      projects: [
        { id: 1, title: "Modern Kitchen Transformation", image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", category: "Kitchen" },
        { id: 2, title: "Luxury Bathroom Remodel", image: "https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg", category: "Bathroom" },
        { id: 3, title: "Complete Home Makeover", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", category: "Full Home" },
        { id: 4, title: "Living Room Redesign", image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg", category: "Living Space" }
      ]
    },
    commercial: {
      title: "Commercial Renovations",
      projects: [
        { id: 5, title: "Modern Office Renovation", image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg", category: "Office" },
        { id: 6, title: "Retail Space Transformation", image: "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg", category: "Retail" },
        { id: 7, title: "Restaurant Redesign", image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg", category: "Hospitality" },
        { id: 8, title: "Healthcare Facility Update", image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg", category: "Healthcare" }
      ]
    }
  }

  const process = [
    { number: 1, title: "Consultation", description: "Free assessment of your space and renovation needs" },
    { number: 2, title: "Design Planning", description: "Detailed 3D designs and material selection" },
    { number: 3, title: "Execution", description: "Professional renovation with minimal disruption" },
    { number: 4, title: "Final Touches", description: "Quality inspection and project handover" }
  ]

  const benefits = [
    "20+ years of renovation expertise",
    "Transparent pricing with no hidden costs",
    "Minimal disruption to your daily life",
    "Premium materials and finishes",
    "Dedicated project manager",
    "Post-renovation warranty"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
            alt="Luxury renovation project"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center text-white max-w-5xl mx-auto px-6"
          style={{ opacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sm sm:text-base mb-4 opacity-80 font-light tracking-wide"
          >
            Since 2003 – Over Two Decades of Design & Delivery
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.1] mb-6"
          >
            Building Dreams,<br />
            <span className="font-light">Creating Legacies.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl mb-10 opacity-90 max-w-3xl mx-auto font-light"
          >
            Partner with Bangalore's trusted experts in construction and interior design. 
            From concept to completion, we create timeless spaces that inspire and endure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/quote')}
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              Get Started with a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
            >
              View Before & After
            </motion.button>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm opacity-70 mt-4 font-light"
          >
            No upfront commitment. Let's build your vision.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Renovation Services</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Whether it's a single room or an entire property, we bring expertise and innovation to every renovation project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Kitchen Renovations",
                description: "Modern kitchens designed for both beauty and functionality",
                features: ["Modular Cabinets", "Premium Countertops", "Smart Appliances"]
              },
              {
                icon: Building,
                title: "Bathroom Remodeling",
                description: "Transform your bathroom into a luxurious personal spa",
                features: ["Waterproofing", "Designer Fixtures", "Custom Vanities"]
              },
              {
                icon: Palette,
                title: "Living Space Updates",
                description: "Refresh your living areas with contemporary designs",
                features: ["Open Layouts", "Custom Storage", "Premium Finishes"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-[#0A5C36]/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#0A5C36]" />
                </div>
                <h3 className="text-2xl font-light mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-[#0A5C36] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Our Renovation Process</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A streamlined approach that ensures your renovation is completed on time and within budget.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <span className="text-white text-2xl font-medium">{step.number}</span>
                </motion.div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Tabs */}
      <section id="portfolio" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Before & After</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              See the dramatic transformations we've achieved for our clients.
            </p>
            
            {/* Tab Navigation */}
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {Object.keys(renovationTypes).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#0A5C36] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {renovationTypes[activeTab as keyof typeof renovationTypes].projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(project.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <p className="text-sm mb-1 opacity-80">{project.category}</p>
                        <h3 className="text-xl font-light">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-light mb-8">
                Why Choose Sahara<br />
                <span className="text-[#0A5C36]">for Renovations?</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-[#0A5C36]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#0A5C36]" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/quote')}
                className="mt-8 bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2"
              >
                Start Your Renovation
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg"
                    alt="Kitchen renovation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg"
                    alt="Bathroom renovation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg"
                    alt="Living room renovation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
                    alt="Bedroom renovation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#0A5C36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "50+", label: "In-House Experts" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "5 Year", label: "Warranty Period" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-light mb-2">{stat.value}</div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Get a free consultation and detailed quote for your renovation project. 
              Download our renovation guide to explore possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/quote')}
                className="bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2"
              >
                Get Free Quote
                <Phone className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('Renovation guide download coming soon!')}
                className="border-2 border-[#0A5C36] text-[#0A5C36] px-8 py-4 rounded-full font-medium hover:bg-[#0A5C36] hover:text-white transition-all inline-flex items-center gap-2"
              >
                Download Renovation Guide
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating CTA Button */}
      <motion.button
        onClick={() => router.push('/quote')}
        className="fixed bottom-24 right-6 bg-[#D26700] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#B85600] transition-colors z-40 font-medium flex items-center gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Quote
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-light mb-4">Planning a Renovation?</h3>
              <p className="text-gray-600 mb-6">
                Get 15% off on your renovation project when you book a consultation today.
              </p>
              
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0A5C36] text-white py-3 rounded-full font-medium hover:bg-[#084a2e] transition-colors"
                >
                  Claim Your Discount
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Limited time offer. Terms apply.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full h-[80vh]"
            >
              <Image
                src={
                  [...renovationTypes.residential.projects, ...renovationTypes.commercial.projects]
                    .find(p => p.id === selectedImage)?.image || ''
                }
                alt="Renovation project"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}