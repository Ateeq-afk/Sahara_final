"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './logo'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Showcase', href: '/showcase' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-auto" />
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Quick Call Button */}
            <a
              href="tel:+919591837216"
              className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click', {
                    event_category: 'mobile_nav',
                    event_label: 'quick_call'
                  })
                }
              }}
            >
              <Phone className="h-5 w-5" />
            </a>
            
            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl z-50 safe-area-top safe-area-bottom"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* CTA Buttons */}
              <div className="p-4 space-y-3 border-t">
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'click', {
                        event_category: 'mobile_nav',
                        event_label: 'get_quote'
                      })
                    }
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  Get Free Quote
                </Link>
                
                <a
                  href="tel:+919591837216"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </div>
              
              {/* Contact Info */}
              <div className="p-4 bg-gray-50">
                <p className="text-sm text-gray-600 text-center">
                  Mon-Sat: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-gray-600 text-center mt-1">
                  <a href="tel:+919591837216" className="text-blue-600 font-medium">
                    +91 9591-837216
                  </a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}