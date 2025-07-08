'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneCall } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClickToCallProps {
  variant?: 'default' | 'floating' | 'inline' | 'hero'
  className?: string
  phoneNumber?: string
  label?: string
  showIcon?: boolean
}

export function ClickToCall({
  variant = 'default',
  className,
  phoneNumber = '+919591837216',
  label = 'Call Now',
  showIcon = true
}: ClickToCallProps) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  if (variant === 'floating') {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleCall}
        className="fixed bottom-32 right-6 z-40 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative p-4">
          <Phone className="w-6 h-6" />
          
          {/* Pulse effect */}
          <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-30" />
          
          {/* Ring animation */}
          <motion.div
            className="absolute -inset-2"
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              opacity: [0, 0.5, 0.5, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <div className="w-full h-full border-2 border-green-600 rounded-full" />
          </motion.div>
        </div>
      </motion.button>
    )
  }

  if (variant === 'hero') {
    return (
      <motion.button
        onClick={handleCall}
        className={cn(
          "group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showIcon && (
          <div className="relative">
            <PhoneCall className="w-6 h-6" />
            <motion.div
              className="absolute -inset-1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <PhoneCall className="w-6 h-6 opacity-50" />
            </motion.div>
          </div>
        )}
        <span>{label}</span>
        <span className="text-sm opacity-80">24/7 Support</span>
      </motion.button>
    )
  }

  if (variant === 'inline') {
    return (
      <motion.a
        href={`tel:${phoneNumber}`}
        className={cn(
          "inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group",
          className
        )}
        whileHover={{ x: 2 }}
      >
        {showIcon && <Phone className="w-4 h-4 group-hover:animate-pulse" />}
        <span className="underline decoration-dotted underline-offset-4">
          {phoneNumber.replace('+91', '+91 ')}
        </span>
      </motion.a>
    )
  }

  // Default button
  return (
    <motion.button
      onClick={handleCall}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {showIcon && <Phone className="w-5 h-5" />}
      <span>{label}</span>
    </motion.button>
  )
}

// Mobile-only sticky call bar
export function StickyCallBar() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  if (!isClient || !isMobile) return null
  
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-2xl"
    >
      <a
        href="tel:+919591837216"
        className="flex items-center justify-center gap-3"
      >
        <div className="relative">
          <Phone className="w-6 h-6" />
          <motion.div
            className="absolute -inset-1"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Phone className="w-6 h-6 opacity-50" />
          </motion.div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Call Now for Free Consultation</p>
          <p className="text-sm opacity-90">+91 9591-837216 • Available 24/7</p>
        </div>
      </a>
    </motion.div>
  )
}