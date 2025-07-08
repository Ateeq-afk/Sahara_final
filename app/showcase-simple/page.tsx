'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Ruler, Bath, Car, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    id: '1',
    title: 'Luxury Villa Paradise',
    subtitle: 'Modern 4BHK Villa in Whitefield',
    category: 'Residential',
    price: '₹2.5 Cr',
    area: '3,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
    features: [
      { icon: <Home className="h-5 w-5" />, label: 'Built-up Area', value: '3,500 sq.ft' },
      { icon: <Ruler className="h-5 w-5" />, label: 'Plot Size', value: '5,000 sq.ft' },
      { icon: <Bath className="h-5 w-5" />, label: 'Bathrooms', value: '5 Luxury' },
      { icon: <Car className="h-5 w-5" />, label: 'Car Parking', value: '3 Covered' }
    ],
    description: 'Experience luxury living at its finest in this meticulously crafted villa.',
    highlights: [
      'Premium Italian marble flooring',
      'Smart home automation system',
      'Private swimming pool',
      'Landscaped garden',
      'Solar power backup'
    ]
  },
  {
    id: '2',
    title: 'Sky Heights Tower',
    subtitle: 'Premium Commercial Complex in MG Road',
    category: 'Commercial',
    price: '₹15 Cr',
    area: '25,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    features: [
      { icon: <Building2 className="h-5 w-5" />, label: 'Total Floors', value: '8 Floors' },
      { icon: <Ruler className="h-5 w-5" />, label: 'Floor Plate', value: '3,125 sq.ft' },
      { icon: <Car className="h-5 w-5" />, label: 'Parking', value: '150+ Slots' },
      { icon: <Home className="h-5 w-5" />, label: 'Price/sq.ft', value: '₹6,000' }
    ],
    description: 'A landmark commercial development with world-class amenities.',
    highlights: [
      'Prime location on MG Road',
      'High-speed elevators',
      'Central air conditioning',
      '100% power backup',
      'LEED Gold certified'
    ]
  }
]

export default function ShowcaseSimplePage() {
  const [activeProject, setActiveProject] = useState(0)
  const currentProject = projects[activeProject]

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Project Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our premium construction projects
            </p>
          </motion.div>

          {/* Project Navigation */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevProject}
              className="rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeProject
                      ? 'bg-sahara-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextProject}
              className="rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left: Image */}
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden rounded-3xl shadow-2xl">
                <div className="relative aspect-square">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">
                      {currentProject.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              key={`details-${activeProject}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentProject.title}
                </h2>
                <p className="text-xl text-gray-600">{currentProject.subtitle}</p>
              </div>

              <div className="text-3xl font-semibold text-sahara-primary">
                {currentProject.price}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentProject.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-sahara-primary/10 flex items-center justify-center text-sahara-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{feature.label}</p>
                      <p className="font-semibold">{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-gray-700">{currentProject.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {currentProject.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sahara-primary mt-2" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button size="lg" className="flex-1">
                  Schedule Visit
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Download Brochure
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}