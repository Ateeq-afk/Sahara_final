"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 50% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setIsVisible(scrollPercentage > 30)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      // Focus the expanded menu
      setTimeout(() => {
        expandedRef.current?.focus()
      }, 100)
      // Track engagement
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'engagement', {
          event_category: 'floating_cta',
          event_label: 'expanded'
        })
      }
    }
  }

  const handleClose = () => {
    setIsExpanded(false)
    // Return focus to trigger button
    setTimeout(() => {
      triggerRef.current?.focus()
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isExpanded) {
      handleClose()
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed bottom-6 right-6 z-40"
        >
          {!isExpanded ? (
            // Collapsed state - single button
            <motion.button
              ref={triggerRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              aria-label="Open contact options menu"
              aria-expanded={isExpanded}
              aria-haspopup="menu"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          ) : (
            // Expanded state - multiple options
            <motion.div
              ref={expandedRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-4 space-y-3 min-w-[200px]"
              role="menu"
              aria-label="Contact options"
              tabIndex={-1}
              onKeyDown={handleKeyDown}
            >
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Close contact options menu"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-sm font-semibold text-gray-900 mb-3">
                How can we help?
              </p>

              <Link href="/quote" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'click', {
                        event_category: 'floating_cta',
                        event_label: 'get_quote'
                      })
                    }
                  }}
                  role="menuitem"
                  aria-label="Get free quote for your project"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Free Quote
                </Button>
              </Link>

              <a href="tel:+919591837216" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'click', {
                        event_category: 'floating_cta',
                        event_label: 'call_now'
                      })
                    }
                  }}
                  role="menuitem"
                  aria-label="Call us now at +91 9591 837216"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>

              <Link href="/contact" className="block">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:from-blue-700 focus:to-blue-800 focus:ring-2 focus:ring-blue-300"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'click', {
                        event_category: 'floating_cta',
                        event_label: 'contact'
                      })
                    }
                  }}
                  role="menuitem"
                  aria-label="Go to contact page"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}