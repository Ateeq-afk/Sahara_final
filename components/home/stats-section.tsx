"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Home, Users, Calendar, Ruler } from 'lucide-react'

const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Homes built with precision',
    icon: Home,
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 2,
    value: 1000,
    suffix: '+',
    label: 'Happy Families',
    description: 'Trust us with their dreams',
    icon: Users,
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 3,
    value: 20,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Industry experience',
    icon: Calendar,
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 4,
    value: 5,
    suffix: 'M+',
    label: 'Sq Ft Constructed',
    description: 'Spaces transformed',
    icon: Ruler,
    color: 'from-orange-600 to-orange-700'
  }
]

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isInView && isClient) {
      const startTime = Date.now()
      const endValue = value

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(easeOutQuart * endValue)
        
        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [isInView, value, duration, isClient])

  // Show the final value immediately on server and initial client render
  // Animation will start after hydration
  return (
    <span ref={ref}>
      {isClient && isInView ? count.toLocaleString() : value.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern - Removed for better contrast */}

      {/* Gradient Orbs - Made more subtle */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Building Trust Through
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Proven Excellence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Two decades of transforming visions into architectural masterpieces across Bangalore
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="text-center">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex mb-6"
                  >
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${stat.color} p-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  {/* Number */}
                  <div className="mb-3">
                    <span className="text-5xl md:text-6xl font-bold text-gray-900">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-700 font-medium">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-6 font-medium">
            Join hundreds of satisfied homeowners who trusted us with their dreams
          </p>
          <motion.a
            href="/quote"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}