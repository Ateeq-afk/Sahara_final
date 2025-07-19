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
    title: "Modern Residence",
    category: "Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90",
    description: "Contemporary living redefined with clean lines",
  },
  {
    id: 2,
    title: "Luxury Penthouse",
    category: "Interior Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90",
    description: "Elevated living with panoramic city views",
  },
  {
    id: 3,
    title: "Sustainable Home",
    category: "Green Building",
    year: "2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90",
    description: "Eco-friendly design meets modern aesthetics",
  },
  {
    id: 4,
    title: "Designer Kitchen",
    category: "Interior Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=90",
    description: "Culinary excellence in sophisticated spaces",
  },
  {
    id: 5,
    title: "Tech Office Hub",
    category: "Commercial",
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90",
    description: "Future-ready workspaces for innovation",
  },
  {
    id: 6,
    title: "Luxury Villa",
    category: "Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=90",
    description: "Grandeur meets contemporary comfort",
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
    <section ref={ref} className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-20"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Portfolio
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4 lg:mb-0">
              Selected Works
            </h2>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              View All Projects
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* Gallery - Horizontal scroll on mobile, Grid on desktop */}
        {isMobile ? (
          <div className="relative">
            {/* Scroll Buttons - Hidden on mobile for better UX */}
            {!isMobile && canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg min-w-[44px] min-h-[44px] hidden sm:block"
                aria-label="Scroll gallery left"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {!isMobile && canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg min-w-[44px] min-h-[44px] hidden sm:block"
                aria-label="Scroll gallery right"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            
            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              onScroll={checkScrollButtons}
              className="flex overflow-x-auto scrollbar-hide gap-3 pb-4 scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer flex-shrink-0 w-[75vw] max-w-[260px] sm:w-[280px]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden mb-3">
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
                    <h3 className="text-base sm:text-lg font-medium mb-1">{project.title}</h3>
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
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
              
              <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
                <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="p-6 sm:p-8 md:p-12">
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedProject.category} · {selectedProject.year}
                  </p>
                  <h3 className="text-4xl font-semibold mb-4">{selectedProject.title}</h3>
                  <p className="text-xl text-gray-600 mb-8">{selectedProject.description}</p>
                  <Link
                    href={`/gallery/${selectedProject.id}`}
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300"
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