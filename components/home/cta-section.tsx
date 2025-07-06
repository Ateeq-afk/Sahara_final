"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Large Typography */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-[-0.03em]">
            Let's create something
            <br />
            extraordinary together
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Begin your journey with Sahara. Where vision meets craftsmanship,
            and dreams become reality.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quote"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Schedule Consultation
              </Link>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Call Us</p>
              <p className="text-xl">+91 98450 12345</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Email</p>
              <p className="text-xl">hello@sahara.com</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Visit</p>
              <p className="text-xl">Bangalore, India</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}