"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Shield,
  Clock,
  Users,
  Hammer,
  Home,
  ChevronRight,
  Star,
  Award,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2400&q=95",
    title: "Building Excellence",
    subtitle: "Crafting architectural masterpieces"
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2400&q=95",
    title: "Premium Construction",
    subtitle: "Where quality meets innovation"
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2400&q=95",
    title: "Dream Homes",
    subtitle: "Turning visions into reality"
  }
]

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes, villas, and luxury apartments built to perfection",
    features: ["Custom Design", "Premium Materials", "Energy Efficient", "Smart Home Ready"],
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Office spaces, retail complexes, and commercial buildings",
    features: ["Modern Architecture", "Sustainable Design", "Cost Effective", "Timely Delivery"],
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Hammer,
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with modern upgrades and design",
    features: ["Structure Enhancement", "Modern Upgrades", "Space Optimization", "Quality Finish"],
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: Shield,
    title: "Project Management",
    description: "End-to-end construction management with transparency",
    features: ["Timeline Management", "Quality Control", "Cost Monitoring", "Regular Updates"],
    gradient: "from-amber-500 to-amber-600"
  }
]

const processSteps = [
  {
    number: "01",
    title: "Consultation & Planning",
    description: "Understanding your vision and requirements",
    details: ["Site Analysis", "Budget Planning", "Design Concepts", "Timeline Setup"]
  },
  {
    number: "02",
    title: "Design & Architecture",
    description: "Creating detailed blueprints and 3D visualizations",
    details: ["Architectural Plans", "3D Modeling", "Material Selection", "Permits & Approvals"]
  },
  {
    number: "03",
    title: "Construction Phase",
    description: "Expert execution with quality materials",
    details: ["Foundation Work", "Structure Building", "MEP Installation", "Interior Work"]
  },
  {
    number: "04",
    title: "Quality & Handover",
    description: "Thorough inspection and project delivery",
    details: ["Quality Checks", "Finishing Touches", "Documentation", "Key Handover"]
  }
]

const projects = [
  {
    title: "Luxury Villa - Whitefield",
    category: "Residential",
    area: "5,500 sq ft",
    duration: "18 months",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=95",
    features: ["Smart Home", "Pool", "Garden"]
  },
  {
    title: "Modern Apartments - Indiranagar",
    category: "Residential Complex",
    area: "45,000 sq ft",
    duration: "24 months",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=95",
    features: ["24 Units", "Amenities", "Parking"]
  },
  {
    title: "Corporate Office - MG Road",
    category: "Commercial",
    area: "25,000 sq ft",
    duration: "12 months",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=95",
    features: ["Modern Design", "Green Building", "Tech Ready"]
  },
  {
    title: "Boutique Hotel - Koramangala",
    category: "Hospitality",
    area: "35,000 sq ft",
    duration: "20 months",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=95",
    features: ["50 Rooms", "Restaurant", "Spa"]
  },
  {
    title: "Contemporary Home - JP Nagar",
    category: "Residential",
    area: "4,200 sq ft",
    duration: "14 months",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=95",
    features: ["Minimalist", "Eco-Friendly", "Open Plan"]
  },
  {
    title: "Shopping Complex - Electronic City",
    category: "Commercial",
    area: "60,000 sq ft",
    duration: "28 months",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=95",
    features: ["Retail Spaces", "Food Court", "Multiplex"]
  }
]

const stats = [
  { icon: Building2, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Expert Team" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Clock, value: "20+", label: "Years Experience" }
]

export default function ConstructionPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const projectsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })
  
  const { scrollY } = useScroll()
  const yTransform = useTransform(scrollY, [0, 800], [0, 200])
  const scaleTransform = useTransform(scrollY, [0, 800], [1, 1.2])
  const opacityTransform = useTransform(scrollY, [0, 600], [1, 0])

  // Auto-cycle slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yTransform, scale: scaleTransform }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover"
                priority
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-8"
          style={{ 
            opacity: opacityTransform,
            x: mousePosition.x,
            y: mousePosition.y 
          }}
        >
          <div className="max-w-5xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600/30 bg-amber-50 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium tracking-wider">
                  PREMIUM CONSTRUCTION SERVICES
                </span>
              </div>
            </motion.div>

            {/* Dynamic Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-8">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-amber-600 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group h-16 px-10 text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full font-medium transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
                asChild
              >
                <Link href="/quote" className="flex items-center gap-3">
                  <span>Start Your Project</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg text-gray-900 hover:bg-gray-100 rounded-full font-medium backdrop-blur-md transition-all duration-500 border-2 border-gray-300 hover:border-gray-400 hover:scale-105"
                asChild
              >
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative group"
              >
                <div className={`w-16 h-1 transition-all duration-500 ${
                  currentSlide === index ? 'bg-amber-600' : 'bg-gray-400/50 hover:bg-gray-600/50'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Construction Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction solutions tailored to your unique requirements
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: `linear-gradient(to right, ${service.gradient.split(' ')[1]}, ${service.gradient.split(' ')[3]})`
                    }}
                  />
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Construction Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring quality and transparency at every stage
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 hidden lg:block" />
            
            <div className="space-y-24">
              {processSteps.map((step, index) => {
                const isEven = index % 2 === 0
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={processInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className="flex-1">
                        <div className={`bg-white rounded-3xl p-8 shadow-lg ${isEven ? 'lg:text-right' : ''}`}>
                          <div className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:justify-end' : ''}`}>
                            <span className="text-5xl font-bold text-amber-200">{step.number}</span>
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-6">{step.description}</p>
                          <div className={`grid grid-cols-2 gap-3 ${isEven ? 'lg:text-right' : ''}`}>
                            {step.details.map((detail, i) => (
                              <div key={i} className={`flex items-center gap-2 ${isEven ? 'lg:justify-end' : ''}`}>
                                <div className="w-2 h-2 bg-amber-600 rounded-full" />
                                <span className="text-sm text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Number Circle */}
                      <div className="hidden lg:flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-2xl"
                        >
                          <span className="text-3xl font-semibold text-white">{step.number}</span>
                        </motion.div>
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden lg:block" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section ref={projectsRef} className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successfully completed construction projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(index)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2 mb-3">
                      {project.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs text-gray-900">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="text-amber-600 text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Layers className="w-4 h-4" />
                      {project.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full px-8"
              asChild
            >
              <Link href="/gallery">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Use deterministic values based on index instead of Math.random
            const xStart = ((i * 5) % 100) + '%';
            const xEnd = `${((i * 7) % 100)}%`;
            const duration = 20 + (i % 10) * 2;
            const delay = (i % 20);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
                initial={{ 
                  x: xStart,
                  y: '110%'
                }}
                animate={{ 
                  y: '-10%',
                  x: xEnd
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: delay
                }}
              />
            );
          })}
        </div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Build Your Dream?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Let's discuss your project and create something extraordinary together
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-16 px-10 text-lg bg-gray-900 text-white hover:bg-gray-800 rounded-full font-medium transition-all duration-500 hover:scale-105 hover:shadow-xl"
                asChild
              >
                <Link href="/quote">
                  Get Free Quote
                  <Star className="ml-2 h-5 w-5 text-amber-400" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg border-gray-900 text-gray-900 hover:bg-gray-100 rounded-full font-medium transition-all duration-500 hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}