"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactSectionMinimal() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="apple-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="apple-display-text apple-mb-md">
            Let's create something extraordinary.
          </h2>
          
          <p className="apple-body-large apple-text-muted apple-mb-xl">
            Whether you're planning a new construction project or transforming your existing space, 
            we're here to bring your vision to life.
          </p>
          
          {/* Contact Options - Integrated naturally */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 apple-mb-xl">
            <div className="apple-card text-center">
              <div className="apple-headline-text mb-2">Call</div>
              <a href="tel:+919591837216" className="apple-link">
                +91 9591 837216
              </a>
            </div>
            
            <div className="apple-card text-center">
              <div className="apple-headline-text mb-2">Email</div>
              <a href="mailto:info@saharadevelopers.in" className="apple-link">
                info@saharadevelopers.in
              </a>
            </div>
            
            <div className="apple-card text-center">
              <div className="apple-headline-text mb-2">Visit</div>
              <p className="apple-caption">
                BTM Layout, Bangalore
              </p>
            </div>
          </div>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="apple-button apple-button-primary">
              Start Your Project
            </Link>
            <Link href="/consultation" className="apple-button apple-button-secondary">
              Book Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}