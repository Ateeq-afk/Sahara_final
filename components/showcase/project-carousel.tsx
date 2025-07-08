'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProjectCarouselProps {
  projects: Array<{
    id: string
    title: string
    subtitle: string
    image: string
    category: string
    price: string
    area: string
  }>
  autoPlay?: boolean
  interval?: number
}

export default function ProjectCarousel({ 
  projects, 
  autoPlay = true, 
  interval = 5000 
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
      setProgress(0)
    }, interval)

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (interval / 100)), 100))
    }, 100)

    return () => {
      clearInterval(timer)
      clearInterval(progressTimer)
    }
  }, [isPlaying, interval, projects.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setProgress(0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Carousel */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <img
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 lg:px-16">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-2xl space-y-6"
                >
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {projects[currentIndex].category}
                  </Badge>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-white">
                    {projects[currentIndex].title}
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-white/90">
                    {projects[currentIndex].subtitle}
                  </p>
                  
                  <div className="flex items-center gap-6 text-white/80">
                    <div>
                      <p className="text-sm opacity-80">Starting from</p>
                      <p className="text-2xl font-semibold">{projects[currentIndex].price}</p>
                    </div>
                    <div className="w-px h-12 bg-white/30" />
                    <div>
                      <p className="text-sm opacity-80">Project area</p>
                      <p className="text-2xl font-semibold">{projects[currentIndex].area}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4 pt-4"
                  >
                    <Button size="lg" className="bg-white text-black hover:bg-white/90">
                      Explore Project
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                      View Gallery
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Button
          size="icon"
          variant="ghost"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Play/Pause Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-sahara-primary scale-105'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-sahara-primary/20"
                layoutId="active-thumbnail"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}