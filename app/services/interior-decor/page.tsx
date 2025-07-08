'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, X, MessageCircle, ArrowUpRight, Quote, Check, ChevronLeft, ChevronRight, Phone, Download, Palette, Home, Filter, Sparkles } from 'lucide-react'

export default function InteriorDecorPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const router = useRouter()
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && e.clientY <= 0 && !showExitPopup) {
        const exitPopupShown = localStorage.getItem('exitPopupShown')
        if (!exitPopupShown) {
          setShowExitPopup(true)
          localStorage.setItem('exitPopupShown', 'true')
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [showExitPopup])

  const services = [
    {
      title: "Residential Interiors",
      description: "Transform your home into a sophisticated sanctuary.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      features: ["Living Spaces", "Bedrooms", "Kitchens", "Bathrooms"]
    },
    {
      title: "Commercial Design",
      description: "Create inspiring workspaces that enhance productivity.",
      image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
      features: ["Offices", "Retail", "Hospitality", "Healthcare"]
    },
    {
      title: "Turnkey Solutions",
      description: "Complete design and execution from concept to completion.",
      image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      features: ["Space Planning", "3D Visualization", "Project Management", "Installation"]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'hospitality', label: 'Hospitality' }
  ]

  const portfolio = [
    { id: 1, title: "Minimalist Living Room", category: "Residential", image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", style: "Minimalist", budget: "Premium" },
    { id: 2, title: "Executive Office Suite", category: "Commercial", image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg", style: "Modern", budget: "Luxury" },
    { id: 3, title: "Modern Kitchen Design", category: "Residential", image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg", style: "Contemporary", budget: "Mid-range" },
    { id: 4, title: "Luxury Bedroom", category: "Residential", image: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg", style: "Classic", budget: "Premium" },
    { id: 5, title: "Restaurant Interior", category: "Hospitality", image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg", style: "Industrial", budget: "Mid-range" },
    { id: 6, title: "Boutique Hotel Lobby", category: "Hospitality", image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg", style: "Luxury", budget: "Premium" }
  ]

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category.toLowerCase() === activeFilter)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner, Bangalore",
      content: "Sahara transformed our apartment into a modern oasis. Their attention to detail and understanding of our lifestyle was exceptional.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Rajesh Kumar",
      role: "CEO, Tech Startup",
      content: "The office design by Sahara has completely changed our work culture. Our team is more productive and happier in the new space.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      name: "Anita Desai",
      role: "Restaurant Owner",
      content: "Working with Sahara was a dream. They captured our brand essence perfectly and created a space our customers love.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
    }
  ]

  const process = [
    { step: "01", title: "Consultation", description: "Understanding your vision, lifestyle, and requirements" },
    { step: "02", title: "Concept Design", description: "Creating mood boards and initial design concepts" },
    { step: "03", title: "3D Visualization", description: "Bringing your space to life with realistic renderings" },
    { step: "04", title: "Execution", description: "Managing the complete implementation process" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Luxury interior design"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center text-white max-w-5xl mx-auto px-6"
          style={{ opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.1] mb-6"
          >
            Interior Design<br />
            <span className="font-light">Redefined</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl mb-10 opacity-90 max-w-3xl mx-auto font-light"
          >
            Creating sophisticated spaces that reflect your unique style. 
            20+ years of transforming homes and offices in Bangalore.
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
              onClick={() => router.push('/quote')}
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all inline-flex items-center gap-2 shadow-xl"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/gallery')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all"
            >
              View Our Portfolio
            </motion.button>
          </motion.div>
        </motion.div>

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

      {/* Services Section with Apple-style Cards */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive interior design solutions tailored to your unique vision
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
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 mb-8 overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-light mb-3 group-hover:text-[#0A5C36] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-[#0A5C36] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Our Process</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A seamless journey from concept to completion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-extralight text-[#0A5C36] mb-4">{item.step}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Gallery with Filtering */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore our portfolio of beautifully designed spaces
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all inline-flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-[#0A5C36] text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#0A5C36]'
                }`}
              >
                <Filter className="w-4 h-4" />
                {filter.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPortfolio.map((project, index) => (
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
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <p className="text-sm mb-1 opacity-80">{project.category}</p>
                      <h3 className="text-xl font-light mb-2">{project.title}</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur rounded text-xs">
                          {project.style}
                        </span>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur rounded text-xs">
                          {project.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>

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
              onClick={() => router.push('/gallery')}
              className="bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2"
            >
              View Full Portfolio
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Interactive 360° Room Viewer */}
      <section className="py-24 sm:py-32 bg-[#0A5C36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Experience Our Spaces</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Take a virtual tour of our latest projects. Click and drag to explore 360° views.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center hover:bg-white/20 transition-colors cursor-pointer group"
              onClick={() => router.push('/virtual-tour')}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-light mb-3">Living Spaces</h3>
              <p className="text-white/70 mb-6">Explore our residential designs in immersive 360°</p>
              <span className="text-white/90 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Start Tour <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center hover:bg-white/20 transition-colors cursor-pointer group"
              onClick={() => router.push('/virtual-tour')}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-light mb-3">Office Spaces</h3>
              <p className="text-white/70 mb-6">Walk through our commercial interior designs</p>
              <span className="text-white/90 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Start Tour <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center hover:bg-white/20 transition-colors cursor-pointer group"
              onClick={() => router.push('/virtual-tour')}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-light mb-3">Hospitality</h3>
              <p className="text-white/70 mb-6">Experience our hotel and restaurant designs</p>
              <span className="text-white/90 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Start Tour <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Client Stories</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear from those who've experienced the Sahara difference
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm"
              >
                <Quote className="w-10 h-10 text-[#0A5C36] mb-6 opacity-50" />
                <p className="text-xl sm:text-2xl font-light text-gray-800 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full border border-gray-300 hover:border-[#0A5C36] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 rounded-full border border-gray-300 hover:border-[#0A5C36] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-light mb-6">
                Crafting Spaces.<br />
                <span className="text-[#0A5C36]">Creating Experiences.</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over 20 years of experience in Bangalore's dynamic design landscape, 
                Sahara Developers has become synonymous with exceptional interior design 
                that seamlessly blends aesthetics with functionality.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our philosophy is simple: every space should tell a story. We believe in 
                creating environments that not only look beautiful but also enhance the 
                way you live and work.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-light text-[#0A5C36] mb-2">500+</div>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#0A5C36] mb-2">20+</div>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#0A5C36] mb-2">100%</div>
                  <p className="text-sm text-gray-600">Client Satisfaction</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/about')}
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
                src="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg"
                alt="Sahara Developers Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-[#0A5C36] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Start Your Project Today
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              Get a free consultation and download our exclusive interior design 
              style guide to discover the latest trends and ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/quote')}
                className="bg-white text-[#0A5C36] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Book Free Consultation
                <Phone className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    alert('Style guide download coming soon!')
                  }
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                Download Style Guide
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Book Consultation Button */}
      <motion.button
        onClick={() => router.push('/quote')}
        className="fixed bottom-24 right-6 bg-[#0A5C36] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#084a2e] transition-colors z-40 font-medium flex items-center gap-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Free Consultation
        <Phone className="w-4 h-4" />
      </motion.button>

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
                Get 10% off your first interior design package when you book a consultation today.
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