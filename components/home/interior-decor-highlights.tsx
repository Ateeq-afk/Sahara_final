"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Office"
]

const projects = [
  {
    title: "Modern Minimalist Living",
    category: "Living Room",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    size: "large"
  },
  {
    title: "Luxurious Master Suite",
    category: "Bedroom",
    image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
    size: "small"
  },
  {
    title: "Contemporary Kitchen Design",
    category: "Kitchen",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    size: "medium"
  },
  {
    title: "Spa-Like Bathroom Retreat",
    category: "Bathroom",
    image: "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg",
    size: "small"
  },
  {
    title: "Executive Home Office",
    category: "Office",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
    size: "medium"
  },
  {
    title: "Cozy Reading Nook",
    category: "Living Room",
    image: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg",
    size: "small"
  }
]

const InteriorDecorHighlights = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <section className="py-20 bg-[#F9F6F0]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif text-[#232323] font-medium mb-4">
              Interior Design Portfolio
            </h2>
            <p className="text-lg font-sans text-gray-600 max-w-2xl">
              Discover our collection of thoughtfully crafted spaces that inspire and delight
            </p>
          </div>
          <Link 
            href="/gallery" 
            className="flex items-center text-[#B29263] hover:text-[#9e7a48] font-medium mt-4 md:mt-0 group"
          >
            View full portfolio
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#B29263] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl shadow-xl ${
                project.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : 
                project.size === 'medium' ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-1">{project.category}</p>
                    <h3 className="text-xl font-serif">{project.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-serif text-[#232323] font-medium mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-gray-600">
                Let our expert designers help you create the perfect interior that reflects your style and personality.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button 
                size="lg"
                className="bg-[#B29263] hover:bg-[#9e7a48] text-white shadow-md rounded-full"
                asChild
              >
                <Link href="/quote">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteriorDecorHighlights