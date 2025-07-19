"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, Mail, Plus, X } from 'lucide-react'

export default function UnifiedFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Only show on mobile
  if (!isMobile) return null

  const buttons = [
    {
      id: 'phone',
      icon: Phone,
      label: 'Call',
      href: 'tel:+919591837216',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/919591837216?text=Hi!%20I\'m%20interested%20in%20starting%20a%20project%20with%20Sahara%20Developers',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      target: '_blank'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      href: 'mailto:info@saharadevelopers.in',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    }
  ]

  return (
    <div className="fixed bottom-20 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3"
          >
            {buttons.map((button, index) => {
              const Icon = button.icon
              return (
                <motion.a
                  key={button.id}
                  href={button.href}
                  target={button.target}
                  rel={button.target ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-full shadow-lg 
                    ${button.color} ${button.hoverColor} text-white
                    transition-all duration-300 hover:shadow-xl
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium whitespace-nowrap">{button.label}</span>
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-lg
          ${isOpen ? 'bg-gray-600' : 'bg-sahara-primary'} 
          text-white transition-all duration-300 hover:shadow-xl
        `}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  )
}