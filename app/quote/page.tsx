"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import SmartQuoteForm from '@/components/smart-quote-form'
import './mobile-styles.css'

export default function QuotePage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)
  const { toast } = useToast()

  const handleFormComplete = async (formData: any) => {
    try {
      // Store the submitted data
      setSubmittedData(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setShowSuccess(true)
      toast({
        title: 'Quote Request Submitted!',
        description: 'We\'ll contact you within 30 minutes.',
        duration: 5000,
      })
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
        duration: 7000,
      })
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">Thank You!</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            We've received your project details and will prepare a personalized quote. 
            Our expert will contact you within 30 minutes.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:from-amber-600 hover:to-orange-700 transition-all hover:shadow-lg"
            >
              Return to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 opacity-90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Let's Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Amazing Together
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Get a personalized quote in minutes. No spam, no pressure — just expert guidance tailored to your vision.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-xs sm:text-sm text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">30min</div>
              <div className="text-xs sm:text-sm text-gray-600">Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">4.9★</div>
              <div className="text-xs sm:text-sm text-gray-600">Rating</div>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto quote-form-container"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <SmartQuoteForm onComplete={handleFormComplete} />
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>100% Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No Obligation</span>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              Questions? Call us at{' '}
              <a href="tel:+919591837216" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline block sm:inline mt-1 sm:mt-0">
                +91 95918 37216
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] rounded-full bg-gradient-to-br from-amber-100 to-transparent opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] rounded-full bg-gradient-to-tr from-orange-100 to-transparent opacity-20 blur-3xl" />
      </div>
    </div>
  )
}