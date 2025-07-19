'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports to reduce initial bundle size
const TimelineEstimatorDesktop = dynamic(
  () => import('./timeline-estimator-ai'),
  { 
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Timeline Estimator...</p>
        </div>
      </div>
    )
  }
)

const TimelineEstimatorMobile = dynamic(
  () => import('./timeline-estimator-mobile'),
  { 
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Timeline Estimator...</p>
        </div>
      </div>
    )
  }
)

export default function TimelineEstimatorWrapper() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Also check for touch device
  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsMobile(true)
    }
  }, [])

  return isMobile ? <TimelineEstimatorMobile /> : <TimelineEstimatorDesktop />
}