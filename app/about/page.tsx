'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Users, Building, Briefcase } from 'lucide-react'

const teamMembers = [
  {
    name: "Anitha Reddy",
    role: "Head of Architecture",
    description: "15+ years crafting innovative architectural solutions",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg"
  },
  {
    name: "Rajesh Kumar",
    role: "Chief Project Manager",
    description: "Expert in delivering complex projects on time and budget",
    image: "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg"
  },
  {
    name: "Priya Nair",
    role: "Interior Design Director",
    description: "Award-winning designer with a passion for minimalist spaces",
    image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg"
  },
  {
    name: "Mohammed Ali",
    role: "Head of Engineering",
    description: "20+ years ensuring structural excellence and safety",
    image: "https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg"
  },
  {
    name: "Sneha Patil",
    role: "Client Relations Director",
    description: "Dedicated to exceptional client experiences",
    image: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg"
  },
  {
    name: "Vikram Singh",
    role: "Sustainability Lead",
    description: "Pioneering eco-friendly construction practices",
    image: "https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 mb-4 sm:mb-6">
            Building Dreams.
            <br />
            <span className="text-[#0A5C36]">Creating Legacy.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto"
            Two decades of excellence in construction and interior design, transforming Bangalore's skyline one project at a time.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-[1px] h-20 bg-gray-300 mx-auto" />
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 sm:mb-8">Our Story</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Founded in 2003, Sahara Developers emerged from a shared vision between two passionate 
                entrepreneurs who believed that construction should be an art form. What started as a 
                small team in BTM Layout has grown into Bangalore's most trusted name in construction 
                and interior design.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Over two decades, we've completed more than 500 projects, from intimate home renovations 
                to large-scale commercial developments. Our journey has been marked by an unwavering 
                commitment to quality, innovation, and client satisfaction.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Today, we continue to push boundaries, integrating cutting-edge technology with timeless 
                craftsmanship to create spaces that inspire and endure.
              </p>
            </div>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg"
                alt="Sahara Developers office in Bangalore"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">Our Directors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leaders who have shaped Sahara Developers into Bangalore's premier construction company.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Shahul */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg"
                  alt="Shahul - Director"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-2">Shahul</h3>
              <p className="text-lg text-[#0A5C36] font-medium mb-6">Director & Co-Founder</p>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                With over 20 years of experience in construction management, Shahul brings unparalleled 
                expertise in project execution and quality control. His vision for sustainable construction 
                has positioned Sahara at the forefront of eco-friendly building practices in Bangalore.
              </p>
            </motion.div>

            {/* Farhan Shoaib */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg"
                  alt="Farhan Shoaib - Director"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-2">Farhan Shoaib</h3>
              <p className="text-lg text-[#0A5C36] font-medium mb-6">Director & Co-Founder</p>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                A pioneer in innovative design solutions, Farhan has revolutionized how we approach 
                interior spaces. His commitment to client satisfaction and attention to detail has 
                earned Sahara its reputation as Bangalore's most trusted construction partner.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented professionals who bring expertise, creativity, and dedication to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#0A5C36] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-light text-[#0A5C36] mb-2">500+</div>
              <p className="text-gray-600">Projects Completed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-light text-[#0A5C36] mb-2">20+</div>
              <p className="text-gray-600">Years Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-light text-[#0A5C36] mb-2">50+</div>
              <p className="text-gray-600">Team Members</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-light text-[#0A5C36] mb-2">100%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <Award className="w-12 h-12 text-[#0A5C36]" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards in every aspect of our work, from materials 
                selection to final finishing touches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We work closely with clients, architects, and partners to ensure every project 
                exceeds expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                <Building className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace cutting-edge technology and sustainable practices to deliver 
                future-ready solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-8">Join Our Journey</h2>
            <p className="text-xl text-gray-300 mb-12">
              Whether you're looking to build your dream project or join our talented team, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A5C36] text-white rounded-full hover:bg-[#084a2e] transition-colors duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                View Careers
                <Briefcase className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}