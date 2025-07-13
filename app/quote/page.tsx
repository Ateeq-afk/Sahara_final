"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, ArrowLeft, User, Building, Settings, Palette, Calendar,
  Check, Sparkles, TrendingUp, Mail, Phone, MapPin, Home, Briefcase,
  PaintBucket, Hammer, Package, Clock, IndianRupee, CheckCircle,
  Star, Zap, Shield, Award, Camera, Sofa, Trees, Dumbbell, Wine,
  AlertCircle, Info, MessageCircle, Lightbulb, TrendingDown,
  Crown, Gem, ChevronRight,
  Layers, Gauge, MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const steps = [
  { id: 1, title: "Contact", subtitle: "Tell us about yourself", icon: User },
  { id: 2, title: "Project", subtitle: "What are you building?", icon: Building },
  { id: 3, title: "Specifications", subtitle: "Project requirements", icon: Settings },
  { id: 4, title: "Design", subtitle: "Style preferences", icon: Palette },
  { id: 5, title: "Timeline", subtitle: "When to start?", icon: Calendar }
]

// Service options with details
const serviceOptions = [
  { 
    id: 'construction', 
    name: 'Construction', 
    icon: Building, 
    desc: 'New builds from ground up',
    color: 'from-blue-500 to-blue-600',
    features: ['Foundation to finish', 'Quality materials', 'Expert team']
  },
  { 
    id: 'interior-design', 
    name: 'Interior Design', 
    icon: Palette, 
    desc: 'Transform your space',
    color: 'from-purple-500 to-purple-600',
    features: ['Custom designs', '3D visualization', 'Premium finishes'],
    packages: [
      { id: 'interior-standard', name: 'Standard 2BHK', price: '₹2.24L', desc: 'Essential interiors' },
      { id: 'interior-premium', name: 'Premium 2BHK', price: '₹5.49L', desc: 'Designer elements' },
      { id: 'interior-luxury', name: 'Luxury 2BHK', price: '₹10.95L', desc: 'Ultra-luxury finishes' }
    ]
  },
  { 
    id: 'renovation', 
    name: 'Renovation', 
    icon: Hammer, 
    desc: 'Upgrade existing spaces',
    color: 'from-green-500 to-green-600',
    features: ['Modern updates', 'Structural changes', 'Quick turnaround']
  },
  { 
    id: 'turnkey', 
    name: 'Turnkey Solutions', 
    icon: Package, 
    desc: 'Complete project delivery',
    color: 'from-amber-500 to-amber-600',
    features: ['End-to-end service', 'Single point contact', 'Hassle-free']
  }
]

