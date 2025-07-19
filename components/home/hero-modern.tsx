"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroModern() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Subtle parallax effects
  const yTransform = useTransform(scrollY, [0, 300], [0, 50])
  const opacityTransform = useTransform(scrollY, [0, 200], [1, 0.8])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <section className="relative flex items-center bg-white pt-16 pb-12 md:pt-20 md:pb-16 lg:min-h-[85vh] overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-amber-50/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sahara-primary/5 via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - Left aligned, compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-xl"
          >
            {/* Badge - Smaller, refined */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-[#D26700] rounded-full"></span>
              <span className="text-xs font-medium text-gray-700">20+ Years of Excellence</span>
            </motion.div>
            
            {/* Headline - Tighter, more elegant */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight"
            >
              Build Your Dream
              <span className="block font-normal bg-gradient-to-r from-[#D26700] to-[#F59E0B] bg-clip-text text-transparent">
                With Excellence
              </span>
            </motion.h1>
            
            {/* Description - Concise */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed mt-4 mb-6"
            >
              Premium construction & interior solutions powered by innovation, 
              delivered with 20+ years of expertise in Bangalore.
            </motion.p>
            
            {/* CTA Buttons - Tighter spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link 
                href="/quote" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D26700] text-white rounded-full hover:bg-[#B85600] transition-all duration-300 font-medium text-sm"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/gallery" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 border border-gray-300 font-medium text-sm"
              >
                <Play className="w-4 h-4" />
                View Portfolio
              </Link>
            </motion.div>
            
            {/* Stats - Compact, refined */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-900">500+</div>
                <div className="text-sm text-gray-500 mt-1">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">50+</div>
                <div className="text-sm text-gray-500 mt-1">Experts</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">100%</div>
                <div className="text-sm text-gray-500 mt-1">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image - Clean, aligned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-w-2xl mx-auto lg:mx-0"
            style={{ opacity: opacityTransform }}
          >
            <motion.div 
              className="relative"
              style={{ y: mounted ? yTransform : 0 }}
            >
              {/* Main Image - Clean presentation */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90"
                  alt="Modern Architecture"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-semibold text-xl">Luxury Villa, Koramangala</p>
                  <p className="text-white/90 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Currently Under Construction
                  </p>
                </div>
              </div>
              
              {/* Small Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=90"
                    alt="Interior Design"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1565623006066-82f23c79210b?w=400&q=90"
                    alt="Luxury Interior"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D26700]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#D26700] text-lg font-semibold">A+</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Energy Rating</p>
                    <p className="text-xs text-gray-500">Sustainable Design</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 0.6 : 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:block hidden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [2, 10, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}