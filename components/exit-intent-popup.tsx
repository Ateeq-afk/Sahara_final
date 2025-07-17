'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, CheckCircle } from 'lucide-react'

const MODAL_STORAGE_KEY = 'exitIntentModalSeen'
const MODAL_EXPIRY_DAYS = 3

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  // Check if modal should be shown based on localStorage
  const shouldShowModal = () => {
    if (typeof window === 'undefined') return false
    
    const stored = localStorage.getItem(MODAL_STORAGE_KEY)
    if (!stored) return true
    
    const { timestamp } = JSON.parse(stored)
    const now = Date.now()
    const threeDaysInMs = MODAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    
    return now - timestamp > threeDaysInMs
  }

  // Store modal seen flag with timestamp
  const setModalSeen = () => {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(MODAL_STORAGE_KEY, JSON.stringify({
      timestamp: Date.now(),
      seen: true
    }))
  }

  // Track scroll progress
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main effect for modal triggers
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (hasShown || !shouldShowModal()) return

    let triggered = false

    // Delayed trigger (12-15 seconds)
    const delayTimeout = setTimeout(() => {
      if (!triggered && !hasShown) {
        triggered = true
        setIsOpen(true)
        setHasShown(true)
        setModalSeen()
      }
    }, 13000) // 13 seconds

    // Scroll depth trigger (40%)
    const checkScrollDepth = () => {
      if (scrollProgress >= 40 && !triggered && !hasShown) {
        triggered = true
        setIsOpen(true)
        setHasShown(true)
        setModalSeen()
      }
    }

    // Check scroll depth on each scroll update
    checkScrollDepth()

    // Exit intent trigger (mouse leave from top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered && !hasShown) {
        triggered = true
        setIsOpen(true)
        setHasShown(true)
        setModalSeen()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(delayTimeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown, scrollProgress])

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

  const handleClose = () => {
    setIsOpen(false)
    setModalSeen()
  }

  const handleMaybeLater = () => {
    setIsOpen(false)
    // Don't set the permanent flag, allow it to show again later
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Apple-style backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            aria-hidden="true"
          />

          {/* Apple-style modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed bottom-6 right-6 w-full max-w-sm z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="apple-glass rounded-3xl overflow-hidden border border-gray-200/20 shadow-2xl">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                {/* Controls */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <button
                    onClick={handleMaybeLater}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 px-2 py-1"
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 bg-gray-100/50 hover:bg-gray-200/50 rounded-full flex items-center justify-center transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {!isSuccess ? (
                  <>
                    <h3 id="modal-title" className="apple-title-text text-gray-900 mb-2 pr-16">
                      Get expert advice
                    </h3>
                    <p id="modal-description" className="apple-body text-gray-500 leading-relaxed">
                      Free consultation with our construction specialists
                    </p>
                  </>
                ) : (
                  <div className="text-center py-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </motion.div>
                    <h3 className="apple-headline-text text-gray-900 mb-1">Thank you</h3>
                    <p className="apple-caption text-gray-500">
                      We'll call you within 30 minutes
                    </p>
                  </div>
                )}
              </div>

              {/* Form */}
              {!isSuccess && (
                <div className="px-6 pb-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address (optional)"
                        className="apple-input w-full h-11 text-[16px] bg-gray-50/80 border-gray-200/50 focus:bg-white focus:border-gray-300 transition-all duration-200"
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        required
                        className="apple-input w-full h-11 text-[16px] bg-gray-50/80 border-gray-200/50 focus:bg-white focus:border-gray-300 transition-all duration-200"
                        style={{ fontSize: '16px' }} // Prevent iOS zoom
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !phone}
                        className="apple-button apple-button-primary w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>Request callback</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Reassurance */}
                  <div className="mt-4 pt-4 border-t border-gray-200/30">
                    <p className="apple-caption text-center text-gray-500">
                      We'll only call if you request. No spam.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}