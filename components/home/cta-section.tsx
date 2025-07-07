"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent" />
      </motion.div>
      
      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
          style={{ opacity }}
        >
          {/* Large Typography - Apple Style */}
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[0.95]"
          >
            Let's create something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
              extraordinary together.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Begin your journey with Sahara. Where vision meets craftsmanship,
            and dreams become reality.
          </motion.p>

          {/* CTA Buttons - Apple Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-medium border border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              Schedule Consultation
            </Link>
          </motion.div>

          {/* Contact Info - Refined */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center"
          >
            <a 
              href="tel:+919591837216" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Call</p>
                <p className="font-medium">+91 9591 837216</p>
              </div>
            </a>
            
            <a 
              href="mailto:saharadevelopers96@gmail.com" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="font-medium">saharadevelopers96@gmail.com</p>
              </div>
            </a>
            
            <Link 
              href="/contact" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Visit</p>
                <p className="font-medium">Bangalore, India</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}