'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="apple-page">
      {/* Hero Section */}
      <section className="apple-hero">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="apple-hero-content"
          >
            <h1 className="apple-display-text apple-text-center apple-mb-md">
              Building Dreams.
              <br />
              Creating Legacy.
            </h1>
            <p className="apple-body-large apple-text-muted apple-text-center max-w-3xl mx-auto">
              Two decades of excellence in construction and interior design, 
              transforming Bangalore's skyline one project at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="apple-section">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-lg">Our Story</h2>
            
            <div className="apple-prose mx-auto">
              <p className="apple-body-large apple-text-muted apple-mb-md">
                Founded in 2003, Sahara Developers emerged from a shared vision between two passionate 
                entrepreneurs who believed that construction should be an art form. What started as a 
                small team in BTM Layout has grown into Bangalore's most trusted name in construction 
                and interior design.
              </p>
              
              <p className="apple-body-large apple-text-muted apple-mb-md">
                Over two decades, we've completed more than 500 projects, from intimate home renovations 
                to large-scale commercial developments. Our journey has been marked by an unwavering 
                commitment to quality, innovation, and client satisfaction.
              </p>
              
              <p className="apple-body-large apple-text-muted">
                Today, we continue to push boundaries, integrating cutting-edge technology with timeless 
                craftsmanship to create spaces that inspire and endure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="apple-section bg-gray-50">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-lg">Leadership</h2>
            
            <div className="apple-prose mx-auto">
              <p className="apple-body-large apple-text-muted apple-mb-lg apple-text-center">
                Visionary leaders who have shaped Sahara Developers into Bangalore's 
                premier construction company.
              </p>
              
              <div className="space-y-12">
                <div>
                  <h3 className="apple-title-text apple-mb-sm">Shahul</h3>
                  <p className="apple-caption apple-text-muted apple-mb-md">Director & Co-Founder</p>
                  <p className="apple-body apple-text-muted">
                    With over 20 years of experience in construction management, Shahul brings unparalleled 
                    expertise in project execution and quality control. His vision for sustainable construction 
                    has positioned Sahara at the forefront of eco-friendly building practices in Bangalore.
                  </p>
                </div>
                
                <div>
                  <h3 className="apple-title-text apple-mb-sm">Farhan Shoaib</h3>
                  <p className="apple-caption apple-text-muted apple-mb-md">Director & Co-Founder</p>
                  <p className="apple-body apple-text-muted">
                    A pioneer in innovative design solutions, Farhan has revolutionized how we approach 
                    interior spaces. His commitment to client satisfaction and attention to detail has 
                    earned Sahara its reputation as Bangalore's most trusted construction partner.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="apple-section">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-lg">Our Mission</h2>
            
            <div className="apple-prose mx-auto apple-text-center">
              <p className="apple-body-large apple-text-muted">
                To transform spaces into extraordinary living experiences through innovative design, 
                superior craftsmanship, and unwavering commitment to client satisfaction. We believe 
                every project is an opportunity to create something truly remarkable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="apple-section bg-gray-50">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-xl">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="apple-card apple-text-center"
              >
                <h3 className="apple-title-text apple-mb-sm">Excellence</h3>
                <p className="apple-body apple-text-muted">
                  We maintain the highest standards in every aspect of our work, from materials 
                  selection to final finishing touches.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="apple-card apple-text-center"
              >
                <h3 className="apple-title-text apple-mb-sm">Innovation</h3>
                <p className="apple-body apple-text-muted">
                  We embrace cutting-edge technology and sustainable practices to deliver 
                  future-ready solutions.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="apple-card apple-text-center"
              >
                <h3 className="apple-title-text apple-mb-sm">Integrity</h3>
                <p className="apple-body apple-text-muted">
                  We build trust through transparency, honest communication, and delivering 
                  on our promises.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="apple-section">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-xl">By the Numbers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto apple-text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="apple-display-text">500+</div>
                <p className="apple-body apple-text-muted">Projects Completed</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="apple-display-text">20+</div>
                <p className="apple-body apple-text-muted">Years of Excellence</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="apple-display-text">1000+</div>
                <p className="apple-body apple-text-muted">Happy Families</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="apple-display-text">50+</div>
                <p className="apple-body apple-text-muted">Design Awards</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitment to Sustainability */}
      <section className="apple-section bg-gray-50">
        <div className="apple-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="apple-headline-text apple-text-center apple-mb-lg">
              Commitment to Sustainability
            </h2>
            
            <div className="apple-prose mx-auto">
              <p className="apple-body-large apple-text-muted apple-text-center apple-mb-md">
                We believe in building for the future while protecting it.
              </p>
              
              <p className="apple-body apple-text-muted">
                At Sahara Developers, sustainability isn't just a buzzword—it's a core principle that 
                guides every project. From using eco-friendly materials to implementing energy-efficient 
                designs, we're committed to reducing our environmental footprint while creating spaces 
                that stand the test of time.
              </p>
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