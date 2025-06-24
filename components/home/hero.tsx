"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Users, Clock, Star } from 'lucide-react'

const stats = [
  { icon: Award, value: "20+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Clock, value: "100%", label: "On-Time Delivery" },
  { icon: Star, value: "4.8", label: "Client Rating" },
]

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="Luxury Interior Design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight"
          >
            <span className="block text-white mb-4">Transform Your Vision.</span>
            <span className="block text-primary-light">Build Your Dreams.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            From luxury homes to commercial spaces, we deliver exceptional construction 
            and interior design solutions in Bangalore. Your dream space awaits.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <Button
              asChild
              size="lg"
              className="h-16 px-10 text-lg bg-primary hover:bg-primary-dark text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/quote" className="flex items-center">
                Get Free Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-16 px-10 text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/gallery">View Our Portfolio</Link>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="h-8 w-8 text-primary-light mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}