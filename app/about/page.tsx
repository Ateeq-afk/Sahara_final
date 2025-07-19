'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Users, Award, Leaf, Clock, Target, Sparkles, TrendingUp, Shield, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  }

  return (
    <div className="apple-page">
      {/* Hero Section with Video Background */}
      <section className="relative apple-hero min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="apple-container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="apple-hero-content text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Celebrating 20+ Years of Excellence</span>
            </motion.div>
            
            <h1 className="apple-display-text apple-text-center apple-mb-md">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                Building Dreams.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Creating Legacy.
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="apple-body-large apple-text-muted apple-text-center max-w-3xl mx-auto"
            >
              Two decades of excellence in construction and interior design, 
              transforming Bangalore's skyline with innovation, sustainability, and unmatched craftsmanship.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex gap-4 justify-center"
            >
              <Link href="/portfolio" className="apple-button apple-button-primary">
                View Our Work
              </Link>
              <Link href="#our-story" className="apple-button apple-button-secondary">
                Learn Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story with Timeline */}
      <section id="our-story" className="apple-section">
        <div className="apple-container">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6"
              >
                <Clock className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Our Journey Through Time</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                From humble beginnings to industry leadership, every milestone tells a story of passion, perseverance, and excellence.
              </p>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-indigo-400"></div>
              
              {/* Timeline Events */}
              <motion.div
                {...staggerChildren}
                className="space-y-16"
              >
                {/* 2003 - Foundation */}
                <motion.div
                  {...fadeInUp}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-5/12 text-right pr-8">
                    <span className="apple-display-text text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2003</span>
                    <h3 className="apple-title-text mt-2">The Beginning</h3>
                    <p className="apple-body apple-text-muted mt-2">
                      Started with a small team of 5 passionate individuals in BTM Layout, driven by a vision to revolutionize construction in Bangalore.
                    </p>
                  </div>
                  <div className="w-5/12"></div>
                </motion.div>
                
                {/* 2008 - First Major Project */}
                <motion.div
                  {...fadeInUp}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-5/12"></div>
                  <div className="w-5/12 pl-8">
                    <span className="apple-display-text text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2008</span>
                    <h3 className="apple-title-text mt-2">First Landmark Project</h3>
                    <p className="apple-body apple-text-muted mt-2">
                      Completed our first major commercial complex in JP Nagar, establishing our reputation for quality and timely delivery.
                    </p>
                  </div>
                </motion.div>
                
                {/* 2015 - Expansion */}
                <motion.div
                  {...fadeInUp}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-5/12 text-right pr-8">
                    <span className="apple-display-text text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2015</span>
                    <h3 className="apple-title-text mt-2">Expansion & Innovation</h3>
                    <p className="apple-body apple-text-muted mt-2">
                      Launched our interior design division and introduced 3D visualization technology, becoming pioneers in integrated construction solutions.
                    </p>
                  </div>
                  <div className="w-5/12"></div>
                </motion.div>
                
                {/* 2020 - Digital Transformation */}
                <motion.div
                  {...fadeInUp}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-5/12"></div>
                  <div className="w-5/12 pl-8">
                    <span className="apple-display-text text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2020</span>
                    <h3 className="apple-title-text mt-2">Digital Revolution</h3>
                    <p className="apple-body apple-text-muted mt-2">
                      Embraced digital transformation with AI-powered project management, VR walkthroughs, and sustainable building practices.
                    </p>
                  </div>
                </motion.div>
                
                {/* 2024 - Present */}
                <motion.div
                  {...fadeInUp}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
                  <div className="w-5/12 text-right pr-8">
                    <span className="apple-display-text text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Today</span>
                    <h3 className="apple-title-text mt-2">Industry Leaders</h3>
                    <p className="apple-body apple-text-muted mt-2">
                      500+ projects, 1000+ happy families, and counting. Leading Bangalore's construction industry with innovation and excellence.
                    </p>
                  </div>
                  <div className="w-5/12"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="apple-section bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="apple-container">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6"
              >
                <Users className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Meet Our Visionaries</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                The driving force behind Sahara's success story - leaders who inspire, innovate, and deliver excellence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Shahul */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="apple-card overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-2xl font-bold">Shahul</h3>
                    <p className="text-sm opacity-90">Director & Co-Founder</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">20+ Years Experience</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Sustainability Expert</span>
                  </div>
                  <p className="apple-body apple-text-muted mb-4">
                    With over two decades of experience in construction management, Shahul brings unparalleled 
                    expertise in project execution and quality control. His vision for sustainable construction 
                    has positioned Sahara at the forefront of eco-friendly building practices.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Specialization:</strong> Project Management, Quality Control</p>
                    <p className="text-sm text-gray-600"><strong>Education:</strong> M.Tech in Civil Engineering, IIT Madras</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Farhan */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="apple-card overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-2xl font-bold">Farhan Shoaib</h3>
                    <p className="text-sm opacity-90">Director & Co-Founder</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Design Innovation</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Client Relations</span>
                  </div>
                  <p className="apple-body apple-text-muted mb-4">
                    A pioneer in innovative design solutions, Farhan has revolutionized how we approach 
                    interior spaces. His commitment to client satisfaction and attention to detail has 
                    earned Sahara its reputation as Bangalore's most trusted construction partner.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Specialization:</strong> Interior Design, Client Management</p>
                    <p className="text-sm text-gray-600"><strong>Education:</strong> B.Arch, CEPT University</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Core Team */}
            <motion.div
              {...fadeInUp}
              className="mt-16"
            >
              <h3 className="apple-title-text text-center mb-8">Our Core Team</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Priya Sharma", role: "Head of Design", experience: "15+ Years" },
                  { name: "Rakesh Kumar", role: "Project Director", experience: "18+ Years" },
                  { name: "Anjali Nair", role: "Quality Head", experience: "12+ Years" },
                  { name: "Mohammed Ali", role: "Operations Head", experience: "16+ Years" }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-blue-600 mt-1">{member.experience}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="apple-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        <div className="apple-container relative z-10">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-2xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="apple-headline-text apple-mb-md">Our Mission</h2>
                  <p className="apple-body-large apple-text-muted mb-6">
                    To transform spaces into extraordinary living experiences through innovative design, 
                    superior craftsmanship, and unwavering commitment to client satisfaction.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Deliver projects that exceed expectations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Foster innovation in every design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Build lasting relationships with clients</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-100 rounded-full opacity-20 blur-2xl"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl mb-6">
                    <Lightbulb className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="apple-headline-text apple-mb-md">Our Vision</h2>
                  <p className="apple-body-large apple-text-muted mb-6">
                    To be the most trusted and innovative construction company in India, setting new standards 
                    for quality, sustainability, and customer experience in the industry.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Lead the industry in sustainable practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Expand across major Indian cities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2"></div>
                      <span className="apple-body apple-text-muted">Empower communities through construction</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="apple-section bg-gradient-to-b from-gray-50 to-white">
        <div className="apple-container">
          <motion.div
            {...fadeInUp}
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6"
              >
                <Shield className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Values That Define Us</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                Our core values guide every decision, shape every project, and define our relationships with clients and communities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We maintain the highest standards in every aspect of our work, from materials selection to final finishing touches.",
                  points: ["ISO 9001:2015 Certified", "Zero-defect policy", "Premium materials only"],
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We embrace cutting-edge technology and sustainable practices to deliver future-ready solutions.",
                  points: ["AI-powered planning", "3D visualization", "Smart home integration"],
                  gradient: "from-indigo-500 to-purple-600"
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description: "We build trust through transparency, honest communication, and delivering on our promises.",
                  points: ["Transparent pricing", "Regular updates", "No hidden costs"],
                  gradient: "from-green-500 to-teal-600"
                },
                {
                  icon: Users,
                  title: "Customer First",
                  description: "Every decision we make prioritizes our clients' needs, preferences, and satisfaction.",
                  points: ["24/7 support", "Lifetime warranty", "Personalized service"],
                  gradient: "from-orange-500 to-red-600"
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  description: "We're committed to eco-friendly practices that protect our planet for future generations.",
                  points: ["Green building certified", "Waste reduction", "Energy efficiency"],
                  gradient: "from-green-600 to-emerald-600"
                },
                {
                  icon: TrendingUp,
                  title: "Growth Mindset",
                  description: "We continuously learn, adapt, and evolve to stay ahead in an ever-changing industry.",
                  points: ["Regular training", "Industry partnerships", "R&D investment"],
                  gradient: "from-purple-500 to-pink-600"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="apple-card h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="apple-title-text apple-mb-sm">{value.title}</h3>
                    <p className="apple-body apple-text-muted mb-4">
                      {value.description}
                    </p>
                    <ul className="space-y-2">
                      {value.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="apple-section relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="apple-container relative z-10">
          <motion.div
            {...fadeInUp}
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl mb-6"
              >
                <Award className="w-8 h-8 text-orange-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Our Achievements</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence and the trust our clients place in us.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
              {[
                { number: "500+", label: "Projects Completed", suffix: "", color: "from-blue-600 to-indigo-600" },
                { number: "20", label: "Years of Excellence", suffix: "+", color: "from-green-600 to-teal-600" },
                { number: "1000", label: "Happy Families", suffix: "+", color: "from-purple-600 to-pink-600" },
                { number: "98", label: "Client Satisfaction", suffix: "%", color: "from-orange-600 to-red-600" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative inline-block">
                    <div className={`apple-display-text text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}{stat.suffix}
                    </div>
                  </div>
                  <p className="apple-body apple-text-muted mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Awards Section */}
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12"
            >
              <h3 className="apple-title-text text-center mb-8">Awards & Recognition</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { year: "2023", award: "Best Construction Company", org: "Karnataka Building Excellence Awards" },
                  { year: "2023", award: "Green Building Pioneer", org: "Indian Green Building Council" },
                  { year: "2022", award: "Customer Choice Award", org: "Bangalore Real Estate Summit" },
                  { year: "2022", award: "Innovation in Design", org: "Architectural Digest India" },
                  { year: "2021", award: "Quality Excellence", org: "Construction Industry Awards" },
                  { year: "2020", award: "Sustainability Champion", org: "Environmental Excellence Forum" },
                ].map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{award.award}</p>
                      <p className="text-sm text-gray-600">{award.org}</p>
                      <p className="text-xs text-gray-500 mt-1">{award.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sustainability & CSR */}
      <section className="apple-section bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="apple-container">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl mb-6"
              >
                <Leaf className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Building a Sustainable Future</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                Our commitment to the environment and community goes beyond construction - it's about creating a better tomorrow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Environmental Initiatives */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="apple-title-text mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  Environmental Initiatives
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Carbon Neutral by 2030", desc: "Committed to achieving net-zero emissions across all operations" },
                    { title: "100% Waste Recycling", desc: "Construction waste management with 100% recycling rate" },
                    { title: "Green Building Certified", desc: "All projects IGBC Gold certified or higher" },
                    { title: "Rainwater Harvesting", desc: "Mandatory rainwater collection in all residential projects" },
                    { title: "Solar Integration", desc: "Solar panels standard in all new constructions" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* CSR Initiatives */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="apple-title-text mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  Community Impact
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Skill Development Program", desc: "Training 500+ construction workers annually" },
                    { title: "Affordable Housing", desc: "10% of projects dedicated to affordable homes" },
                    { title: "Education Support", desc: "Scholarships for 100+ children of construction workers" },
                    { title: "Healthcare Camps", desc: "Monthly health checkups for workers and families" },
                    { title: "Women Empowerment", desc: "30% women workforce in design and management roles" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Impact Numbers */}
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-8">Our Environmental Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "50%", label: "Energy Reduction" },
                  { number: "1M+", label: "Trees Planted" },
                  { number: "70%", label: "Water Saved" },
                  { number: "Zero", label: "Landfill Waste" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="apple-section">
        <div className="apple-container">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6"
              >
                <Building2 className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h2 className="apple-headline-text apple-mb-md">Our Process</h2>
              <p className="apple-body-large apple-text-muted max-w-2xl mx-auto">
                A streamlined approach that ensures transparency, quality, and timely delivery at every step.
              </p>
            </div>
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "Understanding your vision, requirements, and budget to create the perfect plan.",
                  icon: "🤝"
                },
                {
                  step: "02",
                  title: "Design & Planning",
                  description: "Creating detailed designs with 3D visualization and getting your approval.",
                  icon: "📐"
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Expert construction with regular updates and quality checks at every stage.",
                  icon: "🏗️"
                },
                {
                  step: "04",
                  title: "Handover",
                  description: "Final inspection, documentation, and seamless handover with warranty.",
                  icon: "🔑"
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -z-10"></div>
                  )}
                  
                  <div className="text-center">
                    <div className="inline-block">
                      <div className="text-5xl mb-4">{process.icon}</div>
                      <div className="text-xs font-bold text-blue-600 mb-2">STEP {process.step}</div>
                      <h3 className="apple-title-text mb-2">{process.title}</h3>
                      <p className="apple-body apple-text-muted">{process.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="apple-section apple-section-dark">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="apple-text-center"
          >
            <h2 className="apple-display-text apple-mb-md">
              Let's Build Something Extraordinary
            </h2>
            <p className="apple-body-large apple-mb-xl max-w-2xl mx-auto">
              Ready to transform your vision into reality? We're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="apple-button apple-button-primary">
                Start Your Project →
              </Link>
              <Link href="/contact" className="apple-button apple-button-secondary">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}