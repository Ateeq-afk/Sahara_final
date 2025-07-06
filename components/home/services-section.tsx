"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: '01',
    title: 'Architecture',
    subtitle: 'Visionary Design',
    description: 'Creating architectural masterpieces that blend form, function, and sustainability.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90',
    color: 'from-gray-900 to-gray-700',
  },
  {
    id: '02',
    title: 'Interior Design',
    subtitle: 'Curated Spaces',
    description: 'Transforming interiors into expressions of refined taste and purposeful living.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90',
    color: 'from-amber-900 to-amber-700',
  },
  {
    id: '03',
    title: 'Construction',
    subtitle: 'Precision Building',
    description: 'Executing projects with meticulous attention to craftsmanship and quality.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=90',
    color: 'from-stone-800 to-stone-600',
  },
  {
    id: '04',
    title: 'Renovation',
    subtitle: 'Thoughtful Revival',
    description: 'Breathing new life into existing spaces while honoring their inherent character.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1600&q=90',
    color: 'from-slate-800 to-slate-600',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Our Services
          </span>
          <h2 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 tracking-[-0.03em]">
            Excellence in Every Detail
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a complete ecosystem of services, seamlessly integrated to deliver exceptional results from concept to completion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative"
            >
              <Link href={`/services/${service.title.toLowerCase().replace(' ', '-')}`}>
                <div className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer">
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div>
                      <span className="text-white/80 text-6xl font-light">{service.id}</span>
                    </div>
                    
                    <div>
                      <p className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase mb-2">
                        {service.subtitle}
                      </p>
                      <h3 className="text-4xl font-semibold text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-lg mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Arrow */}
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: hoveredService === service.id ? 10 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center text-white font-medium"
                      >
                        <span className="mr-2">Explore</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}