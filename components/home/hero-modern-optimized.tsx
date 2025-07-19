"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroModernOptimized() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <section className="relative flex items-center bg-white pt-20 pb-8 md:pt-20 md:pb-16 lg:min-h-[85vh] overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-amber-50/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sahara-primary/5 via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Content - Left aligned, compact */}
          <div 
            className={`max-w-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#B85600] rounded-full"></span>
              <span className="text-xs font-medium text-gray-700">20+ Years of Excellence</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
              Build Your Dream
              <span className="block font-normal bg-gradient-to-r from-[#B85600] to-[#DC7F00] bg-clip-text text-transparent">
                With Excellence
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-4 mb-6">
              Premium construction & interior solutions powered by innovation, 
              delivered with 20+ years of expertise in Bangalore.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/quote" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B85600] text-white rounded-full hover:bg-[#A04A00] transition-all duration-300 font-medium text-sm w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/gallery" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 border border-gray-300 font-medium text-sm w-full sm:w-auto"
              >
                <Play className="w-4 h-4" />
                View Portfolio
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
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
            </div>
          </div>
          
          {/* Image - Clean, aligned */}
          <div 
            className={`relative max-w-xl mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=90"
                  alt="Modern Architecture"
                  width={600}
                  height={400}
                  className="w-full h-[300px] lg:h-[350px] object-cover"
                  priority
                  loading="eager"
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
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="relative rounded-xl overflow-hidden shadow-lg h-[120px] sm:h-[140px] lg:h-[160px]">
                  <Image
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=90"
                    alt="Interior Design"
                    width={250}
                    height={160}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg h-[120px] sm:h-[140px] lg:h-[160px]">
                  <Image
                    src="https://images.unsplash.com/photo-1565623006066-82f23c79210b?w=400&q=90"
                    alt="Luxury Interior"
                    width={250}
                    height={160}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Floating accent card */}
              <div className="hidden sm:block absolute bottom-4 left-4 bg-white rounded-xl shadow-xl p-3 max-w-[180px] z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D26700]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#D26700] text-lg font-semibold">A+</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Energy Rating</p>
                    <p className="text-xs text-gray-500">Sustainable Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}