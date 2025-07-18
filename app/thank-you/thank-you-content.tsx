"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Phone, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  
  useEffect(() => {
    // Track thank you page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Thank You',
        page_location: window.location.href,
        source: source || 'direct'
      })
    }
  }, [source])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Submission!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your request and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Initial Contact</h3>
              <p className="text-sm text-gray-600">
                Our team will call you within 24 hours to discuss your requirements
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 rounded-full p-3 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Site Visit</h3>
              <p className="text-sm text-gray-600">
                We'll schedule a convenient time to visit and assess your project
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-full p-3 mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Detailed Quote</h3>
              <p className="text-sm text-gray-600">
                Within 3-5 days, you'll receive a comprehensive project quote
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Home
            </Button>
          </Link>
          <Link href="/gallery">
            <Button size="lg">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-gray-600"
        >
          <p>Need immediate assistance? Call us at</p>
          <a href="tel:+919591837216" className="text-blue-600 font-semibold hover:underline">
            +91 9591837216
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}