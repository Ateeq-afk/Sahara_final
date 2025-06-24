"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import InteractiveBentoGallery from '@/components/gallery/interactive-bento-gallery'

const categories = [
  "All",
  "Residential",
  "Commercial", 
  "Interior",
  "Renovation"
]

const projects = [
  {
    id: 1,
    title: "Luxury Villa - Whitefield",
    category: "Residential",
    type: "image",
    location: "Whitefield, Bangalore",
    year: "2024",
    area: "4,500 sq.ft",
    desc: "Modern luxury villa with contemporary design, premium finishes, and smart home integration",
    url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    span: "sm:col-span-2 sm:row-span-2",
    features: ["4 BHK", "Swimming Pool", "Smart Home", "Landscaped Garden", "Premium Finishes"]
  },
  {
    id: 2,
    title: "Executive Office Complex",
    category: "Commercial",
    type: "image",
    location: "MG Road, Bangalore",
    year: "2024",
    area: "15,000 sq.ft",
    desc: "State-of-the-art office complex with modern amenities and sustainable design",
    url: "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
    span: "sm:col-span-2",
    features: ["LEED Certified", "Modern Infrastructure", "Parking", "Security", "Conference Halls"]
  },
  {
    id: 3,
    title: "Contemporary Apartment Interior",
    category: "Interior",
    type: "image",
    location: "Koramangala, Bangalore",
    year: "2024",
    area: "2,800 sq.ft",
    desc: "Sophisticated interior design with contemporary aesthetics and functional layouts",
    url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    span: "",
    features: ["3 BHK", "Modular Kitchen", "Designer Lighting", "Premium Materials"]
  },
  {
    id: 4,
    title: "Heritage Home Renovation",
    category: "Renovation",
    type: "image",
    location: "Jayanagar, Bangalore",
    year: "2023",
    area: "3,200 sq.ft",
    desc: "Careful restoration preserving heritage character while adding modern comforts",
    url: "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg",
    span: "",
    features: ["Heritage Preservation", "Modern Amenities", "Structural Upgrade", "Period Features"]
  },
  {
    id: 5,
    title: "Modern Penthouse Interior",
    category: "Interior",
    type: "image",
    location: "UB City, Bangalore",
    year: "2024",
    area: "5,000 sq.ft",
    desc: "Ultra-luxury penthouse with panoramic city views and bespoke interiors",
    url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    span: "sm:row-span-2",
    features: ["Penthouse", "City Views", "Custom Furniture", "Premium Materials"]
  },
  {
    id: 6,
    title: "Minimalist Family Home",
    category: "Residential",
    type: "image",
    location: "HSR Layout, Bangalore",
    year: "2023",
    area: "3,500 sq.ft",
    desc: "Clean, minimalist design with focus on natural light and open spaces",
    url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    span: "",
    features: ["3 BHK", "Open Plan", "Natural Light", "Minimalist Design"]
  },
  {
    id: 7,
    title: "Boutique Retail Space",
    category: "Commercial",
    type: "image",
    location: "Commercial Street, Bangalore",
    year: "2024",
    area: "2,000 sq.ft",
    desc: "Elegant retail space designed to enhance customer experience and brand identity",
    url: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg",
    span: "",
    features: ["Retail Design", "Brand Identity", "Customer Experience", "Modern Fixtures"]
  },
  {
    id: 8,
    title: "Restaurant Interior Design",
    category: "Interior",
    type: "image",
    location: "Indiranagar, Bangalore",
    year: "2023",
    area: "3,000 sq.ft",
    desc: "Warm and inviting restaurant interior with contemporary design elements",
    url: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg",
    span: "sm:col-span-2",
    features: ["Restaurant Design", "Ambient Lighting", "Seating Layout", "Kitchen Design"]
  },
  {
    id: 9,
    title: "Corporate Headquarters",
    category: "Commercial",
    type: "image",
    location: "Electronic City, Bangalore",
    year: "2023",
    area: "25,000 sq.ft",
    desc: "Modern corporate headquarters with flexible workspaces and collaborative areas",
    url: "https://images.pexels.com/photos/296883/pexels-photo-296883.jpeg",
    span: "",
    features: ["Corporate Design", "Flexible Workspace", "Collaboration Areas", "Modern Tech"]
  },
  {
    id: 10,
    title: "Historic Building Restoration",
    category: "Renovation",
    type: "image",
    location: "MG Road, Bangalore",
    year: "2023",
    area: "8,000 sq.ft",
    desc: "Comprehensive restoration of historic building maintaining architectural integrity",
    url: "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg",
    span: "",
    features: ["Historic Restoration", "Architectural Integrity", "Modern Systems", "Heritage Value"]
  },
  {
    id: 11,
    title: "Luxury Apartment Complex",
    category: "Residential",
    type: "image",
    location: "Sarjapur Road, Bangalore",
    year: "2024",
    area: "50,000 sq.ft",
    desc: "Premium apartment complex with world-class amenities and modern architecture",
    url: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg",
    span: "sm:col-span-2",
    features: ["Luxury Apartments", "World-class Amenities", "Modern Architecture", "Landscaping"]
  },
  {
    id: 12,
    title: "Spa & Wellness Center",
    category: "Interior",
    type: "image",
    location: "Whitefield, Bangalore",
    year: "2024",
    area: "4,000 sq.ft",
    desc: "Tranquil spa interior designed for relaxation and wellness experiences",
    url: "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg",
    span: "",
    features: ["Spa Design", "Wellness Focus", "Tranquil Atmosphere", "Natural Materials"]
  }
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)
  
  return (
    <div className="w-full min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
              <span>🏗️</span>
              Our Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
              Project Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of construction and interior projects that showcase our commitment to quality, 
              innovation, and design excellence across Bangalore
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300 font-medium",
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Interactive Bento Gallery */}
      <section className="py-16 bg-white">
        <InteractiveBentoGallery
          mediaItems={filteredProjects}
          title="Our Featured Projects"
          description="Interactive gallery showcasing our finest construction and interior design work. Click on any project to explore details, or drag to rearrange the layout."
        />
      </section>
    </div>
  )
}