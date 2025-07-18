"use client"

import './gallery-showcase.css'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "Minimalist Villa",
    category: "Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
    description: "A study in restraint and elegance",
  },
  {
    id: 2,
    title: "Executive Suite",
    category: "Interior Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=90",
    description: "Where productivity meets luxury",
  },
  {
    id: 3,
    title: "Heritage Revival",
    category: "Renovation",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=90",
    description: "Preserving legacy, embracing future",
  },
  {
    id: 4,
    title: "Urban Sanctuary",
    category: "Interior Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90",
    description: "Tranquility in the heart of the city",
  },
  {
    id: 5,
    title: "Corporate Campus",
    category: "Architecture",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=90",
    description: "Innovation through design",
  },
  {
    id: 6,
    title: "Boutique Hotel",
    category: "Commercial",
    year: "2024",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=90",
    description: "Hospitality redefined",
  },
]

export default function GalleryShowcase() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
  }, [isMobile])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Width of one card plus gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={ref} className="py-32 bg-white mt-20">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Portfolio
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-4">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] mb-6 lg:mb-0">
              Selected Works
            </h2>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              View All Projects
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* Gallery - Horizontal scroll on mobile, Grid on desktop */}
        {isMobile ? (
          <div className="relative">
            {/* Scroll Buttons */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            
            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              onScroll={checkScrollButtons}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-8 px-8 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer flex-shrink-0 w-[280px]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                    
                    {/* Interactive Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-white text-sm font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg transition-all duration-300"
                      >
                        <span>View Project</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{project.category} · {project.year}</p>
                    <h3 className="text-lg font-medium mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicators */}
            <div className="flex justify-center gap-1 mt-4">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className="h-1 w-8 bg-gray-200 rounded-full transition-colors duration-300"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-x-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  {/* Interactive Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-white text-lg font-medium bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg transition-all duration-300"
                    >
                      <span>View Project</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">{project.category} · {project.year}</p>
                  <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </motion.div>
          ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 text-white text-lg font-medium hover:text-gray-300 transition-colors"
              >
                Close
              </button>
              
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="p-12">
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedProject.category} · {selectedProject.year}
                  </p>
                  <h3 className="text-4xl font-semibold mb-4">{selectedProject.title}</h3>
                  <p className="text-xl text-gray-600 mb-8">{selectedProject.description}</p>
                  <Link
                    href={`/gallery/${selectedProject.id}`}
                    className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  >
                    View Project Details
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}