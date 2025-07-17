"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageSquare, Youtube, ArrowUp, ArrowRight } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services/construction', label: 'Construction' },
    { href: '/services/interior-decor', label: 'Interior Design' },
    { href: '/services/renovations', label: 'Renovation' },
    { href: '/consultation', label: 'Consultation' }
  ],
  explore: {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/projects', label: 'Portfolio' },
      { href: '/testimonials', label: 'Testimonials' },
      { href: '/blog', label: 'Blog' }
    ],
    help: [
      { href: '/contact', label: 'Contact' },
      { href: '/faq', label: 'FAQ' },
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' }
    ],
    getStarted: [
      { href: '/quote', label: 'Get Free Quote' },
      { href: '/contact#visit', label: 'Schedule Site Visit' },
      { href: '/projects', label: 'View Projects' },
      { href: '/services', label: 'Our Services' }
    ]
  }
}

export default function FooterMinimal() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* CTA Section above footer */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-light mb-2">Start building your dream space today.</h3>
              <p className="text-gray-600">Connect with our expert project team for a personalized consultation.</p>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[#D26700] font-medium hover:gap-3 transition-all duration-300"
            >
              Talk to our project team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#1c1c1c] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-x-12">
            {/* Brand Column */}
            <section className="lg:col-span-1 space-y-4" aria-labelledby="company-heading">
              <h3 id="company-heading" className="font-semibold text-lg mb-4">Sahara Developers</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Crafting exceptional spaces in Bangalore for over 20 years.
              </p>
              
              {/* Contact Info */}
              <address className="space-y-3 not-italic text-sm">
                <motion.a 
                  href="tel:+919591837216" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 95918 37216</span>
                </motion.a>
                
                <motion.a 
                  href="https://wa.me/919591837216?text=Hi!%20I'm%20interested%20in%20your%20construction%20services" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </motion.a>
                
                <motion.a 
                  href="mailto:info@saharadevelopers.in" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <Mail className="w-4 h-4" />
                  <span>info@saharadevelopers.in</span>
                </motion.a>
                
                <motion.div className="space-y-1">
                  <motion.a 
                    href="https://maps.google.com/?q=100-feet+Ring+Road+8th+Main+Road+BTM+Layout+1st+Stage+Bangalore+560029" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <div>
                      <p>100-feet Ring Road, 8th Main Road</p>
                      <p>BTM Layout 1st Stage</p>
                      <p>Bangalore - 560029</p>
                    </div>
                  </motion.a>
                  <p className="text-gray-500 text-xs ml-7">Mon-Sat: 9:00 AM - 6:00 PM</p>
                </motion.div>
              </address>
              
              {/* Social Media Links */}
              <div className="flex gap-3 pt-6">
                <motion.a 
                  href="https://facebook.com/saharadevelopers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com/saharadevs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a 
                  href="https://instagram.com/saharadevelopers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/company/sahara-developers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a 
                  href="https://youtube.com/@saharadevelopers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </section>
            
            {/* Services Column */}
            <nav className="lg:col-span-1" aria-label="Services navigation">
              <h4 className="font-semibold text-base mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-[15px] text-gray-400 hover:text-white transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Explore Column - Merged */}
            <nav className="lg:col-span-2" aria-label="Explore navigation">
              <h4 className="font-semibold text-base mb-4">Explore</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Company Subgroup */}
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Company</h5>
                  <ul className="space-y-1.5">
                    {footerLinks.explore.company.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="text-[15px] text-gray-400 hover:text-white transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Help Subgroup */}
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Help</h5>
                  <ul className="space-y-1.5">
                    {footerLinks.explore.help.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="text-[15px] text-gray-400 hover:text-white transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Get Started Subgroup */}
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Get Started</h5>
                  <ul className="space-y-1.5">
                    {footerLinks.explore.getStarted.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="text-[15px] text-gray-400 hover:text-[#D26700] transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800/50 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2024 Sahara Developers. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  RERA Registration: PRM/KA/RERA/1251/309/PR/180905/002345
                </p>
              </div>
              
              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">
                  Disclaimer
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/sitemap" className="hover:text-gray-300 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button - Mobile */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:hidden w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg z-40 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </>
  )
}