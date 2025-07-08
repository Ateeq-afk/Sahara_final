"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HeroMinimal() {
  const [currentImage, setCurrentImage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Subtle parallax
  const yTransform = useTransform(scrollY, [0, 500], [0, 50])
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.8])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const images = [
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=95",
      alt: "Modern Architecture"
    },
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2400&q=95",
      alt: "Interior Design"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=95",
      alt: "Luxury Properties"
    }
  ]
  
  // Auto-cycle images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [images.length])
  
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image - Clean and minimal */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: mounted ? yTransform : 0 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={95}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/60" />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 apple-container pt-32 pb-20"
        style={{ opacity: mounted ? opacityTransform : 1 }}
      >
        <div className="max-w-4xl">
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="apple-caption apple-mb-md"
          >
            SAHARA DEVELOPERS
          </motion.p>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="apple-hero-text apple-mb-lg"
          >
            Crafting spaces<br />
            that inspire.
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="apple-headline-text apple-text-muted apple-mb-xl max-w-2xl"
          >
            Two decades of architectural excellence in Bangalore. 
            Creating homes and spaces that blend innovation with timeless design.
          </motion.p>
          
          {/* CTA Buttons - Minimal and elegant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/quote" className="apple-button apple-button-primary">
              Get Started
            </Link>
            <Link href="/gallery" className="apple-button apple-button-text">
              View Our Work →
            </Link>
          </motion.div>
          
          {/* Trust indicators - Subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="apple-mt-3xl flex items-center gap-8"
          >
            <div>
              <div className="apple-title-text">500+</div>
              <div className="apple-caption">Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <div className="apple-title-text">20+</div>
              <div className="apple-caption">Years</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <div className="apple-title-text">100%</div>
              <div className="apple-caption">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [2, 10, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}