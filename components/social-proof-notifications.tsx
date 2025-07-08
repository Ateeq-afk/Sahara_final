'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Home, Users, TrendingUp, X } from 'lucide-react'
import Image from 'next/image'

const notifications = [
  {
    id: 1,
    type: 'inquiry',
    name: 'Rahul M.',
    location: 'Whitefield',
    action: 'requested a quote',
    project: '4BHK Villa',
    time: '3 minutes ago',
    icon: Home,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'booking',
    name: 'Priya S.',
    location: 'Koramangala',
    action: 'booked a consultation',
    project: 'Interior Design',
    time: '8 minutes ago',
    icon: Calendar,
    color: 'bg-green-500'
  },
  {
    id: 3,
    type: 'signup',
    name: 'Amit K.',
    location: 'HSR Layout',
    action: 'downloaded cost guide',
    project: 'Construction Guide',
    time: '15 minutes ago',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    type: 'project',
    name: 'Sneha R.',
    location: 'Indiranagar',
    action: 'started their project',
    project: '3BHK Renovation',
    time: '22 minutes ago',
    icon: Users,
    color: 'bg-amber-500'
  },
  {
    id: 5,
    type: 'inquiry',
    name: 'Mohammed A.',
    location: 'Electronic City',
    action: 'requested site visit',
    project: 'Commercial Space',
    time: '28 minutes ago',
    icon: MapPin,
    color: 'bg-red-500'
  },
  {
    id: 6,
    type: 'booking',
    name: 'Lakshmi P.',
    location: 'Jayanagar',
    action: 'scheduled consultation',
    project: 'Home Renovation',
    time: '35 minutes ago',
    icon: Calendar,
    color: 'bg-indigo-500'
  }
]

export default function SocialProofNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Start showing notifications after 10 seconds
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(startTimeout)
  }, [])

  useEffect(() => {
    if (!hasStarted || isPaused) return

    const showNotification = () => {
      setIsVisible(true)
      
      // Hide after 5 seconds
      setTimeout(() => {
        if (!isPaused) {
          setIsVisible(false)
          
          // Show next notification after 1 second
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % notifications.length)
          }, 1000)
        }
      }, 5000)
    }

    // Show notification every 15 seconds
    const interval = setInterval(() => {
      if (!isPaused) {
        showNotification()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [hasStarted, isPaused, currentIndex])

  const currentNotification = notifications[currentIndex]
  const Icon = currentNotification.icon

  return (
    <AnimatePresence>
      {isVisible && hasStarted && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="fixed bottom-24 left-6 z-40 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header with live indicator */}
            <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-xs font-medium text-gray-600">Live Activity</span>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${currentNotification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{currentNotification.name}</span>
                    <span className="text-gray-600"> from </span>
                    <span className="font-medium">{currentNotification.location}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-0.5">
                    {currentNotification.action} for{' '}
                    <span className="font-medium text-gray-900">
                      {currentNotification.project}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {currentNotification.time}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "100%" : "100%" }}
                  transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3">
              <a
                href="/quote"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
              >
                Join 125+ homeowners today
                <svg
                  className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}