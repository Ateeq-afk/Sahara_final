'use client'

import { Suspense, lazy } from 'react'
import { Html, useProgress } from '@react-three/drei'
import { motion } from 'framer-motion'

// Lazy load 3D models for better performance
export const HouseModel3D = lazy(() => 
  import('./house-model-3d').then(module => ({ default: module.HouseModel3D }))
)

export const VillaModel3D = lazy(() => 
  import('./house-model-3d').then(module => ({ default: module.VillaModel3D }))
)

export const CommercialModel3D = lazy(() => 
  import('./house-model-3d').then(module => ({ default: module.CommercialModel3D }))
)

// Enhanced loader with progress animation
export function ModelLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mb-4"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="#8B7355"
              strokeWidth="4"
              fill="none"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * progress) / 100}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-sahara-primary/10 rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-sahara-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {active ? 'Loading 3D Model' : 'Preparing Scene'}
          </p>
          <p className="text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </p>
          {item && (
            <p className="text-xs text-gray-500 mt-1">
              Loading: {item}
            </p>
          )}
        </motion.div>
        
        {/* Loading tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-xs text-gray-500 text-center max-w-xs"
        >
          <p>Tip: Use mouse to rotate, scroll to zoom</p>
        </motion.div>
      </div>
    </Html>
  )
}

// Fallback component for Suspense
export function ModelFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#f0f0f0" wireframe />
    </mesh>
  )
}

// Performance monitoring component
export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ModelLoader />}>
      {children}
    </Suspense>
  )
}