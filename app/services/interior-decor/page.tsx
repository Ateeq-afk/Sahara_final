"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    title: "Space Planning",
    description: "Optimal layout design for maximum functionality and flow",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  },
  {
    title: "Custom Furniture",
    description: "Bespoke furniture solutions tailored to your style",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
  },
  {
    title: "Lighting Design",
    description: "Strategic lighting solutions to enhance ambiance",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
  }
]

const projects = [
  {
    title: "Modern Living Room",
    type: "Residential",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
  },
  {
    title: "Executive Office",
    type: "Commercial",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg"
  },
  {
    title: "Luxury Kitchen",
    type: "Residential",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
  }
]

export default function InteriorDecorPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Interior Design"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Interior Design Excellence
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Transform your space into a masterpiece with our expert interior design services
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full"
              asChild
            >
              <Link href="/quote">Start Your Transformation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Our Design Services</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Comprehensive interior design solutions tailored to your style and needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-neutral-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Our Design Process</h2>
            <p className="text-neutral-600">
              A collaborative approach to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Consultation",
              "Concept Development",
              "Design Implementation",
              "Final Styling"
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-serif text-primary mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <p className="text-neutral-600">
                    Creating personalized spaces that reflect your lifestyle
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-[2px] bg-primary/20 -translate-y-1/2 translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif mb-12 text-center">Recent Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      View Project
                    </Button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-neutral-600">{project.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Let's create a space that reflects your style and enhances your lifestyle
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full"
              asChild
            >
              <Link href="/quote">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full"
              asChild
            >
              <Link href="/contact">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}