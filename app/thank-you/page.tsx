"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Phone, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ThankYouPage() {
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your quote request has been received successfully.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>
          
          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Call</h3>
                <p className="text-gray-600">Our expert will call you within 2 hours to understand your requirements.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free Site Visit</h3>
                <p className="text-gray-600">We'll schedule a convenient time for a free site inspection.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Detailed Quote</h3>
                <p className="text-gray-600">Receive a transparent, itemized quote with no hidden costs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 mb-8">
          <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <p className="font-semibold text-lg mb-2">Can't Wait?</p>
          <p className="text-gray-700 mb-4">Call us directly for immediate assistance</p>
          <a href="tel:+919591837216" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            <Phone className="h-5 w-5" />
            +91 9591-837216
          </a>
        </div>

        <div className="space-y-4">
          <Link href="/projects">
            <Button variant="outline" className="w-full sm:w-auto">
              View Our Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Have questions? Check our <Link href="/faq" className="text-blue-600 hover:underline">FAQ page</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}