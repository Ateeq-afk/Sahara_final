"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: "Quality Materials",
    description: "Premium construction materials from trusted suppliers",
    image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
  },
  {
    title: "Expert Team",
    description: "Skilled architects, engineers, and construction professionals",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg"
  },
  {
    title: "Timely Delivery",
    description: "Strict adherence to project timelines and milestones",
    image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg"
  }
]

const projects = [
  {
    title: "Modern Villa",
    location: "Whitefield",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
  },
  {
    title: "Luxury Apartment",
    location: "Indiranagar",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
  },
  {
    title: "Contemporary Home",
    location: "JP Nagar",
    image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg"
  }
]

export default function ConstructionPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
            alt="Construction"
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
              Premium Construction Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Building dreams into reality with quality craftsmanship and attention to detail
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full"
              asChild
            >
              <Link href="/quote">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Our Construction Process</h2>
            <p className="text-neutral-600">
              A systematic approach to ensure quality and efficiency at every stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Planning & Design",
              "Material Selection",
              "Construction",
              "Quality Inspection"
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
                    Ensuring excellence through meticulous attention to detail at every step
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

      {/* Recent Projects */}
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
                <p className="text-neutral-600">{project.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Build Your Dream Home?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Let's discuss your project requirements and create something extraordinary together
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full"
              asChild
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full"
              asChild
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}