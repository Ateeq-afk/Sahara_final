"use client"

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=95",
    title: "Luxury Living",
    subtitle: "Contemporary Homes"
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=95",
    title: "Modern Design",
    subtitle: "Timeless Spaces"
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=95",
    title: "Elite Properties",
    subtitle: "Premium Construction"
  },
]

export default function HomeHero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const yTransform = useTransform(scrollY, [0, 800], [0, 300])
  const scaleTransform = useTransform(scrollY, [0, 800], [1, 1.2])
  const opacityTransform = useTransform(scrollY, [0, 600], [1, 0])
  const textYTransform = useTransform(scrollY, [0, 400], [0, -100])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x: x * 20, y: y * 20 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-cycle images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: yTransform,
          scale: scaleTransform
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={heroImages[currentImage].src}
              alt={`${heroImages[currentImage].title} - ${heroImages[currentImage].subtitle}`}
              fill
              className="object-cover"
              priority
              quality={95}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index
          const startX = (i * 5) % 100;
          const endX = ((i * 7) + 20) % 100;
          const duration = 20 + (i % 10) * 2;
          const delay = (i % 20);
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: startX + '%',
                y: '110%'
              }}
              animate={{ 
                y: '-10%',
                x: `${endX}%`
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ 
          opacity: opacityTransform,
          y: textYTransform,
          x: mousePosition.x,
          rotateY: mousePosition.x * 0.1,
          rotateX: mousePosition.y * -0.1
        }}
      >
        <div className="max-w-6xl">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wider">
                PREMIUM CONSTRUCTION & DESIGN
              </span>
            </div>
          </motion.div>

          {/* Dynamic Text Based on Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white/80 mb-2">
                {heroImages[currentImage].title}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Main Heading with Split Animation */}
          <div className="mb-8">
            <motion.h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-[0.9] tracking-tighter">
              {"Crafting".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateZ: 10 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + i * 0.05,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="inline-block"
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 leading-[0.9] tracking-tighter">
              {"Excellence".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateZ: -10 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + i * 0.05,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="inline-block"
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl font-light leading-relaxed"
          >
            Where architectural innovation meets timeless craftsmanship to create 
            <span className="text-white font-medium"> extraordinary living spaces</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12"
          >
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "20+", label: "Years Excellence" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 sm:h-16 px-6 sm:px-8 lg:px-10 text-base sm:text-lg bg-white text-black hover:bg-white/90 rounded-full font-medium transition-all duration-500 shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              <Link href="/quote" className="flex items-center gap-3">
                <span>Start Your Project</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="group h-14 sm:h-16 px-6 sm:px-8 lg:px-10 text-base sm:text-lg text-white hover:bg-white/10 rounded-full font-medium backdrop-blur-md transition-all duration-500 border-2 border-white/30 hover:border-white/60 hover:scale-105"
            >
              <Link href="/gallery" className="flex items-center gap-3">
                <Play className="h-5 w-5" />
                <span>View Portfolio</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-sm uppercase tracking-wider">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>

      {/* Enhanced Image Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 lg:right-12 flex items-center gap-3 sm:gap-4 z-20">
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className="relative group"
            >
              <div className={`w-12 sm:w-16 h-1 transition-all duration-500 ${
                currentImage === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`} />
              {currentImage === index && (
                <motion.div
                  layoutId="indicator"
                  className="absolute inset-0 bg-white"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="text-white/60 text-xs sm:text-sm">
          {String(currentImage + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}