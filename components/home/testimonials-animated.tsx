"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "Sahara's approach to design is nothing short of revolutionary. They don't just create spaces; they craft experiences that resonate with the soul of modern luxury.",
    name: "Priya Kapoor",
    role: "Creative Director, Design House",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=90",
    rating: 5,
    project: "Penthouse Residence"
  },
  {
    text: "The attention to detail and commitment to perfection sets Sahara apart. Every element in our office reflects thoughtful design and impeccable execution.",
    name: "Arjun Mehta",
    role: "Founder, Tech Innovations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90",
    rating: 5,
    project: "Corporate Headquarters"
  },
  {
    text: "Working with Sahara was like watching artists at work. They understood our vision intuitively and elevated it beyond our imagination.",
    name: "Ananya Singh",
    role: "Fashion Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=90",
    rating: 5,
    project: "Boutique Store"
  },
]

export default function TestimonialsAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 tracking-[-0.03em]">
            Voices of Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our clients' success stories speak to our commitment to exceptional design and flawless execution.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-gray-50/50 transition-all duration-500 border border-gray-100 hover:border-gray-200 group-hover:scale-[1.02]">
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
                      <p className="text-xs text-gray-400 mt-1">{testimonial.project}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <blockquote className="relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-gray-200 font-serif">
                "
              </div>
              <p className="text-3xl md:text-4xl font-light text-gray-800 leading-relaxed max-w-4xl mx-auto pt-8">
                Design is not just what it looks like and feels like. 
                Design is how it works — and Sahara understands this perfectly.
              </p>
              <footer className="mt-8">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90"
                      alt="Vikram Desai"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-left">
                    <cite className="not-italic font-medium text-gray-900">Vikram Desai</cite>
                    <p className="text-sm text-gray-500">Award-winning Architect</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}