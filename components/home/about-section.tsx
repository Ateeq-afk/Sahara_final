"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const values = [
  {
    title: "Design Excellence",
    description: "Every detail matters. We obsess over proportions, materials, and finishes to create spaces that inspire.",
  },
  {
    title: "Crafted Quality",
    description: "Partnering with master artisans who share our commitment to exceptional workmanship and timeless beauty.",
  },
  {
    title: "Client Partnership",
    description: "Your vision guides our process. We listen, collaborate, and refine until every element exceeds expectations.",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-8 tracking-[-0.03em]">
              Defining luxury
              <br />
              through design
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              For over two decades, Sahara has been at the forefront of luxury interior design 
              and construction in Bangalore. We don't just create spaces — we craft experiences 
              that elevate everyday living.
            </p>

            <div className="space-y-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="border-l-2 border-gray-200 pl-6 hover:border-gray-400 transition-colors duration-300"
                >
                  <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=90"
                alt="Luxury Interior Design Process"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-xl shadow-xl max-w-xs"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-semibold">500+</span>
                <span className="text-gray-600">projects</span>
              </div>
              <p className="text-sm text-gray-500">
                Transforming visions into reality across residential and commercial spaces
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}