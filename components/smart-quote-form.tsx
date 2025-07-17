"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, ArrowLeft, Check, Calendar,
  Home, Paintbrush, Wrench, MapPin, ChevronDown,
  Building2
} from 'lucide-react'
import { useFormValidation } from '@/hooks/use-form-validation'

interface FormData {
  projectType: string
  budget: string
  location: string
  timeline: string
  rooms?: number
  style?: string
  area?: string
  name: string
  email: string
  phone: string
}

const projectTypes = [
  { id: 'home-construction', label: 'Home Construction', icon: Home, description: 'Build your dream home from scratch' },
  { id: 'renovation', label: 'Renovation', icon: Wrench, description: 'Transform your existing space' },
  { id: 'interior-design', label: 'Interior Design', icon: Paintbrush, description: 'Beautify your interiors' }
]

const budgetRanges = {
  'home-construction': [
    { id: '25-50', label: '₹25L - ₹50L', description: 'Compact homes' },
    { id: '50-100', label: '₹50L - ₹1Cr', description: 'Premium homes' },
    { id: '100+', label: '₹1Cr+', description: 'Luxury homes' }
  ],
  'renovation': [
    { id: '5-15', label: '₹5L - ₹15L', description: 'Basic renovation' },
    { id: '15-30', label: '₹15L - ₹30L', description: 'Complete makeover' },
    { id: '30+', label: '₹30L+', description: 'Luxury renovation' }
  ],
  'interior-design': [
    { id: '5-10', label: '₹5L - ₹10L', description: '2-3 BHK interiors' },
    { id: '10-25', label: '₹10L - ₹25L', description: 'Premium interiors' },
    { id: '25+', label: '₹25L+', description: 'Luxury interiors' }
  ]
}

const styles = [
  { id: 'modern', label: 'Modern', description: 'Clean lines, minimal' },
  { id: 'minimal', label: 'Minimal', description: 'Less is more' },
  { id: 'traditional', label: 'Traditional', description: 'Classic elegance' }
]

const timelines = [
  { id: 'asap', label: 'As soon as possible' },
  { id: '1-3months', label: 'Within 1-3 months' },
  { id: '3-6months', label: 'Within 3-6 months' },
  { id: '6months+', label: 'After 6 months' }
]

