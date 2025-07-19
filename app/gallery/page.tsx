"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Filter,
  Plus
} from 'lucide-react'

const categories = [
  { id: "all", name: "All Works" },
  { id: "architecture", name: "Architecture" },
  { id: "interior", name: "Interiors" },
  { id: "commercial", name: "Commercial" },
  { id: "residential", name: "Residential" }
]

const projects = [
  {
    id: 1,
    title: "Contemporary Residence",
    category: "architecture",
    location: "Whitefield, Bangalore",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=90",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1600&q=90"
    ],
    description: "Modern architecture meets sustainable design in this stunning residential project."
  },
  {
    id: 2,
    title: "Luxury Penthouse",
    category: "interior",
    location: "MG Road, Bangalore",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1600&q=90"
    ],
    description: "Sophisticated interiors with panoramic city views and premium finishes throughout."
  },
  {
    id: 3,
    title: "Garden Villa",
    category: "residential",
    location: "Koramangala, Bangalore",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90",
      "https://images.unsplash.com/photo-1613977257365-612d3cb70a38?w=1600&q=90"
    ],
    description: "A harmonious blend of indoor and outdoor living spaces with lush landscaping."
  },
  {
    id: 4,
    title: "Boutique Hotel",
    category: "commercial",
    location: "Indiranagar, Bangalore",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=90"
    ],
    description: "Boutique hospitality experience with artisanal interiors and personalized comfort."
  },
  {
    id: 5,
    title: "Tech Hub Office",
    category: "commercial",
    location: "Electronic City, Bangalore",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=90",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=90"
    ],
    description: "Future-ready workspace fostering innovation with collaborative zones and tech integration."
  },
  {
    id: 6,
    title: "Modern Farmhouse",
    category: "residential",
    location: "Jayanagar, Bangalore",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=90",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=90",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&q=90"
    ],
    description: "Contemporary take on traditional farmhouse design with modern amenities and charm."
  }
]

interface LightboxProps {
  project: typeof projects[0]
  isOpen: boolean
  onClose: () => void
}

const Lightbox = ({ project, isOpen, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {project.images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-8 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-8 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <motion.div 
        className="relative max-w-7xl max-h-[90vh] mx-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={project.images[currentIndex]}
          alt={project.title}
          width={1600}
          height={900}
          className="object-contain max-h-[90vh] w-auto mx-auto"
        />
        
        {/* Image Counter */}
        {project.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm">
              {currentIndex + 1} / {project.images.length}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  
  const heroRef = useRef(null)
  const galleryRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true, margin: "-50px" })
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden bg-white">
        {/* Subtle background pattern */}
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
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-full blur-3xl" />
        
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
                Portfolio
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-[0.9]"
            >
              Crafted with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                precision.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl font-light"
            >
              Each project tells a story of innovation, craftsmanship, and the relentless 
              pursuit of perfection in design and execution.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Bar - Apple Style */}
      <section className="sticky top-12 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/50">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-8"
            >
              <div className="flex gap-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`text-[15px] font-medium transition-all duration-300 apple-nav-item ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Grid - Apple Style */}
      <section ref={galleryRef} className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            layout
            className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-12"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={viewMode === 'grid' ? { y: -4 } : { scale: 1.01 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {viewMode === 'grid' ? (
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.coverImage}
                          alt={`${project.title} - ${project.category} project in ${project.location} by Sahara Developers`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <motion.div 
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            <Plus className="h-6 w-6 text-gray-900" />
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <p className="text-sm text-amber-600 font-medium mb-2">
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)} · {project.year}
                        </p>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                      <div className="grid md:grid-cols-2 gap-0 items-center">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={project.coverImage}
                            alt={`${project.title} - ${project.category} project in ${project.location} by Sahara Developers`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-8">
                          <p className="text-sm text-amber-600 font-medium mb-4">
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)} · {project.year}
                          </p>
                          <h3 className="text-3xl font-semibold mb-4 group-hover:text-amber-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                          <p className="text-gray-500">{project.location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* CTA Section - Apple Style */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
              Ready to create your masterpiece?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's collaborate to bring your vision to life with the same attention 
              to detail and excellence showcased in our portfolio.
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
                Start Your Project →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}