// Design styles
const designStyles = [
  { id: 'modern', name: 'Modern Minimalist', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80' },
  { id: 'contemporary', name: 'Contemporary', image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&q=80' },
  { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&q=80' },
  { id: 'industrial', name: 'Industrial', image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=400&q=80' },
  { id: 'scandinavian', name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { id: 'luxury', name: 'Luxury Premium', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' }
]

// Premium features
const premiumFeatures = [
  { id: 'smart-home', name: 'Smart Home', icon: Zap, desc: 'Automation & IoT' },
  { id: 'sustainable', name: 'Eco-Friendly', icon: Trees, desc: 'Green materials' },
  { id: 'home-theater', name: 'Home Theater', icon: Camera, desc: 'Entertainment space' },
  { id: 'modular-kitchen', name: 'Modular Kitchen', icon: Briefcase, desc: 'Modern cooking' },
  { id: 'walk-in-closet', name: 'Walk-in Closet', icon: Sofa, desc: 'Luxury storage' },
  { id: 'home-gym', name: 'Home Gym', icon: Dumbbell, desc: 'Fitness zone' },
  { id: 'wine-cellar', name: 'Wine Cellar', icon: Wine, desc: 'Collection space' },
  { id: 'outdoor-living', name: 'Outdoor Living', icon: Trees, desc: 'Garden & patio' }
]

// Budget ranges with descriptions
const budgetRanges = [
  { id: 'starter', range: 'Under ₹20L', desc: 'Essential quality', icon: IndianRupee },
  { id: 'standard', range: '₹20L - ₹40L', desc: 'Premium materials', icon: Star },
  { id: 'premium', range: '₹40L - ₹60L', desc: 'Luxury finishes', icon: Gem },
  { id: 'luxury', range: '₹60L - ₹1Cr', desc: 'Exclusive designs', icon: Crown },
  { id: 'ultra', range: 'Above ₹1Cr', desc: 'No limits', icon: Crown }
]

// Apple-inspired design system
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}


export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0) // Start with hero
  const [completionScore, setCompletionScore] = useState(0)
  const [showCostEstimate, setShowCostEstimate] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showTooltip, setShowTooltip] = useState('')
  const [priceComparison, setPriceComparison] = useState<{market: number, sahara: number} | null>(null)
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([])
  const [isFormStarted, setIsFormStarted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    // Personal info
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Project details
    serviceType: '',
    interiorPackage: '',
    projectType: '',
    propertySize: '',
    location: '',
    budget: '',
    timeline: '',
    
    // Design preferences
    designStyles: [] as string[],
    features: [] as string[],
    specialRequirements: '',
    
    // Additional info
    howDidYouHear: '',
    preferredContact: 'phone'
  })

  const [costEstimate, setCostEstimate] = useState({
    min: 0,
    max: 0,
    breakdown: {
      materials: 0,
      labor: 0,
      design: 0
    },
    savings: 0,
    timeline: ''
  })


  // Calculate completion score
  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone', 'serviceType', 'projectType', 'propertySize', 'budget', 'timeline']
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData])
    const score = Math.round((filledFields.length / requiredFields.length) * 100)
    setCompletionScore(score)
  }, [formData, currentStep])


  // Real-time cost estimation
  useEffect(() => {
    if (formData.serviceType && formData.propertySize && formData.budget) {
      setIsCalculating(true)
      
      // Simulate calculation
      setTimeout(() => {
        const baseRates = {
          'construction': { min: 1500, max: 3000 },
          'interior-design': { min: 800, max: 2000 },
          'renovation': { min: 1000, max: 2500 },
          'turnkey': { min: 2000, max: 4000 }
        }
        
        const sizeMultipliers = {
          'compact': 800,
          'medium': 1500,
          'large': 2500,
          'premium': 3500
        }
        
        const timelineEstimates = {
          'construction': { 'compact': '3-4 months', 'medium': '4-6 months', 'large': '6-8 months', 'premium': '8-12 months' },
          'interior-design': { 'compact': '1-2 months', 'medium': '2-3 months', 'large': '3-4 months', 'premium': '4-6 months' },
          'renovation': { 'compact': '2-3 months', 'medium': '3-4 months', 'large': '4-5 months', 'premium': '5-7 months' },
          'turnkey': { 'compact': '4-5 months', 'medium': '5-7 months', 'large': '7-10 months', 'premium': '10-14 months' }
        }
        
        const rate = baseRates[formData.serviceType as keyof typeof baseRates] || { min: 1000, max: 2000 }
        const size = sizeMultipliers[formData.propertySize as keyof typeof sizeMultipliers] || 1500
        
        const minCost = rate.min * size
        const maxCost = rate.max * size
        const marketAvg = maxCost * 1.2 // 20% higher than our max
        const savings = marketAvg - ((minCost + maxCost) / 2)
        
        setCostEstimate({
          min: minCost,
          max: maxCost,
          breakdown: {
            materials: minCost * 0.6,
            labor: minCost * 0.3,
            design: minCost * 0.1
          },
          savings: savings,
          timeline: timelineEstimates[formData.serviceType as keyof typeof timelineEstimates]?.[formData.propertySize as keyof typeof timelineEstimates['construction']] || '3-6 months'
        })
        
        // Set price comparison for display
        setPriceComparison({
          market: marketAvg,
          sahara: (minCost + maxCost) / 2
        })
        
        setShowCostEstimate(true)
        setIsCalculating(false)
      }, 1000)
    }
  }, [formData.serviceType, formData.propertySize, formData.budget])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouchedFields(prev => new Set(prev).add(field))
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    
    
    // Generate smart suggestions based on selections
    generateSmartSuggestions(field, value)
  }

  const generateSmartSuggestions = (field: string, value: any) => {
    const suggestions: string[] = []
    
    if (field === 'serviceType') {
      if (value === 'construction') {
        suggestions.push('Consider adding solar panels for long-term savings')
        suggestions.push('Green building certification can increase property value by 7%')
      } else if (value === 'interior-design') {
        suggestions.push('Open floor plans are trending in 2025')
        suggestions.push('Smart home integration adds 5% to property value')
      }
    }
    
    if (field === 'budget' && value === 'premium') {
      suggestions.push('Premium materials offer 25-year warranties')
      suggestions.push('Luxury finishes have higher ROI in Bangalore market')
    }
    
    if (suggestions.length > 0) {
      setSmartSuggestions(suggestions)
      setTimeout(() => setSmartSuggestions([]), 5000)
    }
  }

  const handleArrayToggle = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    handleInputChange(field, newArray)
  }

  const validateStep = () => {
    const errors: {[key: string]: string} = {}
    
    switch (currentStep) {
      case 1:
        if (!formData.name) errors.name = 'Name is required'
        if (!formData.email) errors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email'
        if (!formData.phone) errors.phone = 'Phone is required'
        else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Invalid phone number'
        break
      case 2:
        if (!formData.serviceType) errors.serviceType = 'Please select a service'
        if (formData.serviceType === 'interior-design' && !formData.interiorPackage) {
          errors.interiorPackage = 'Please select an interior package'
        }
        if (!formData.projectType) errors.projectType = 'Please select property type'
        break
      case 3:
        if (!formData.propertySize) errors.propertySize = 'Please select property size'
        if (!formData.budget) errors.budget = 'Please select budget range'
        if (!formData.location) errors.location = 'Location is required'
        break
      case 4:
        if (formData.designStyles.length === 0) errors.designStyles = 'Please select at least one style'
        break
      case 5:
        if (!formData.timeline) errors.timeline = 'Please select timeline'
        break
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    
    setShowSuccess(true)
    // Here you would normally send the data to your API
    console.log('Form submitted:', formData)
  }

  // Start form handler
  const startForm = () => {
    setIsFormStarted(true)
    setCurrentStep(1)
    // Smooth scroll to form
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
    }, 100)
  }

  if (showSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Quote Request Submitted!</h1>
          <p className="text-gray-600 mb-6">We'll prepare your personalized quote and contact you within 2 hours.</p>
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-amber-900">Estimated Project Cost</p>
            <p className="text-2xl font-bold text-amber-600">
              ₹{(costEstimate.min / 100000).toFixed(1)}L - ₹{(costEstimate.max / 100000).toFixed(1)}L
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Smart Suggestions */}
      <AnimatePresence>
        {smartSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-4 top-32 z-40 max-w-xs"
          >
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-1">Smart Tip</p>
                  {smartSuggestions.map((suggestion, index) => (
                    <p key={index} className="text-sm text-gray-600 mb-1">{suggestion}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple-style Hero Section */}
      {currentStep === 0 && (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <motion.div 
              className="text-center max-w-5xl mx-auto"
              initial="initial"
              animate="animate"
            >
              {/* Tag */}
              <motion.div {...fadeInUp} className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                  <Sparkles className="w-4 h-4" />
                  Transform Your Space
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                {...fadeInUp}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
              >
                <span className="block text-gray-900">Build</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Beyond Imagination
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Experience construction reimagined. Where precision meets perfection,
                and your dream space comes to life.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <button
                  onClick={startForm}
                  className="group px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Your Quote
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/showcase"
                  className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg border border-gray-300 hover:border-gray-400 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </motion.div>

              {/* Feature Pills */}
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                {[
                  { icon: Clock, text: "On-Time Delivery" },
                  { icon: Shield, text: "5 Year Warranty" },
                  { icon: Star, text: "500+ Projects" },
                  { icon: Award, text: "Award Winning" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                  >
                    <item.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [2, 8, 2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 right-10 md:right-20 lg:right-40"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl opacity-20" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-40 left-10 md:left-20 lg:left-40"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10" />
          </motion.div>
        </section>
      )}

      {/* Form Section */}
      {(isFormStarted || currentStep > 0) && (
        <section className="relative bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Apple-style Progress Indicator */}
              <div className="mb-16">
                {/* Minimalist Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                    <span className="text-sm font-medium text-gray-600">{completionScore}% Complete</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionScore}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Step Pills */}
                <div className="flex justify-center gap-3 flex-wrap">
                  {steps.map((step, index) => (
                    <motion.button
                      key={step.id}
                      onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                      disabled={step.id > currentStep}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        step.id === currentStep 
                          ? 'bg-black text-white' 
                          : step.id < currentStep
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                      whileHover={step.id <= currentStep ? { scale: 1.05 } : {}}
                      whileTap={step.id <= currentStep ? { scale: 0.95 } : {}}
                    >
                      {step.id < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Form Card */}
              <motion.div 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
            <form
              name="quote"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={(e) => {
                e.preventDefault();
                // Only submit if we're on the final step
                if (currentStep === steps.length) {
                  handleSubmit();
                } else {
                  nextStep();
                }
              }}
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="quote" />
              <div hidden>
                <input name="bot-field" />
              </div>
              
              {/* Hidden inputs to capture all form data */}
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="phone" value={formData.phone} />
              <input type="hidden" name="company" value={formData.company} />
              <input type="hidden" name="serviceType" value={formData.serviceType} />
              <input type="hidden" name="interiorPackage" value={formData.interiorPackage} />
              <input type="hidden" name="projectType" value={formData.projectType} />
              <input type="hidden" name="propertySize" value={formData.propertySize} />
              <input type="hidden" name="location" value={formData.location} />
              <input type="hidden" name="budget" value={formData.budget} />
              <input type="hidden" name="timeline" value={formData.timeline} />
              <input type="hidden" name="designStyles" value={formData.designStyles.join(', ')} />
              <input type="hidden" name="features" value={formData.features.join(', ')} />
              <input type="hidden" name="specialRequirements" value={formData.specialRequirements} />
              <input type="hidden" name="howDidYouHear" value={formData.howDidYouHear} />
              <input type="hidden" name="preferredContact" value={formData.preferredContact} />
              
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <User className="w-8 h-8 text-amber-600" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2">Let's get to know you</h2>
                      <p className="text-gray-600">We'll use this to personalize your experience</p>
                    </div>
                    
                    <div className="space-y-6 max-w-md mx-auto">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            validationErrors.name && touchedFields.has('name')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-amber-500'
                          } focus:outline-none`}
                          placeholder="John Doe"
                        />
                        {validationErrors.name && touchedFields.has('name') && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.name}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            validationErrors.email && touchedFields.has('email')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-amber-500'
                          } focus:outline-none`}
                          placeholder="john@example.com"
                        />
                        {validationErrors.email && touchedFields.has('email') && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.email}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            validationErrors.phone && touchedFields.has('phone')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-amber-500'
                          } focus:outline-none`}
                          placeholder="+91 98765 43210"
                        />
                        {validationErrors.phone && touchedFields.has('phone') && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.phone}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          Company (Optional)
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all"
                          placeholder="Acme Corp"
                        />
                      </div>

                      {/* Trust badges */}
                      <div className="flex items-center justify-center gap-6 pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Shield className="w-4 h-4" />
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>2hr Response</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Service Selection */}
                {currentStep === 2 && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Building className="w-8 h-8 text-blue-600" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2">What's your project about?</h2>
                      <p className="text-gray-600">Select the service that best fits your needs</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-4">Choose Your Service <span className="text-red-500">*</span></label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {serviceOptions.map((service, index) => {
                            const Icon = service.icon
                            return (
                              <motion.button
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleInputChange('serviceType', service.id)}
                                className={`relative p-6 rounded-2xl border-2 transition-all text-left group ${
                                  formData.serviceType === service.id
                                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                }`}
                              >
                                {formData.serviceType === service.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-5 h-5 text-white" />
                                  </motion.div>
                                )}
                                
                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {service.features.map((feature, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                        {validationErrors.serviceType && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.serviceType}
                          </motion.p>
                        )}
                      </div>

                      {/* Interior Design Packages */}
                      {formData.serviceType === 'interior-design' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6"
                        >
                          <label className="block text-sm font-medium mb-4">Choose Your Interior Package <span className="text-red-500">*</span></label>
                          <div className="grid md:grid-cols-3 gap-4">
                            {serviceOptions.find(s => s.id === 'interior-design')?.packages?.map((pkg, index) => (
                              <motion.button
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleInputChange('interiorPackage', pkg.id)}
                                className={`p-6 rounded-2xl border-2 transition-all text-center ${
                                  formData.interiorPackage === pkg.id
                                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                }`}
                              >
                                {formData.interiorPackage === pkg.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-5 h-5 text-white" />
                                  </motion.div>
                                )}
                                <h4 className="font-semibold text-lg mb-2">{pkg.name}</h4>
                                <div className="text-2xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                                <p className="text-sm text-gray-600">{pkg.desc}</p>
                                <p className="text-xs text-amber-600 mt-2">*Starting from</p>
                              </motion.button>
                            ))}
                          </div>
                          {validationErrors.interiorPackage && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {validationErrors.interiorPackage}
                            </motion.p>
                          )}
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-4">Property Type <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'residential', name: 'Residential', icon: Home },
                            { id: 'commercial', name: 'Commercial', icon: Building },
                            { id: 'office', name: 'Office Space', icon: Briefcase },
                            { id: 'retail', name: 'Retail Store', icon: PaintBucket }
                          ].map((type) => {
                            const Icon = type.icon
                            return (
                              <motion.button
                                key={type.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInputChange('projectType', type.id)}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  formData.projectType === type.id
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                                  formData.projectType === type.id ? 'text-amber-600' : 'text-gray-500'
                                }`} />
                                <p className="text-sm font-medium">{type.name}</p>
                              </motion.button>
                            )
                          })}
                        </div>
                        {validationErrors.projectType && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.projectType}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Settings className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2">Project specifications</h2>
                      <p className="text-gray-600">Help us understand your space and budget</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-4">Property Size <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { id: 'compact', name: 'Compact', desc: '< 1,000 sq.ft', icon: Home },
                            { id: 'medium', name: 'Medium', desc: '1-2K sq.ft', icon: Building },
                            { id: 'large', name: 'Large', desc: '2-3K sq.ft', icon: Building },
                            { id: 'premium', name: 'Premium', desc: '> 3,000 sq.ft', icon: Crown }
                          ].map((size) => (
                            <motion.button
                              key={size.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleInputChange('propertySize', size.id)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                formData.propertySize === size.id
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <size.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                              <p className="font-medium">{size.name}</p>
                              <p className="text-xs text-gray-500">{size.desc}</p>
                            </motion.button>
                          ))}
                        </div>
                        {validationErrors.propertySize && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.propertySize}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-4">Budget Range <span className="text-red-500">*</span></label>
                        <div className="space-y-3">
                          {budgetRanges.map((budget, index) => (
                            <motion.button
                              key={budget.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('budget', budget.id)}
                              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                                formData.budget === budget.id
                                  ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <budget.icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="text-left">
                                  <p className="font-semibold">{budget.range}</p>
                                  <p className="text-sm text-gray-600">{budget.desc}</p>
                                </div>
                              </div>
                              {formData.budget === budget.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                        {validationErrors.budget && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.budget}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Project Location <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            validationErrors.location && touchedFields.has('location')
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-amber-500'
                          } focus:outline-none`}
                          placeholder="e.g., BTM Layout, Bangalore"
                        />
                        {validationErrors.location && touchedFields.has('location') && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.location}
                          </motion.p>
                        )}
                      </div>

                      {/* Live cost estimate */}
                      {isCalculating && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-4"
                        >
                          <div className="inline-flex items-center gap-2 text-amber-600">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full"
                            />
                            <span>Calculating estimate...</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Design Preferences */}
                {currentStep === 4 && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Palette className="w-8 h-8 text-purple-600" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2">Design your dream space</h2>
                      <p className="text-gray-600">Select styles and features you love</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-4">
                          Design Styles <span className="text-red-500">*</span>
                          <span className="text-gray-400 font-normal ml-2">(Select one or more)</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {designStyles.map((style, index) => (
                            <motion.button
                              key={style.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleArrayToggle('designStyles', style.id)}
                              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                                formData.designStyles.includes(style.id)
                                  ? 'border-amber-500 shadow-lg'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="aspect-video relative">
                                <Image
                                  src={style.image}
                                  alt={style.name}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <p className="absolute bottom-2 left-2 right-2 text-white font-medium text-sm">
                                  {style.name}
                                </p>
                                {formData.designStyles.includes(style.id) && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-5 h-5 text-white" />
                                  </motion.div>
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {validationErrors.designStyles && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.designStyles}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-4">
                          Premium Features
                          <span className="text-gray-400 font-normal ml-2">(Optional)</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {premiumFeatures.map((feature) => {
                            const Icon = feature.icon
                            return (
                              <motion.button
                                key={feature.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleArrayToggle('features', feature.id)}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  formData.features.includes(feature.id)
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                                  formData.features.includes(feature.id) ? 'text-amber-600' : 'text-gray-500'
                                }`} />
                                <p className="text-sm font-medium">{feature.name}</p>
                                <p className="text-xs text-gray-500">{feature.desc}</p>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Timeline & Additional Info */}
                {currentStep === 5 && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Calendar className="w-8 h-8 text-indigo-600" />
                      </motion.div>
                      <h2 className="text-3xl font-bold mb-2">When should we start?</h2>
                      <p className="text-gray-600">Almost done! Just a few more details</p>
                    </div>
                    
                    <div className="space-y-6 max-w-md mx-auto">
                      <div>
                        <label className="block text-sm font-medium mb-4">Project Timeline <span className="text-red-500">*</span></label>
                        <div className="space-y-3">
                          {[
                            { id: 'asap', name: 'As Soon As Possible', desc: 'Ready to start immediately' },
                            { id: '1month', name: 'Within 1 Month', desc: 'Some planning needed' },
                            { id: '3months', name: 'Within 3 Months', desc: 'Flexible timeline' },
                            { id: 'later', name: '3+ Months', desc: 'Just exploring options' }
                          ].map((timeline) => (
                            <motion.button
                              key={timeline.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('timeline', timeline.id)}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                formData.timeline === timeline.id
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{timeline.name}</p>
                                  <p className="text-sm text-gray-600">{timeline.desc}</p>
                                </div>
                                {formData.timeline === timeline.id && (
                                  <Check className="w-5 h-5 text-amber-600" />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {validationErrors.timeline && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.timeline}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Special Requirements
                          <span className="text-gray-400 font-normal ml-2">(Optional)</span>
                        </label>
                        <motion.textarea
                          whileFocus={{ scale: 1.02 }}
                          value={formData.specialRequirements}
                          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all"
                          rows={4}
                          placeholder="Tell us about any specific requirements, preferences, or questions..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Preferred Contact Method</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'phone', name: 'Phone', icon: Phone },
                            { id: 'email', name: 'Email', icon: Mail },
                            { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare }
                          ].map((method) => {
                            const Icon = method.icon
                            return (
                              <motion.button
                                key={method.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInputChange('preferredContact', method.id)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  formData.preferredContact === method.id
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <Icon className={`w-5 h-5 mx-auto mb-1 ${
                                  formData.preferredContact === method.id ? 'text-amber-600' : 'text-gray-500'
                                }`} />
                                <p className="text-sm">{method.name}</p>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Final CTA */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 text-center"
                      >
                        <Sparkles className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                        <p className="font-medium">Ready to transform your space?</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Submit your request and get a detailed quote in 2 hours
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <motion.div 
              className="border-t border-gray-100 px-8 py-6 bg-gray-50/50 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>

              <div className="flex items-center gap-2">
                {/* Step indicators */}
                <div className="flex gap-1">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`h-2 rounded-full transition-all ${
                        step.id === currentStep
                          ? 'w-8 bg-amber-500'
                          : step.id < currentStep
                          ? 'w-2 bg-gray-900'
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  Submit Quote Request
                  <Sparkles className="w-4 h-4" />
                </motion.button>
              )}
                </motion.div>
              </form>
              </motion.div>

              {/* Live Cost Estimate Card */}
              {showCostEstimate && costEstimate.min > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                    Live Cost Estimate
                  </h3>
                  <p className="text-sm text-gray-600">Based on your selections</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">
                    ₹{(costEstimate.min / 100000).toFixed(1)}L - ₹{(costEstimate.max / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
              
              {/* Market comparison visual */}
              {priceComparison && (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Market Average</span>
                    <span className="font-medium text-gray-500 line-through">₹{(priceComparison.market / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute h-full bg-gray-400 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-600 font-medium">Sahara Price</span>
                    <span className="font-bold text-amber-600">₹{(priceComparison.sahara / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="relative h-3 bg-amber-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(priceComparison.sahara / priceComparison.market) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="absolute h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    />
                  </div>
                </div>
              )}
              
              {/* Cost breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Materials</p>
                  <p className="font-semibold">₹{(costEstimate.breakdown.materials / 100000).toFixed(1)}L</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Labor</p>
                  <p className="font-semibold">₹{(costEstimate.breakdown.labor / 100000).toFixed(1)}L</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Design</p>
                  <p className="font-semibold">₹{(costEstimate.breakdown.design / 100000).toFixed(1)}L</p>
                </div>
              </div>

              {/* Savings indicator */}
              {costEstimate.savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-100 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">You save vs market average</span>
                  </div>
                  <span className="font-bold text-green-700">₹{(costEstimate.savings / 100000).toFixed(1)}L</span>
                </motion.div>
              )}

              {/* Timeline estimate */}
              {costEstimate.timeline && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated timeline: <strong>{costEstimate.timeline}</strong></span>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                <Info className="w-3 h-3 inline mr-1" />
                Final quote may vary based on specific requirements
              </p>
            </motion.div>
          )}
            </div>
          </div>
        </section>
      )}

      {/* Apple-style Features Section */}
      {currentStep === 0 && (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <motion.h2 
                  {...fadeInUp}
                  className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                >
                  Why Choose Sahara
                </motion.h2>
                <motion.p 
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  We combine cutting-edge technology with timeless craftsmanship
                  to deliver exceptional results.
                </motion.p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Gauge,
                    title: "Lightning Fast",
                    description: "Get your personalized quote in minutes, not days. Our AI-powered system ensures accuracy and speed.",
                    stat: "2 min",
                    statLabel: "Average quote time"
                  },
                  {
                    icon: Shield,
                    title: "Quality Assured",
                    description: "Every project backed by our 5-year warranty. Premium materials and expert craftsmanship guaranteed.",
                    stat: "100%",
                    statLabel: "Satisfaction rate"
                  },
                  {
                    icon: Layers,
                    title: "Full Transparency",
                    description: "No hidden costs, no surprises. Track your project in real-time with our customer portal.",
                    stat: "24/7",
                    statLabel: "Project tracking"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                      <feature.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="pt-6 border-t border-gray-200">
                      <div className="text-3xl font-bold text-gray-900">{feature.stat}</div>
                      <div className="text-sm text-gray-500">{feature.statLabel}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {currentStep === 0 && (
        <section className="py-32 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <motion.h2 
                  {...fadeInUp}
                  className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                >
                  Loved by homeowners
                </motion.h2>
                <motion.p 
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600"
                >
                  Join 500+ satisfied customers who transformed their spaces with us.
                </motion.p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Priya Sharma",
                    role: "Homeowner, Koramangala",
                    content: "The attention to detail was extraordinary. They turned our vision into reality, exceeding all expectations.",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop"
                  },
                  {
                    name: "Arjun Patel",
                    role: "Business Owner, Whitefield",
                    content: "Professional, punctual, and perfect execution. The team delivered our office renovation ahead of schedule.",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop"
                  },
                  {
                    name: "Meera Reddy",
                    role: "Homeowner, HSR Layout",
                    content: "From design to execution, everything was seamless. The quality of work speaks for itself.",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&fit=crop"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {currentStep === 0 && (
        <section className="py-32 bg-black text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2 
                {...fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Ready to start your journey?
              </motion.h2>
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              >
                Get a personalized quote in minutes. No obligations, no spam.
                Just honest pricing and expert advice.
              </motion.p>
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={startForm}
                  className="group px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Your Quote
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="tel:+919591837216"
                  className="px-8 py-4 bg-transparent text-white rounded-full font-medium text-lg border border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {currentStep > 0 && (
          <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
            {/* Live chat help */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center text-white relative"
                onMouseEnter={() => setShowTooltip('chat')}
                onMouseLeave={() => setShowTooltip('')}
                onClick={() => alert('Live chat coming soon! Call +91 95918 37216')}
              >
                <MessageCircle className="w-6 h-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
              {showTooltip === 'chat' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
                >
                  Chat with us!
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="border-8 border-transparent border-l-gray-900" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Help button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center"
              onMouseEnter={() => setShowTooltip('phone')}
              onMouseLeave={() => setShowTooltip('')}
              onClick={() => window.location.href = 'tel:+919591837216'}
            >
              <Phone className="w-6 h-6 text-gray-600" />
              {showTooltip === 'phone' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
                >
                  Call now!
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="border-8 border-transparent border-l-gray-900" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}