'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Clock, PhoneCall, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return
    }
    
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    let timeoutId: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !hasShown) {
        timeoutId = setTimeout(() => {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem('exitIntentShown', 'true')
        }, 100)
      }
    }

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Mobile exit intent - when user scrolls up quickly
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity = lastScrollY - currentScrollY
      
      // If scrolling up quickly near top of page
      if (scrollVelocity > 50 && currentScrollY < 200 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
      
      lastScrollY = currentScrollY
    }

    // Only add scroll listener on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email && !phone) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/exit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || null,
          phone: phone || null,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left side - Image/Graphic */}
                <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-8 md:p-12 flex flex-col justify-center">
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6"
                    >
                      <Gift className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Wait! Don't Go Empty-Handed
                    </h2>
                    
                    <div className="space-y-3 text-white/90">
                      <div className="flex items-center gap-3">
                        <Calculator className="w-5 h-5" />
                        <span>Free Cost Estimation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" />
                        <span>15-Minute Consultation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneCall className="w-5 h-5" />
                        <span>Priority Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }} />
                  </div>
                </div>

                {/* Right side - Form */}
                <div className="p-8 md:p-12">
                  {!isSuccess ? (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        Get Your Free Consultation
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Leave your details and our expert will call you within 30 minutes!
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address (optional)"
                            className="rounded-xl"
                          />
                        </div>

                        <div>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number *"
                            required
                            className="rounded-xl"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || !phone}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </div>
                          ) : (
                            'Get Free Consultation'
                          )}
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          No spam, just helpful construction advice
                        </p>
                      </form>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                          🎁 <strong>Limited Offer:</strong> First 50 callers get 10% off on their project
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600">
                        Our expert will call you within 30 minutes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}