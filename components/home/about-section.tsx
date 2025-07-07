"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    title: "Design Excellence",
    description: "Every detail matters. We obsess over proportions, materials, and finishes to create spaces that inspire.",
    icon: "✨",
  },
  {
    title: "Crafted Quality",
    description: "Partnering with master artisans who share our commitment to exceptional workmanship and timeless beauty.",
    icon: "⚡",
  },
  {
    title: "Client Partnership",
    description: "Your vision guides our process. We listen, collaborate, and refine until every element exceeds expectations.",
    icon: "🤝",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const imageRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
                Defining luxury
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  through design.
                </span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed font-normal"
            >
              For over two decades, Sahara has been at the forefront of luxury interior design 
              and construction in Bangalore. We don't just create spaces — we craft experiences 
              that elevate everyday living.
            </motion.p>

            <div className="space-y-0">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group py-6 border-b border-gray-200 last:border-0 cursor-pointer"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-1">{value.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300"
              >
                Learn more about our story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:pl-8"
          >
            <motion.div 
              className="relative"
              style={{ y: imageY, scale: imageScale }}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=90"
                  alt="Luxury Interior Design Process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Card - Apple Style */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 lg:-left-16"
              >
                <div className="bg-white/90 backdrop-blur-xl backdrop-saturate-200 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900">500+</span>
                    <span className="text-base sm:text-lg text-gray-600 font-normal">projects</span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-[200px]">
                    Transforming visions into exceptional living spaces
                  </p>
                </div>
              </motion.div>

              {/* Small Accent Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -top-6 -right-4 sm:-right-8"
              >
                <div className="bg-gray-900 text-white p-3 sm:p-4 rounded-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium">Award Winning</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}