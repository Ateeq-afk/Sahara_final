"use client"

import './premium-support-widget.css'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  FileText, 
  Calendar, 
  Package, 
  Home,
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PremiumSupportWidgetProps {
  className?: string
}

const PremiumSupportWidget = ({ className = "" }: PremiumSupportWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Auto-minimize after 10 seconds of inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isOpen && !isMinimized) {
      timer = setTimeout(() => {
        setIsMinimized(true)
      }, 10000)
    }
    return () => clearTimeout(timer)
  }, [isOpen, isMinimized])

  const handleAction = (action: string) => {
    switch (action) {
      case 'quote':
        window.location.href = '/quote'
        break
      case 'visit':
        window.location.href = '/quote?service=site-visit'
        break
      case 'packages':
        window.location.href = '/packages'
        break
      case 'projects':
        window.location.href = '/gallery'
        break
      case 'whatsapp':
        openWhatsApp()
        break
      default:
        break
    }
    setIsOpen(false)
  }

  const openWhatsApp = () => {
    const whatsappNumber = "+919591837216"
    const message = "Hi! I'd like to speak with your team about construction services."
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
  }

  const actions = [
    {
      id: 'quote',
      icon: FileText,
      label: 'Request a Quote',
      description: 'Get detailed pricing for your project'
    },
    {
      id: 'visit',
      icon: Calendar,
      label: 'Schedule a Site Visit',
      description: 'Book a free consultation'
    },
    {
      id: 'packages',
      icon: Package,
      label: 'Explore Packages',
      description: 'View our construction packages'
    },
    {
      id: 'projects',
      icon: Home,
      label: 'View Our Projects',
      description: 'Browse our portfolio'
    }
  ]

  return (
    <div className={`fixed bottom-6 right-6 z-50 premium-support-widget ${className}`}>
      {/* Floating Support Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-14 h-14 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200"
          >
            <MessageCircle className="h-6 w-6 text-gray-700 group-hover:text-orange-500 transition-colors duration-200" />
            
            {/* Subtle pulse animation */}
            <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-20" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                Need help?
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-900 border-y-4 border-y-transparent" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Support Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.85 : 1, 
              y: isMinimized ? 10 : 0 
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden premium-support-card
              ${isMinimized ? 'opacity-60' : 'opacity-100'}
            `}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">How can we assist you?</h3>
                    <p className="text-xs text-gray-500">Online Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isMinimized && (
                    <button
                      onClick={() => setIsMinimized(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  <p className="text-sm text-gray-600 mb-4">
                    Quick actions or live chat — we're here to help.
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-2 mb-4">
                    {actions.map((action) => {
                      const Icon = action.icon
                      return (
                        <motion.button
                          key={action.id}
                          onClick={() => handleAction(action.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-orange-50 transition-colors">
                            <Icon className="h-4 w-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-gray-900">{action.label}</div>
                            <div className="text-xs text-gray-500">{action.description}</div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Chat CTA */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Need help deciding? Chat with our expert.
                    </p>
                    <Button
                      onClick={() => handleAction('whatsapp')}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 text-sm font-medium transition-all duration-200 hover:shadow-sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PremiumSupportWidget