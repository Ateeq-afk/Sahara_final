"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

const services = [
  {
    title: "Construction",
    slug: "construction",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=90",
    description: "Architectural excellence meets precision engineering in every project we undertake.",
    features: [
      "Luxury Residential Construction",
      "Premium Commercial Buildings",
      "Architectural Planning & Design",
      "Advanced Structural Engineering",
      "End-to-End Project Management"
    ],
    accent: "from-amber-600 to-amber-800"
  },
  {
    title: "Interior Design",
    slug: "interior-decor",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=90",
    description: "Curating spaces that reflect your personality while embracing timeless elegance.",
    features: [
      "Bespoke Residential Interiors",
      "Corporate Space Design",
      "Strategic Space Planning",
      "Custom Furniture Creation",
      "Art & Decor Curation"
    ],
    accent: "from-stone-600 to-stone-800"
  },
  {
    title: "Renovations",
    slug: "renovations",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=90",
    description: "Breathing new life into existing spaces with thoughtful design and modern functionality.",
    features: [
      "Complete Structural Renovations",
      "Luxury Kitchen Remodeling",
      "Spa-Inspired Bathrooms",
      "Intelligent Space Optimization",
      "Heritage Restoration"
    ],
    accent: "from-gray-700 to-gray-900"
  },
  {
    title: "Turnkey Projects",
    slug: "turnkey",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90",
    description: "Seamless project delivery from concept to keys, with uncompromising attention to detail.",
    features: [
      "Complete Project Lifecycle",
      "Integrated Design & Build",
      "Premium Material Sourcing",
      "Quality Control & Assurance",
      "On-Time, On-Budget Delivery"
    ],
    accent: "from-amber-700 to-amber-900"
  }
]

export default function ServicesPage() {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const ctaRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <section ref={heroRef} className="relative pt-32 pb-32 overflow-hidden bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <span className="text-amber-600 font-semibold text-lg">
                Our Expertise
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-[6rem] font-semibold mb-8 tracking-tight leading-[0.9]"
            >
              Crafting excellence,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                delivering
              </span>
              <br />
              dreams.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl font-light"
            >
              From groundbreaking architecture to breathtaking interiors, we offer comprehensive 
              solutions that transform visions into extraordinary realities.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid - Apple Style */}
      <section ref={servicesRef} className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              What we do.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to bring your vision to life.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative h-[400px] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Service Number */}
                      <div className="absolute top-8 left-8">
                        <span className="text-white/90 text-5xl font-light">
                          0{index + 1}
                        </span>
                      </div>
                      
                      {/* Service Title Overlay */}
                      <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-3xl font-semibold text-white mb-2">
                          {service.title}
                        </h3>
                        <div className="w-12 h-1 bg-amber-500 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2.5 shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-gray-500 text-sm">
                            +{service.features.length - 3} more services
                          </li>
                        )}
                      </ul>
                      
                      <div className="inline-flex items-center gap-2 text-amber-600 font-medium group-hover:gap-3 transition-all duration-300">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Apple Style */}
      <section ref={ctaRef} className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Our experts will guide you through every step, ensuring your vision 
              becomes a reality that exceeds expectations.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/quote"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-medium text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            <p className="text-gray-500 mt-8">
              No obligations. Just possibilities.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}