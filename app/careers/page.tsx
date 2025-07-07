'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase, Users, TrendingUp, Heart, Coffee, Gift } from 'lucide-react'

const openPositions = [
  {
    title: "Senior Architect",
    department: "Architecture",
    location: "BTM Layout, Bangalore",
    type: "Full-time",
    experience: "8-12 years",
    description: "Lead architectural design projects from concept to completion, mentor junior architects, and collaborate with clients."
  },
  {
    title: "Interior Designer",
    department: "Design",
    location: "BTM Layout, Bangalore",
    type: "Full-time",
    experience: "3-5 years",
    description: "Create innovative interior designs for residential and commercial projects, work with 3D visualization tools."
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "BTM Layout, Bangalore",
    type: "Full-time",
    experience: "5-8 years",
    description: "Manage construction projects end-to-end, coordinate with vendors, ensure timely delivery and quality standards."
  },
  {
    title: "Site Engineer",
    department: "Engineering",
    location: "On-site (Bangalore)",
    type: "Full-time",
    experience: "2-4 years",
    description: "Supervise construction activities on-site, ensure compliance with safety standards and technical specifications."
  },
  {
    title: "Business Development Executive",
    department: "Sales",
    location: "BTM Layout, Bangalore",
    type: "Full-time",
    experience: "2-5 years",
    description: "Drive new business opportunities, maintain client relationships, and achieve sales targets."
  },
  {
    title: "Junior Architect",
    department: "Architecture",
    location: "BTM Layout, Bangalore",
    type: "Full-time",
    experience: "0-2 years",
    description: "Assist in architectural drawings, 3D modeling, and project documentation. Fresh graduates welcome."
  }
]

const benefits = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear career progression paths and skill development programs"
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with industry experts in a collaborative environment"
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours and a healthy work environment"
  },
  {
    icon: Gift,
    title: "Performance Bonus",
    description: "Competitive salaries with performance-based incentives"
  },
  {
    icon: Briefcase,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and certifications"
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
            alt="Sahara team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Build Your Career
            <br />
            <span className="font-normal">With Sahara</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8 opacity-90">
            Join Bangalore's leading construction company and be part of projects that shape the city's future.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#0A5C36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Why Join Sahara */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Why Join Sahara?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a company that values innovation, excellence, and the growth of its people.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#0A5C36]/10 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-[#0A5C36]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                Our Culture
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Sahara Developers, we foster a culture of innovation, collaboration, and continuous learning. 
                Our team is our greatest asset, and we invest in creating an environment where everyone can thrive.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We believe in work-life balance, professional growth, and building lasting relationships. 
                Join us and be part of a team that's passionate about creating exceptional spaces.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <div className="text-3xl font-light text-[#0A5C36] mb-2">95%</div>
                  <p className="text-gray-600">Employee Satisfaction</p>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#0A5C36] mb-2">4.8/5</div>
                  <p className="text-gray-600">Glassdoor Rating</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
                alt="Sahara team meeting"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your perfect role and start building your career with us.
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-[#0A5C36] transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {position.type}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {position.experience}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {position.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0A5C36] text-white px-6 py-3 rounded-full font-medium hover:bg-[#084a2e] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined hiring process ensures we find the perfect match for both you and Sahara.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Apply Online", description: "Submit your application through our careers portal" },
              { step: "02", title: "Initial Screening", description: "Our HR team reviews your profile and experience" },
              { step: "03", title: "Technical Interview", description: "Meet with team leaders for technical assessment" },
              { step: "04", title: "Final Interview", description: "Discussion with directors and offer negotiation" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-extralight text-[#0A5C36] mb-4">{item.step}</div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0A5C36] text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Ready to Build Your Future?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Send us your resume and let's start a conversation about your career at Sahara.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:careers@saharadevelopers.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0A5C36] rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Send Your Resume
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Contact HR Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}