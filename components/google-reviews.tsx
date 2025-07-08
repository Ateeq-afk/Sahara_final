'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, ThumbsUp, Calendar } from 'lucide-react'
import Image from 'next/image'

// Mock Google Reviews data - In production, this would come from Google Places API
const googleReviews = [
  {
    id: 1,
    author_name: "Rajesh Kumar",
    author_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=95",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Exceptional work by Sahara team! They transformed our 4BHK villa into a masterpiece. The attention to detail and quality of materials used was outstanding. Highly recommend for luxury construction projects.",
    helpful_count: 12,
    project_type: "Luxury Villa Construction"
  },
  {
    id: 2,
    author_name: "Priya Sharma",
    author_photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=95",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Best interior designers in Bangalore! They understood our vision perfectly and delivered beyond expectations. The 3D visualization tool helped us see exactly what we were getting. Professional team and timely delivery.",
    helpful_count: 8,
    project_type: "Interior Design"
  },
  {
    id: 3,
    author_name: "Amit Patel",
    author_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=95",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Renovated our 20-year-old home with Sahara. They managed everything from design to execution flawlessly. The project manager Neha was always available for queries. Completed on time and within budget!",
    helpful_count: 15,
    project_type: "Home Renovation"
  },
  {
    id: 4,
    author_name: "Sneha Reddy",
    author_photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=95",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Outstanding experience! From the initial consultation to the final handover, everything was perfect. The quality of construction is top-notch. Their cost calculator tool gave us accurate estimates upfront.",
    helpful_count: 6,
    project_type: "Apartment Construction"
  },
  {
    id: 5,
    author_name: "Mohammed Khan",
    author_photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=95",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Sahara Developers built our dream home! The team's professionalism and expertise is unmatched. They incorporated all our requirements and even suggested improvements. Worth every penny!",
    helpful_count: 20,
    project_type: "Custom Home Build"
  }
]

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const totalRating = 4.9
  const totalReviews = 245

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % googleReviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % googleReviews.length)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-gray-700">Google Reviews</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">{totalRating}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-gray-600">
              Based on <span className="font-semibold text-gray-900">{totalReviews} reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={googleReviews[currentIndex].author_photo}
                  alt={googleReviews[currentIndex].author_name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {googleReviews[currentIndex].author_name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex gap-0.5">
                      {[...Array(googleReviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {googleReviews[currentIndex].relative_time_description}
                    </span>
                  </div>
                </div>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  width={24}
                  height={24}
                  className="opacity-50"
                />
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" />
                <p className="text-lg text-gray-700 leading-relaxed pl-6">
                  {googleReviews[currentIndex].text}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                    <MapPin className="w-3 h-3" />
                    {googleReviews[currentIndex].project_type}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <ThumbsUp className="w-4 h-4" />
                    {googleReviews[currentIndex].helpful_count} found this helpful
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="pointer-events-auto -ml-5 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="pointer-events-auto -mr-5 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {googleReviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-gray-800' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Join hundreds of satisfied homeowners in Bangalore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:border-gray-300 transition-colors"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Write a Review
            </motion.a>
            <motion.a
              href="/quote"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Get Your Free Quote
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}