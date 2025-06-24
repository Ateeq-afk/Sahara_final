"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, MapPin, Calendar } from 'lucide-react'
import ConstructionPortfolio from './construction-portfolio'

const projects = [
  {
    id: 1,
    title: "Luxury Villa - Whitefield",
    category: "Residential",
    type: "Villa Construction",
    location: "Whitefield, Bangalore",
    completedYear: "2024",
    area: "4,500 sq.ft",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    description: "Modern luxury villa with contemporary design and premium finishes",
    features: ["4 BHK", "Swimming Pool", "Landscaped Garden", "Smart Home"],
    size: "large"
  },
  {
    id: 2,
    title: "Executive Office Complex",
    category: "Commercial",
    type: "Office Construction",
    location: "MG Road, Bangalore",
    completedYear: "2024",
    area: "15,000 sq.ft",
    image: "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
    description: "State-of-the-art office complex with modern amenities",
    features: ["LEED Certified", "Modern Infrastructure", "Parking", "Security"],
    size: "medium"
  },
  {
    id: 3,
    title: "Luxury Apartment Interior",
    category: "Interior",
    type: "Residential Interior",
    location: "Koramangala, Bangalore",
    completedYear: "2024",
    area: "2,800 sq.ft",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    description: "Sophisticated interior design with contemporary aesthetics",
    features: ["3 BHK", "Modular Kitchen", "Designer Lighting", "Premium Finishes"],
    size: "medium"
  },
  {
    id: 4,
    title: "Heritage Home Renovation",
    category: "Renovation",
    type: "Heritage Restoration",
    location: "Jayanagar, Bangalore",
    completedYear: "2023",
    area: "3,200 sq.ft",
    image: "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg",
    description: "Careful restoration preserving heritage while adding modern comforts",
    features: ["Heritage Preservation", "Modern Amenities", "Structural Upgrade", "Period Features"],
    size: "small"
  },
  {
    id: 5,
    title: "Modern Penthouse",
    category: "Interior",
    type: "Luxury Interior",
    location: "UB City, Bangalore",
    completedYear: "2024",
    area: "5,000 sq.ft",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    description: "Ultra-luxury penthouse with panoramic city views",
    features: ["Penthouse", "City Views", "Premium Materials", "Custom Furniture"],
    size: "small"
  },
  {
    id: 6,
    title: "Boutique Hotel Interior",
    category: "Commercial",
    type: "Hospitality Design",
    location: "Indiranagar, Bangalore",
    completedYear: "2023",
    area: "8,000 sq.ft",
    image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg",
    description: "Elegant boutique hotel with contemporary design elements",
    features: ["20 Rooms", "Restaurant", "Spa", "Conference Hall"],
    size: "small"
  }
]

const categories = ["All", "Residential", "Commercial", "Interior", "Renovation"]

const GalleryShowcase = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use the Construction Portfolio component */}
        <ConstructionPortfolio />

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">
              Ready to Start Your Dream Project?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our portfolio of satisfied clients. Let our expert team bring your vision to life with 
              the same attention to detail and quality craftsmanship showcased in these projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Complete Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GalleryShowcase