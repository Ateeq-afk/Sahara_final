"use client"

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

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
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section ref={ref} className="py-32 bg-white">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Plus className="h-8 w-8 text-gray-900" />
                  </div>
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