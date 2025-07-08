'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Smartphone, 
  Box, 
  Camera, 
  Move3d,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ARExperienceSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: 'View in 3D',
      description: 'Explore every angle of your future home with photo-realistic models',
      icon: Box,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    {
      title: 'Place in AR',
      description: 'See how properties look in your actual space using your phone',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    {
      title: 'Virtual Tours',
      description: 'Walk through completed projects from the comfort of your home',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Revolutionary Technology</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              See it.
              <span className="text-purple-600"> Before you build it.</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Experience your dream project in stunning detail with our cutting-edge AR and 3D visualization tools.
            </p>

            {/* Feature Tabs */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    onClick={() => setActiveFeature(index)}
                    className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                      activeFeature === index
                        ? 'bg-purple-50 border-2 border-purple-200'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-purple-600"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/showcase-3d">
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Try 3D Viewer
                </Button>
              </Link>
              <Link href="/showcase">
                <Button size="lg" variant="outline" className="gap-2">
                  View Gallery
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i}K+
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">10,000+ virtual tours</span> completed this year
              </p>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 border-0">
              <div className="relative aspect-square">
                {/* Main Image */}
                <motion.img
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* AR Interface Mock */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-64 h-64 border-4 border-white/30 rounded-3xl"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  >
                    <Move3d className="h-12 w-12 text-white" />
                  </motion.div>
                </div>
                
                {/* Feature Labels */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {features[activeFeature].title} Mode
                      </h4>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-gray-500">Models</p>
                        <p className="font-bold">247</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Views</p>
                        <p className="font-bold">18.5K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Rating</p>
                        <p className="font-bold">4.9★</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-xl"
            >
              <p className="text-sm font-semibold">New Feature</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}