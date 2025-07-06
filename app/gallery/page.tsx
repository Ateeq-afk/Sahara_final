"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { 
  Eye, 
  Heart, 
  Share2, 
  Download, 
  Filter, 
  Grid3x3, 
  LayoutGrid,
  Maximize2,
  MapPin,
  Calendar,
  Ruler,
  Home,
  Building,
  Palette,
  Wrench,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  { id: "all", name: "All Projects", icon: Grid3x3 },
  { id: "residential", name: "Residential", icon: Home },
  { id: "commercial", name: "Commercial", icon: Building },
  { id: "interior", name: "Interior Design", icon: Palette },
  { id: "renovation", name: "Renovation", icon: Wrench }
]

const projects = [
  {
    id: 1,
    title: "Luxury Villa - Whitefield",
    category: "residential",
    location: "Whitefield, Bangalore",
    year: "2024",
    area: "4,500 sq.ft",
    description: "Modern luxury villa with contemporary design, premium finishes, and smart home integration",
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    ],
    features: ["4 BHK", "Swimming Pool", "Smart Home", "Landscaped Garden"],
    likes: 245,
    views: 1520
  },
  {
    id: 2,
    title: "Executive Office Complex",
    category: "commercial",
    location: "MG Road, Bangalore",
    year: "2024",
    area: "15,000 sq.ft",
    description: "State-of-the-art office complex with modern amenities and sustainable design",
    images: [
      "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg"
    ],
    features: ["LEED Certified", "Modern Infrastructure", "Parking", "Security"],
    likes: 189,
    views: 980
  },
  {
    id: 3,
    title: "Contemporary Apartment Interior",
    category: "interior",
    location: "Koramangala, Bangalore",
    year: "2024",
    area: "2,800 sq.ft",
    description: "Sophisticated interior design with contemporary aesthetics and functional layouts",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    ],
    features: ["3 BHK", "Modular Kitchen", "Designer Lighting", "Premium Materials"],
    likes: 312,
    views: 1850
  },
  {
    id: 4,
    title: "Heritage Home Renovation",
    category: "renovation",
    location: "Jayanagar, Bangalore",
    year: "2023",
    area: "3,200 sq.ft",
    description: "Careful restoration preserving heritage character while adding modern comforts",
    images: [
      "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg",
      "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg"
    ],
    features: ["Heritage Preservation", "Modern Amenities", "Structural Upgrade"],
    likes: 198,
    views: 1120
  },
  {
    id: 5,
    title: "Modern Penthouse Interior",
    category: "interior",
    location: "UB City, Bangalore",
    year: "2024",
    area: "5,000 sq.ft",
    description: "Ultra-luxury penthouse with panoramic city views and bespoke interiors",
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg"
    ],
    features: ["Penthouse", "City Views", "Custom Furniture", "Premium Materials"],
    likes: 456,
    views: 2340
  },
  {
    id: 6,
    title: "Minimalist Family Home",
    category: "residential",
    location: "HSR Layout, Bangalore",
    year: "2023",
    area: "3,500 sq.ft",
    description: "Clean, minimalist design with focus on natural light and open spaces",
    images: [
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg"
    ],
    features: ["3 BHK", "Open Plan", "Natural Light", "Minimalist Design"],
    likes: 267,
    views: 1680
  }
]

interface LightboxProps {
  project: typeof projects[0]
  isOpen: boolean
  onClose: () => void
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
}

const Lightbox = ({ project, isOpen, onClose, currentImageIndex, setCurrentImageIndex }: LightboxProps) => {
  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + project.images.length) % project.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prevImage() }}
        className="absolute left-4 text-white/80 hover:text-white z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextImage() }}
        className="absolute right-4 text-white/80 hover:text-white z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <motion.div 
        className="relative max-w-6xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={project.images[currentImageIndex]}
          alt={project.title}
          width={1200}
          height={800}
          className="object-contain rounded-lg"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-white/80 mb-4">{project.description}</p>
          <div className="flex gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              {project.area}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [likedProjects, setLikedProjects] = useState<number[]>([])
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const toggleLike = (projectId: number) => {
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const openLightbox = (project: typeof projects[0], imageIndex: number = 0) => {
    setSelectedProject(project)
    setCurrentImageIndex(imageIndex)
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg')] opacity-20 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crafting Dreams into Reality
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of exceptional construction and interior design projects 
              that showcase our commitment to quality, innovation, and timeless design.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                      activeCategory === category.id
                        ? "bg-amber-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                )
              })}
            </motion.div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={cn(viewMode === 'grid' && 'bg-gray-100')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode('masonry')}
                className={cn(viewMode === 'masonry' && 'bg-gray-100')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "columns-1 md:columns-2 lg:columns-3 space-y-6"
            )}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
                    viewMode === 'masonry' && "break-inside-avoid mb-6"
                  )}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden">
                    <div className={cn(
                      "relative",
                      viewMode === 'grid' ? "aspect-[4/3]" : "aspect-auto"
                    )}>
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(project.id)
                          }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Heart 
                            className={cn(
                              "w-5 h-5 transition-colors",
                              likedProjects.includes(project.id) 
                                ? "fill-red-500 text-red-500" 
                                : "text-gray-700"
                            )}
                          />
                        </button>
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                          <Share2 className="w-5 h-5 text-gray-700" />
                        </button>
                        <button 
                          onClick={() => openLightbox(project)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        >
                          <Maximize2 className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>

                      {/* Multiple Images Indicator */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {project.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => openLightbox(project, idx)}
                              className="w-2 h-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {project.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {likedProjects.includes(project.id) ? project.likes + 1 : project.likes}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openLightbox(project)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        View Details
                        <ZoomIn className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
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
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Dream Space?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join our portfolio of satisfied clients. Let our expert team bring your vision to life 
              with the same attention to detail showcased in these projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100"
                asChild
              >
                <a href="/quote">Get Free Consultation</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/packages">View Our Packages</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}