export default function SmartQuoteForm({ onComplete }: { onComplete: (data: FormData) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  
  const { errors, validateField, clearError } = useFormValidation()

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    clearError(field)
  }

  const getSteps = () => {
    const steps = [
      { id: 'project-type', title: 'Project Type' },
      { id: 'budget', title: 'Budget Range' },
      { id: 'location', title: 'Location' },
      { id: 'timeline', title: 'Timeline' }
    ]

    if (formData.projectType === 'interior-design' && formData.budget === '5-10') {
      steps.splice(2, 0, 
        { id: 'rooms', title: 'Rooms' },
        { id: 'style', title: 'Style' }
      )
    } else if (formData.projectType === 'home-construction') {
      steps.splice(2, 0, { id: 'area', title: 'Plot Area' })
    }

    steps.push({ id: 'contact', title: 'Contact Info' })
    return steps
  }

  const steps = getSteps()
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleNext = () => {
    const currentStepId = steps[currentStep].id
    let isValid = true

    if (currentStepId === 'contact') {
      isValid = validateContactInfo()
    }

    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else if (isValid && currentStep === totalSteps - 1) {
      onComplete(formData as FormData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateContactInfo = () => {
    let isValid = true
    
    if (!formData.name) {
      validateField('name', formData.name || '', true)
      isValid = false
    }
    if (!formData.email || !validateField('email', formData.email)) {
      isValid = false
    }
    if (!formData.phone || !validateField('phone', formData.phone)) {
      isValid = false
    }
    
    return isValid
  }

  const handleLocationInput = (value: string) => {
    updateFormData('location', value)
    
    if (value.length > 2) {
      const mockSuggestions = [
        `${value}, Bangalore`,
        `${value}, Mumbai`,
        `${value}, Delhi`,
        `${value}, Chennai`,
        `${value}, Hyderabad`
      ].filter(s => s.toLowerCase().includes(value.toLowerCase()))
      setLocationSuggestions(mockSuggestions)
      setShowLocationDropdown(true)
    } else {
      setShowLocationDropdown(false)
    }
  }

  const selectLocation = (location: string) => {
    updateFormData('location', location)
    setShowLocationDropdown(false)
  }

  const renderStepContent = () => {
    const stepId = steps[currentStep].id

    switch (stepId) {
      case 'project-type':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What type of project are you planning?
            </h2>
            <p className="text-gray-600 mb-6">Choose the service that best fits your needs</p>
            <div className="grid gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon
                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData('projectType', type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      formData.projectType === type.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        formData.projectType === type.id ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-gray-100'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{type.label}</h3>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                      {formData.projectType === type.id && (
                        <Check className="w-6 h-6 text-amber-600 mt-1" />
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )

      case 'budget':
        const budgetOptions = budgetRanges[formData.projectType as keyof typeof budgetRanges] || []
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What&apos;s your budget range?
            </h2>
            <p className="text-gray-600 mb-6">This helps us provide accurate recommendations</p>
            <div className="grid gap-4">
              {budgetOptions.map((budget) => (
                <motion.button
                  key={budget.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('budget', budget.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.budget === budget.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{budget.label}</h3>
                      <p className="text-gray-600 text-sm">{budget.description}</p>
                    </div>
                    {formData.budget === budget.id && (
                      <Check className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'rooms':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              How many rooms need interior work?
            </h2>
            <p className="text-gray-600 mb-6">Include bedrooms, living room, kitchen, etc.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[2, 3, 4, 5].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateFormData('rooms', num)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.rooms === num
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-2xl font-semibold">{num}{num === 5 && '+'}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'style':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What&apos;s your preferred style?
            </h2>
            <p className="text-gray-600 mb-6">Choose the aesthetic that resonates with you</p>
            <div className="grid gap-4">
              {styles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('style', style.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.style === style.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{style.label}</h3>
                      <p className="text-gray-600 text-sm">{style.description}</p>
                    </div>
                    {formData.style === style.id && (
                      <Check className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'area':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              What&apos;s your plot area?
            </h2>
            <p className="text-gray-600 mb-6">Enter the area in square feet</p>
            <input
              type="text"
              placeholder="e.g., 1200 sq ft"
              value={formData.area || ''}
              onChange={(e) => updateFormData('area', e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        )

      case 'location':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Where is your project located?
            </h2>
            <p className="text-gray-600 mb-6">Enter your area or locality</p>
            <div className="relative">
              <div className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-200 focus-within:border-amber-500 transition-colors bg-white">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Start typing your location..."
                  value={formData.location || ''}
                  onChange={(e) => handleLocationInput(e.target.value)}
                  onFocus={() => formData.location && setShowLocationDropdown(true)}
                  className="flex-1 outline-none text-lg"
                />
              </div>
              
              <AnimatePresence>
                {showLocationDropdown && locationSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-10"
                  >
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => selectLocation(suggestion)}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              When do you want to start?
            </h2>
            <p className="text-gray-600 mb-6">Select your preferred timeline</p>
            <div className="grid gap-4">
              {timelines.map((timeline) => (
                <motion.button
                  key={timeline.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('timeline', timeline.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between ${
                    formData.timeline === timeline.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{timeline.label}</span>
                  </div>
                  {formData.timeline === timeline.id && (
                    <Check className="w-6 h-6 text-amber-600" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Almost done! Let&apos;s get your details
            </h2>
            <p className="text-gray-600 mb-6">We&apos;ll contact you within 30 minutes</p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`w-full px-6 py-4 text-lg rounded-2xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                  } focus:outline-none transition-colors`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 ml-2">{errors.name}</p>
                )}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-6 py-4 text-lg rounded-2xl border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                  } focus:outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 ml-2">{errors.email}</p>
                )}
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full px-6 py-4 text-lg rounded-2xl border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'
                  } focus:outline-none transition-colors`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2 ml-2">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isNextDisabled = () => {
    const stepId = steps[currentStep].id
    switch (stepId) {
      case 'project-type': return !formData.projectType
      case 'budget': return !formData.budget
      case 'location': return !formData.location
      case 'timeline': return !formData.timeline
      case 'rooms': return !formData.rooms
      case 'style': return !formData.style
      case 'area': return !formData.area
      case 'contact': return !formData.name || !formData.email || !formData.phone
      default: return false
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Subtle brand gradient overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full blur-3xl" />
      </div>
      
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-6 justify-center">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-600">Sahara Developers</span>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        {currentStep > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="px-8 py-4 rounded-full border-2 border-gray-300 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={isNextDisabled()}
          className={`flex-1 px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
            isNextDisabled()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 hover:shadow-lg'
          }`}
        >
          {currentStep === totalSteps - 1 ? (
            <>
              Submit
              <Check className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}