'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, MessageCircle, ArrowUpRight, Quote } from 'lucide-react'

export default function AtelierSpaces() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup && !localStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true)
        localStorage.setItem('exitPopupShown', 'true')
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [showExitPopup])

  const services = [
    {
      title: "Residential Design",
      description: "Transform your home into a sanctuary of style and comfort.",
      image: "/api/placeholder/400/300",
      features: ["Space Planning", "Custom Furniture", "Lighting Design"]
    },
    {
      title: "Commercial Spaces",
      description: "Create inspiring workplaces that boost productivity and well-being.",
      image: "/api/placeholder/400/300",
      features: ["Office Design", "Retail Spaces", "Hospitality"]
    },
    {
      title: "Virtual Consultations",
      description: "Expert design guidance from anywhere in the world.",
      image: "/api/placeholder/400/300",
      features: ["E-Design Packages", "3D Renderings", "Shopping Lists"]
    }
  ]

  const portfolio = [
    { id: 1, title: "Minimalist Loft", category: "Residential", image: "/api/placeholder/600/800" },
    { id: 2, title: "Executive Office", category: "Commercial", image: "/api/placeholder/600/800" },
    { id: 3, title: "Urban Retreat", category: "Residential", image: "/api/placeholder/600/800" },
    { id: 4, title: "Boutique Hotel", category: "Hospitality", image: "/api/placeholder/600/800" },
    { id: 5, title: "Modern Kitchen", category: "Residential", image: "/api/placeholder/600/800" },
    { id: 6, title: "Creative Studio", category: "Commercial", image: "/api/placeholder/600/800" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Executive",
      content: "Atelier Spaces transformed our home into a minimalist haven. Every detail was thoughtfully considered.",
      rating: 5
    },
    {
      name: "Michael Torres",
      role: "Gallery Owner",
      content: "The team's understanding of space and light created the perfect environment for showcasing art.",
      rating: 5
    },
    {
      name: "Emma Richardson",
      role: "Entrepreneur",
      content: "Working with Atelier was effortless. They captured our vision perfectly and elevated it beyond imagination.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Sticky Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/atelier" className="text-xl sm:text-2xl font-light tracking-wider">
              Atelier Spaces
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#services" className="text-sm tracking-wide hover:opacity-60 transition-opacity">Services</Link>
              <Link href="#portfolio" className="text-sm tracking-wide hover:opacity-60 transition-opacity">Portfolio</Link>
              <Link href="#about" className="text-sm tracking-wide hover:opacity-60 transition-opacity">About</Link>
              <Link href="#contact" className="text-sm tracking-wide hover:opacity-60 transition-opacity">Contact</Link>
            </nav>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0A5C36] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#084a2e] transition-colors"
            >
              Book Consultation
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/api/placeholder/1920/1080"
            alt="Luxury minimalist interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        </motion.div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-6"
          >
            Elevate Your Space.<br />Transform Your Life.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl mb-10 opacity-90 max-w-2xl mx-auto"
          >
            Award-winning interior design studio creating sophisticated, 
            minimalist spaces that inspire and delight.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all"
            >
              View Our Portfolio
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive design solutions tailored to your unique vision and lifestyle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-light mb-3 group-hover:text-[#0A5C36] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1 h-1 bg-[#0A5C36] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our portfolio of thoughtfully designed spaces.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(project.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <p className="text-sm mb-1 opacity-80">{project.category}</p>
                      <h3 className="text-xl font-light">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2"
            >
              View Full Portfolio
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Client Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from those who've experienced the Atelier difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <Quote className="w-8 h-8 text-[#0A5C36] mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-light mb-6">
                Crafting Spaces.<br />Creating Experiences.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2015 by award-winning designer Elena Martinez, Atelier Spaces 
                has become synonymous with sophisticated, minimalist design that puts 
                people first.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our philosophy is simple: great design should enhance your life, not 
                complicate it. We believe in the power of space to transform how you 
                live, work, and feel.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With over 200 completed projects and a team of passionate designers, 
                we continue to push the boundaries of what's possible in interior design.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/api/placeholder/800/600"
                alt="Elena Martinez, Founder"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Start Your Project</h2>
            <p className="text-gray-600 text-lg">
              Ready to transform your space? Let's create something beautiful together.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="project" className="block text-sm font-medium mb-2">Project Type</label>
              <select
                id="project"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors"
              >
                <option value="">Select project type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="consultation">Virtual Consultation</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Tell us about your project</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors resize-none"
                placeholder="Share your vision..."
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#0A5C36] text-white py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors"
            >
              Send Message
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            Or call us directly at{' '}
            <a href="tel:+14155551234" className="text-[#0A5C36] hover:underline">
              +1 (415) 555-1234
            </a>
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-[#0A5C36] text-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Download our exclusive style guide and discover the latest trends 
              in minimalist interior design.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#0A5C36] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Download Style Guide
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/14155551234"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-light mb-4">Wait! Before You Go...</h3>
              <p className="text-gray-600 mb-6">
                Get 10% off your first design package when you book a consultation today.
              </p>
              
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A5C36] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0A5C36] text-white py-3 rounded-full font-medium hover:bg-[#084a2e] transition-colors"
                >
                  Claim Your Discount
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full h-[80vh]"
            >
              <Image
                src={portfolio.find(p => p.id === selectedImage)?.image || ''}
                alt="Portfolio image"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}