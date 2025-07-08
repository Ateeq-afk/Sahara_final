'use client'

import { Home, Building2, Ruler, Bath, Car, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import ProjectShowcaseResponsive from '@/components/showcase/project-showcase-responsive'
import ProjectCarousel from '@/components/showcase/project-carousel'

// Sample project data
const showcaseProjects = [
  {
    id: '1',
    title: 'Luxury Villa Paradise',
    subtitle: 'Modern 4BHK Villa in Whitefield',
    category: 'Residential',
    price: '₹2.5 Cr',
    area: '3,500 sq.ft',
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    highlights: [
      'Premium Italian marble flooring throughout',
      'Smart home automation system',
      'Private swimming pool with deck',
      'Landscaped garden with outdoor seating',
      'Solar power backup system',
      'Designer modular kitchen with island'
    ],
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
      ],
      floorPlan: [
        'https://placehold.co/800x600/f5f5f5/333?text=Floor+Plan+Ground',
        'https://placehold.co/800x600/f5f5f5/333?text=Floor+Plan+First'
      ]
    },
    features: [
      { icon: <Home className="h-5 w-5" />, label: 'Built-up Area', value: '3,500 sq.ft' },
      { icon: <Ruler className="h-5 w-5" />, label: 'Plot Size', value: '5,000 sq.ft' },
      { icon: <Bath className="h-5 w-5" />, label: 'Bathrooms', value: '5 Luxury' },
      { icon: <Car className="h-5 w-5" />, label: 'Car Parking', value: '3 Covered' }
    ],
    description: 'Experience luxury living at its finest in this meticulously crafted villa. Every corner reflects sophistication with premium finishes, spacious layouts, and modern amenities designed for the discerning homeowner.'
  },
  {
    id: '2',
    title: 'Sky Heights Tower',
    subtitle: 'Premium Commercial Complex in MG Road',
    category: 'Commercial',
    price: '₹15 Cr',
    area: '25,000 sq.ft',
    bedrooms: 0,
    bathrooms: 20,
    floors: 8,
    highlights: [
      'Prime location on MG Road',
      'High-speed elevators with destination control',
      'Central air conditioning with VRV system',
      '100% power backup with DG sets',
      'Multi-level parking for 150+ vehicles',
      'LEED Gold certified green building'
    ],
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
      ],
      floorPlan: [
        'https://placehold.co/800x600/f5f5f5/333?text=Office+Layout+Type+A',
        'https://placehold.co/800x600/f5f5f5/333?text=Office+Layout+Type+B'
      ]
    },
    features: [
      { icon: <Building2 className="h-5 w-5" />, label: 'Total Floors', value: '8 Floors' },
      { icon: <Ruler className="h-5 w-5" />, label: 'Floor Plate', value: '3,125 sq.ft' },
      { icon: <Car className="h-5 w-5" />, label: 'Parking', value: '150+ Slots' },
      { icon: <IndianRupee className="h-5 w-5" />, label: 'Price/sq.ft', value: '₹6,000' }
    ],
    description: 'A landmark commercial development offering premium office spaces with world-class amenities. Strategically located with excellent connectivity and designed to boost productivity and business growth.'
  },
  {
    id: '3',
    title: 'Garden Residency',
    subtitle: 'Eco-friendly Apartments in Sarjapur',
    category: 'Residential',
    price: '₹85 Lakhs onwards',
    area: '1,200 - 2,400 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    floors: 12,
    highlights: [
      'Rainwater harvesting system',
      'Organic waste composting unit',
      'Children\'s play area and daycare',
      'Jogging track and yoga deck',
      'EV charging stations',
      'Medicinal garden and reflexology path'
    ],
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
      ],
      floorPlan: [
        'https://placehold.co/800x600/f5f5f5/333?text=2BHK+Layout',
        'https://placehold.co/800x600/f5f5f5/333?text=3BHK+Layout'
      ]
    },
    features: [
      { icon: <Home className="h-5 w-5" />, label: 'Unit Types', value: '2, 3 BHK' },
      { icon: <Building2 className="h-5 w-5" />, label: 'Total Units', value: '240 Apartments' },
      { icon: <Ruler className="h-5 w-5" />, label: 'Sizes', value: '1,200-2,400 sq.ft' },
      { icon: <Car className="h-5 w-5" />, label: 'Parking', value: '1:1 Ratio' }
    ],
    description: 'Sustainable living meets modern comfort in this thoughtfully designed residential complex. Featuring green building practices, energy-efficient systems, and abundant open spaces for a healthier lifestyle.'
  }
]

const carouselProjects = showcaseProjects.map(project => ({
  id: project.id,
  title: project.title,
  subtitle: project.subtitle,
  image: project.images.exterior[0],
  category: project.category,
  price: project.price,
  area: project.area
}))

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our premium construction projects showcased with stunning visuals and interactive 3D views
            </p>
          </motion.div>
          
          <ProjectCarousel projects={carouselProjects} />
        </div>
      </section>

      {/* Detailed Showcase */}
      <section className="py-12">
        <ProjectShowcaseResponsive projects={showcaseProjects} />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sahara-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Dream Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with our experts to discuss your requirements and receive a personalized consultation
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-sahara-primary hover:bg-sahara-primary/90">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}