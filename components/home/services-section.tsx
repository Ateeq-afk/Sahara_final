"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

const services = [
  {
    id: '01',
    title: 'Architecture',
    subtitle: 'Visionary Design',
    description: 'Creating architectural masterpieces that blend form, function, and sustainability.',
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1600&q=90',
    accent: '#1d1d1f',
    href: '/services/architecture',
  },
  {
    id: '02',
    title: 'Interior Design',
    subtitle: 'Curated Spaces',
    description: 'Transforming interiors into expressions of refined taste and purposeful living.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=90',
    accent: '#86868b',
    href: '/services/interior-decor',
  },
  {
    id: '03',
    title: 'Construction',
    subtitle: 'Precision Building',
    description: 'Executing projects with meticulous attention to craftsmanship and quality.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=90',
    accent: '#424245',
    href: '/services/construction',
  },
  {
    id: '04',
    title: 'Renovation',
    subtitle: 'Thoughtful Revival',
    description: 'Breathing new life into existing spaces while honoring their inherent character.',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=90',
    accent: '#6e6e73',
    href: '/services/renovations',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 bg-[#fbfbfd]">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
          style={{ opacity }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-4 sm:mb-6"
          >
            Our expertise.
            <br />
            <span className="text-gray-600">
              Your vision.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal"
          >
            A complete ecosystem of services, seamlessly integrated to deliver
            exceptional results from concept to completion.
          </motion.p>
        </motion.div>

        {/* Services - Mobile Grid */}
        <div className="sm:hidden grid grid-cols-1 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative"
              >
                <Link href={service.href}>
                  <div className="relative h-[300px] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer">
                    {/* Image with Parallax */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredService === service.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="85vw"
                        priority={index < 2}
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay - Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Service Number */}
                      <div className="flex justify-between items-start">
                        <span 
                          className="text-white/60 text-sm font-medium"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {service.id}
                        </span>
                        
                        {/* Plus Icon */}
                        <motion.div
                          animate={{
                            rotate: hoveredService === service.id ? 45 : 0,
                            scale: hoveredService === service.id ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Bottom Content */}
                      <div>
                        {/* Title */}
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/80 text-sm mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        {/* CTA */}
                        <motion.div
                          className="inline-flex items-center gap-2 text-white font-medium"
                          animate={{
                            gap: hoveredService === service.id ? '12px' : '8px'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-xs">Learn more</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Hover Accent Border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredService === service.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        border: `1px solid ${service.accent}20`,
                        boxShadow: `inset 0 0 0 1px ${service.accent}10`
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        {/* Services Grid - Tablet and Desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative"
            >
              <Link href={service.href}>
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 cursor-pointer">
                  {/* Image with Parallax */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredService === service.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay - Subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                    {/* Service Number */}
                    <div className="flex justify-between items-start">
                      <span 
                        className="text-white/60 text-sm font-medium"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {service.id}
                      </span>
                      
                      {/* Plus Icon */}
                      <motion.div
                        animate={{
                          rotate: hoveredService === service.id ? 45 : 0,
                          scale: hoveredService === service.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Bottom Content */}
                    <div>
                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-3">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* CTA */}
                      <motion.div
                        className="inline-flex items-center gap-2 text-white font-medium"
                        animate={{
                          gap: hoveredService === service.id ? '12px' : '8px'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-xs sm:text-sm">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Hover Accent Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredService === service.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      border: `1px solid ${service.accent}20`,
                      boxShadow: `inset 0 0 0 1px ${service.accent}10`
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 lg:mt-24"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-300 group"
          >
            <span>Explore all services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  )
}