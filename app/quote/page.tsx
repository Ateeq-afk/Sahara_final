"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, User, Building, Palette, Calendar,
  Check, Mail, Phone, Home, Briefcase,
  Hammer, Package, MapPin, ChevronDown, X, Loader2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

// Apple-inspired minimalist design
const services = [
  { 
    id: 'construction', 
    title: 'Construction',
    subtitle: 'Build from ground up',
    icon: Building,
    color: 'bg-blue-500'
  },
  { 
    id: 'interior', 
    title: 'Interior Design',
    subtitle: 'Transform your space',
    icon: Palette,
    color: 'bg-purple-500'
  },
  { 
    id: 'renovation', 
    title: 'Renovation',
    subtitle: 'Refresh and renew',
    icon: Hammer,
    color: 'bg-green-500'
  },
  { 
    id: 'turnkey', 
    title: 'Turnkey',
    subtitle: 'Complete solutions',
    icon: Package,
    color: 'bg-amber-500'
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

export default function QuotePage() {
  const [currentSection, setCurrentSection] = useState(-1) // -1 for hero
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const formRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  
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
    { id: 'service', title: 'Service', fields: ['service', 'propertyType'] },
    { id: 'details', title: 'Details', fields: ['size', 'budget', 'location'] },
    { id: 'style', title: 'Style', fields: ['style'] },
    { id: 'contact', title: 'Contact', fields: ['name', 'email', 'phone'] },
    { id: 'timeline', title: 'Timeline', fields: ['timeline'] }
  ]

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateSection = (sectionIndex: number) => {
    const section = sections[sectionIndex]
    const newErrors: {[key: string]: string} = {}
    
    section.fields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required'
      }
    })
    
    // Email validation
    if (sectionIndex === 3 && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }
    
    // Phone validation
    if (sectionIndex === 3 && formData.phone) {
      const phoneRegex = /^\+?[\d\s-()]+$/
      if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const canProceed = () => {
    if (currentSection < 0) return true
    return validateSection(currentSection)
  }

  const handleNext = () => {
    if (currentSection >= 0 && !validateSection(currentSection)) {
      return
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    } else if (currentSection === 0) {
      setCurrentSection(-1)
    }
  }

  const startForm = () => {
    setCurrentSection(0)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateSection(currentSection)) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Submit to Netlify Forms
      const formElement = e.target as HTMLFormElement
      const formData = new FormData(formElement)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      setShowSuccess(true)
      toast({
        title: 'Quote Request Submitted!',
        description: 'We\'ll prepare your personalized quote and contact you within 2 hours.',
        duration: 5000,
      })
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your quote request. Please try again or contact us directly.',
        variant: 'destructive',
        duration: 7000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-[#34C759] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-[40px] leading-[1.1] font-semibold mb-4 text-[#1d1d1f]">Thank you.</h1>
          <p className="text-[21px] leading-[1.381] text-gray-700 mb-8">
            We'll prepare your personalized quote and contact you within 2 hours.
          </p>
          <Link
            href="/"
            className="text-[#0066CC] hover:underline font-medium text-[17px]"
          >
            Return home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* Hero Section */}
      {currentSection === -1 && (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-8">
          <div className="text-center max-w-[980px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[56px] md:text-[80px] leading-[1.07] tracking-[-0.015em] font-semibold text-[#1d1d1f] mb-6"
            >
              Let's build<br />something great.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[21px] md:text-[28px] leading-[1.381] text-gray-700 mb-12 max-w-[600px] mx-auto"
            >
              Get your personalized quote in minutes. Simple, transparent, and tailored to your needs.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={startForm}
              className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ED] text-white px-7 py-4 rounded-[980px] text-[17px] font-medium transition-colors"
            >
              Get started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-700"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Form Section */}
      {currentSection >= 0 && (
        <section ref={formRef} className="min-h-screen py-20 px-6 md:px-8">
          <div className="max-w-[728px] mx-auto">
            {/* Progress */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-12">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`flex items-center ${index < sections.length - 1 ? 'flex-1' : ''}`}
                  >
                    <button
                      onClick={() => index <= currentSection && setCurrentSection(index)}
                      disabled={index > currentSection}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold
                        transition-all duration-300
                        ${index === currentSection 
                          ? 'bg-[#1d1d1f] text-white' 
                          : index < currentSection
                          ? 'bg-[#1d1d1f] text-white'
                          : 'bg-[#f5f5f7] text-gray-700'
                        }
                      `}
                    >
                      {index < currentSection ? <Check className="w-4 h-4" strokeWidth={3} /> : index + 1}
                    </button>
                    {index < sections.length - 1 && (
                      <div 
                        className={`flex-1 h-[2px] mx-3 transition-all duration-500 ${
                          index < currentSection ? 'bg-[#1d1d1f]' : 'bg-[#d2d2d7]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-[40px] leading-[1.1] font-semibold text-[#1d1d1f]">
                  {sections[currentSection].title}
                </h2>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} name="quote" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="quote" />
              <div hidden>
                <input name="bot-field" />
              </div>
              
              {/* Hidden inputs for all form data */}
              <input type="hidden" name="service" value={formData.service} />
              <input type="hidden" name="propertyType" value={formData.propertyType} />
              <input type="hidden" name="size" value={formData.size} />
              <input type="hidden" name="budget" value={formData.budget} />
              <input type="hidden" name="location" value={formData.location} />
              <input type="hidden" name="style" value={formData.style} />
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="phone" value={formData.phone} />
              <input type="hidden" name="timeline" value={formData.timeline} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* Service Selection */}
                  {currentSection === 0 && (
                    <>
                      <div>
                        <label className="block text-[17px] font-medium mb-6 text-[#1d1d1f]">
                          What would you like to build?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => {
                            const Icon = service.icon
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => updateField('service', service.id)}
                                className={`
                                  p-6 rounded-[18px] border text-left transition-all relative overflow-hidden
                                  ${formData.service === service.id
                                    ? 'border-[#1d1d1f] bg-[#f5f5f7]'
                                    : 'border-[#d2d2d7] hover:border-[#86868b] bg-white'
                                  }
                                `}
                              >
                                {formData.service === service.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4"
                                  >
                                    <Check className="w-5 h-5" strokeWidth={3} />
                                  </motion.div>
                                )}
                                <div className={`w-12 h-12 ${service.color} rounded-[12px] flex items-center justify-center mb-4`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-[19px] text-[#1d1d1f] mb-1">{service.title}</h3>
                                <p className="text-gray-700 text-[15px]">{service.subtitle}</p>
                              </button>
                            )
                          })}
                        </div>
                        {errors.service && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.service}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[17px] font-medium mb-6 text-[#1d1d1f]">
                          Property type
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {propertyTypes.map((type) => {
                            const Icon = type.icon
                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => updateField('propertyType', type.id)}
                                className={`
                                  p-6 rounded-[18px] border transition-all
                                  ${formData.propertyType === type.id
                                    ? 'border-[#1d1d1f] bg-[#f5f5f7]'
                                    : 'border-[#d2d2d7] hover:border-[#86868b] bg-white'
                                  }
                                `}
                              >
                                <Icon className="w-8 h-8 mx-auto mb-3 text-[#1d1d1f]" />
                                <p className="font-medium text-[15px] text-[#1d1d1f]">{type.title}</p>
                              </button>
                            )
                          })}
                        </div>
                        {errors.propertyType && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.propertyType}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Details */}
                  {currentSection === 1 && (
                    <>
                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Property size
                        </label>
                        <select
                          value={formData.size}
                          onChange={(e) => updateField('size', e.target.value)}
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.size ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        >
                          <option value="">Select size</option>
                          <option value="small">Less than 1,000 sq ft</option>
                          <option value="medium">1,000 - 2,500 sq ft</option>
                          <option value="large">2,500 - 5,000 sq ft</option>
                          <option value="xlarge">More than 5,000 sq ft</option>
                        </select>
                        {errors.size && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.size}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Budget range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => updateField('budget', e.target.value)}
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.budget ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        >
                          <option value="">Select budget</option>
                          <option value="20-40">₹20L - ₹40L</option>
                          <option value="40-60">₹40L - ₹60L</option>
                          <option value="60-100">₹60L - ₹1Cr</option>
                          <option value="100+">Above ₹1Cr</option>
                        </select>
                        {errors.budget && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.budget}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          placeholder="Enter your location"
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.location ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        />
                        {errors.location && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.location}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Style */}
                  {currentSection === 2 && (
                    <div>
                      <label className="block text-[17px] font-medium mb-6 text-[#1d1d1f]">
                        Choose your style
                      </label>
                      <div className="grid grid-cols-2 gap-6">
                        {styles.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => updateField('style', style.id)}
                            className={`
                              relative aspect-[4/3] rounded-[18px] overflow-hidden group
                              ${formData.style === style.id ? 'ring-4 ring-[#0071e3]' : ''}
                            `}
                          >
                            <Image
                              src={style.image}
                              alt={style.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <p className="absolute bottom-4 left-4 text-white font-semibold text-[21px]">
                              {style.title}
                            </p>
                            {formData.style === style.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                              >
                                <Check className="w-5 h-5 text-[#0071e3]" strokeWidth={3} />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.style && (
                        <p className="text-red-500 text-[13px] mt-2">{errors.style}</p>
                      )}
                    </div>
                  )}

                  {/* Contact */}
                  {currentSection === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Your name"
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.name ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@example.com"
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.email ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[17px] font-medium mb-4 text-[#1d1d1f]">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={`
                            w-full px-4 py-4 rounded-[12px] border bg-white text-[17px]
                            focus:outline-none focus:border-[#0071e3] transition-colors
                            ${errors.phone ? 'border-red-500' : 'border-[#d2d2d7]'}
                          `}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[13px] mt-2">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {currentSection === 4 && (
                    <div>
                      <label className="block text-[17px] font-medium mb-6 text-[#1d1d1f]">
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
                            type="button"
                            onClick={() => updateField('timeline', option.id)}
                            className={`
                              w-full p-6 rounded-[18px] border text-left transition-all
                              ${formData.timeline === option.id
                                ? 'border-[#1d1d1f] bg-[#f5f5f7]'
                                : 'border-[#d2d2d7] hover:border-[#86868b] bg-white'
                              }
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-[17px] text-[#1d1d1f]">{option.title}</p>
                              {formData.timeline === option.id && (
                                <Check className="w-5 h-5 text-[#1d1d1f]" strokeWidth={3} />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.timeline && (
                        <p className="text-red-500 text-[13px] mt-2">{errors.timeline}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-16 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-700 hover:text-[#1d1d1f] font-medium transition-colors text-[17px]"
                >
                  Back
                </button>

                {currentSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-7 py-4 rounded-[980px] bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium flex items-center gap-2 transition-colors text-[17px]"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-7 py-4 rounded-[980px] font-medium transition-all text-[17px] flex items-center gap-2
                      ${!isSubmitting
                        ? 'bg-[#0071e3] hover:bg-[#0077ED] text-white'
                        : 'bg-[#d2d2d7] text-gray-700 cursor-not-allowed'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Get your quote'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}