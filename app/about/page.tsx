'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-gray-900 mb-6">
            Think different.
            <br />
            Build exceptional.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
            At Sahara Construction, we believe in the intersection of innovative design and flawless execution.
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
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-20 items-center"
          >
            <div>
              <h2 className="text-5xl font-light text-gray-900 mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded in 2015, Sahara Construction emerged from a simple belief: that construction 
                should be as beautiful as it is functional. What started as two friends with a vision 
                has grown into a leading construction company serving the UAE.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We approach every project with the same philosophy that drives the world's most 
                innovative companies: attention to detail, unwavering quality, and a relentless 
                pursuit of perfection.
              </p>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/construction-site.jpg"
                alt="Sahara Developers team working on luxury construction project in Bangalore"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co-founders Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6">Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionaries behind Sahara Construction who are redefining what's possible in the construction industry.
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
              <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-light text-gray-600">S</span>
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-2">Shahul</h3>
              <p className="text-lg text-gray-600 mb-6">Co-founder & CEO</p>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                With over 15 years of experience in construction management, Shahul brings a unique 
                blend of technical expertise and creative vision. His commitment to innovation has 
                positioned Sahara at the forefront of sustainable construction practices.
              </p>
            </motion.div>

            {/* Shoaib */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-light text-gray-600">S</span>
                </div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-2">Shoaib</h3>
              <p className="text-lg text-gray-600 mb-6">Co-founder & COO</p>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                A pioneer in operational excellence, Shoaib has revolutionized how construction 
                projects are delivered. His meticulous approach to quality control and client 
                satisfaction has earned Sahara its reputation for exceptional results.
              </p>
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
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly push boundaries, embracing new technologies and methods to deliver 
                exceptional results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every detail matters. We maintain the highest standards in materials, craftsmanship, 
                and execution.
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
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Partnership</h3>
              <p className="text-gray-600 leading-relaxed">
                We build lasting relationships with our clients, working collaboratively to bring 
                their visions to life.
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
            <h2 className="text-5xl font-light mb-8">Ready to build something extraordinary?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Let's create spaces that inspire and endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/quote"
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Start Your Project
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 border border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}