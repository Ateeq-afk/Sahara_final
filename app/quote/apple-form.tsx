"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, User, Building, Palette, Calendar,
  Check, Mail, Phone, Home, Briefcase,
  Hammer, Package, MapPin, ChevronDown, ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Apple-inspired minimalist design
const services = [
  { 
    id: 'construction', 
    title: 'Construction',
    subtitle: 'Build from ground up',
    icon: Building
  },
  { 
    id: 'interior', 
    title: 'Interior Design',
    subtitle: 'Transform your space',
    icon: Palette
  },
  { 
    id: 'renovation', 
    title: 'Renovation',
    subtitle: 'Refresh and renew',
    icon: Hammer
  },
  { 
    id: 'turnkey', 
    title: 'Turnkey',
    subtitle: 'Complete solutions',
    icon: Package
  }
]

const propertyTypes = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'office', title: 'Office', icon: Briefcase },
  { id: 'commercial', title: 'Commercial', icon: Building },
]

const styles = [
  { id: 'modern', title: 'Modern', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
  { id: 'minimal', title: 'Minimal', image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80' },
  { id: 'classic', title: 'Classic', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80' },
  { id: 'luxury', title: 'Luxury', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }
]

export default function AppleQuoteForm() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    // Service
    service: '',
    propertyType: '',
    
    // Details
    size: '',
    budget: '',
    location: '',
    
    // Style
    style: '',
    
    // Contact
    name: '',
    email: '',
    phone: '',
    
    // Timeline
    timeline: ''
  })

  const sections = [
    { id: 'service', title: 'Service' },
    { id: 'details', title: 'Details' },
    { id: 'style', title: 'Style' },
    { id: 'contact', title: 'Contact' },
    { id: 'timeline', title: 'Timeline' }
  ]

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (currentSection) {
      case 0: return formData.service && formData.propertyType
      case 1: return formData.size && formData.budget && formData.location
      case 2: return formData.style
      case 3: return formData.name && formData.email && formData.phone
      case 4: return formData.timeline
      default: return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-semibold mb-4">Thank you.</h1>
          <p className="text-xl text-gray-600 mb-8">
            We'll prepare your personalized quote and contact you within 2 hours.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium text-lg"
          >
            Return home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6"
          >
            Let's build<br />something great.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 mb-12"
          >
            Get your personalized quote in minutes.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => {
              formRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-lg font-medium group"
          >
            Get started
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-20 px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center ${index < sections.length - 1 ? 'flex-1' : ''}`}
                >
                  <button
                    onClick={() => index <= currentSection && setCurrentSection(index)}
                    disabled={index > currentSection}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      transition-all duration-300
                      ${index === currentSection 
                        ? 'bg-black text-white' 
                        : index < currentSection
                        ? 'bg-gray-200 text-black hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-400'
                      }
                    `}
                  >
                    {index < currentSection ? <Check className="w-4 h-4" /> : index + 1}
                  </button>
                  {index < sections.length - 1 && (
                    <div 
                      className={`flex-1 h-0.5 mx-3 transition-all duration-500 ${
                        index < currentSection ? 'bg-gray-200' : 'bg-gray-100'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-semibold">{sections[currentSection].title}</h2>
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Service Selection */}
              {currentSection === 0 && (
                <>
                  <div>
                    <label className="block text-lg font-medium mb-6">
                      What would you like to build?
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => {
                        const Icon = service.icon
                        return (
                          <button
                            key={service.id}
                            onClick={() => updateField('service', service.id)}
                            className={`
                              p-6 rounded-2xl border-2 text-left transition-all
                              ${formData.service === service.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <Icon className="w-8 h-8 mb-3" />
                            <h3 className="font-semibold text-lg">{service.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{service.subtitle}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-6">
                      Property type
                    </label>
                    <div className="flex gap-4">
                      {propertyTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            onClick={() => updateField('propertyType', type.id)}
                            className={`
                              flex-1 p-6 rounded-2xl border-2 transition-all
                              ${formData.propertyType === type.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-2" />
                            <p className="font-medium">{type.title}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Details */}
              {currentSection === 1 && (
                <>
                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Property size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => updateField('size', e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    >
                      <option value="">Select size</option>
                      <option value="small">Less than 1,000 sq ft</option>
                      <option value="medium">1,000 - 2,500 sq ft</option>
                      <option value="large">2,500 - 5,000 sq ft</option>
                      <option value="xlarge">More than 5,000 sq ft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Budget range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    >
                      <option value="">Select budget</option>
                      <option value="20-40">₹20L - ₹40L</option>
                      <option value="40-60">₹40L - ₹60L</option>
                      <option value="60-100">₹60L - ₹1Cr</option>
                      <option value="100+">Above ₹1Cr</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="Enter your location"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    />
                  </div>
                </>
              )}

              {/* Style */}
              {currentSection === 2 && (
                <div>
                  <label className="block text-lg font-medium mb-6">
                    Choose your style
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateField('style', style.id)}
                        className={`
                          relative aspect-[4/3] rounded-2xl overflow-hidden group
                          ${formData.style === style.id ? 'ring-4 ring-black' : ''}
                        `}
                      >
                        <Image
                          src={style.image}
                          alt={style.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <p className="absolute bottom-4 left-4 text-white font-semibold text-xl">
                          {style.title}
                        </p>
                        {formData.style === style.id && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              {currentSection === 3 && (
                <>
                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-4">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-black transition-colors text-lg"
                    />
                  </div>
                </>
              )}

              {/* Timeline */}
              {currentSection === 4 && (
                <div>
                  <label className="block text-lg font-medium mb-6">
                    When would you like to start?
                  </label>
                  <div className="space-y-4">
                    {[
                      { id: 'asap', title: 'As soon as possible' },
                      { id: '1month', title: 'Within 1 month' },
                      { id: '3months', title: 'Within 3 months' },
                      { id: 'exploring', title: 'Just exploring' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => updateField('timeline', option.id)}
                        className={`
                          w-full p-6 rounded-xl border-2 text-left transition-all
                          ${formData.timeline === option.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <p className="font-medium text-lg">{option.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}
              className={`
                text-gray-600 hover:text-black font-medium transition-colors
                ${currentSection === 0 ? 'invisible' : ''}
              `}
            >
              Back
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all
                  ${canProceed()
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`
                  px-8 py-4 rounded-full font-medium transition-all
                  ${canProceed() && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Get your quote'}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}