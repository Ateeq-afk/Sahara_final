"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageSquare, Youtube, ArrowUp, ChevronDown } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services/construction', label: 'Construction' },
    { href: '/services/interior-decor', label: 'Interior Design' },
    { href: '/services/renovations', label: 'Renovation' },
    { href: '/consultation', label: 'Consultation' }
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/projects', label: 'Portfolio' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' }
  ],
  support: [
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/quote', label: 'Get Quote' },
    { href: '/contact#visit', label: 'Site Visit' }
  ]
}

export default function FooterMinimal() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop CTA Section */}
      {!isMobile && (
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
                <ArrowUp className="w-4 h-4 rotate-45" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Mobile-First Footer */}
      <footer className="bg-[#1c1c1c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 md:pb-8">
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Logo & Contact */}
            <div className="text-center">
              <h3 className="font-semibold text-xl mb-6">Sahara Developers</h3>
              
              {/* Quick Contact */}
              <div className="space-y-4 mb-6">
                <a 
                  href="tel:+919591837216" 
                  className="flex items-center justify-center gap-3 text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                
                <a 
                  href="https://wa.me/919591837216?text=Hi!%20I'm%20interested%20in%20your%20construction%20services" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-gray-900 bg-white hover:bg-gray-100 px-6 py-3 rounded-full transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {[
                  { href: "https://facebook.com/saharadevelopers", icon: Facebook },
                  { href: "https://twitter.com/saharadevs", icon: Twitter },
                  { href: "https://instagram.com/saharadevelopers", icon: Instagram },
                  { href: "https://linkedin.com/company/sahara-developers", icon: Linkedin },
                  { href: "https://youtube.com/@saharadevelopers", icon: Youtube }
                ].map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 gap-6 text-center">
              {/* Services */}
              <div>
                <h4 className="font-medium text-white mb-3">Services</h4>
                <ul className="space-y-2">
                  {footerLinks.services.slice(0, 3).map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-medium text-white mb-3">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.slice(0, 3).map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-400">
                © 2024 Sahara Developers
              </p>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                <Link href="/privacy" className="text-gray-500 hover:text-gray-300">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-300">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Sahara Developers</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Crafting exceptional spaces in Bangalore for over 20 years.
              </p>
              
              {/* Contact Info */}
              <address className="space-y-3 not-italic text-sm">
                <a 
                  href="tel:+919591837216" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 95918 37216</span>
                </a>
                
                <a 
                  href="mailto:info@saharadevelopers.in" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@saharadevelopers.in</span>
                </a>
                
                <div className="space-y-1">
                  <a 
                    href="https://maps.google.com/?q=100-feet+Ring+Road+8th+Main+Road+BTM+Layout+1st+Stage+Bangalore+560029" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <div>
                      <p>100-feet Ring Road, BTM Layout</p>
                      <p>Bangalore - 560029</p>
                    </div>
                  </a>
                </div>
              </address>
              
              {/* Social Media Links */}
              <div className="flex gap-3 pt-4">
                {[
                  { href: "https://facebook.com/saharadevelopers", icon: Facebook },
                  { href: "https://twitter.com/saharadevs", icon: Twitter },
                  { href: "https://instagram.com/saharadevelopers", icon: Instagram },
                  { href: "https://linkedin.com/company/sahara-developers", icon: Linkedin },
                  { href: "https://youtube.com/@saharadevelopers", icon: Youtube }
                ].map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
            
            {/* Services */}
            <div>
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
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold text-base mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
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
            
            {/* Support */}
            <div>
              <h4 className="font-semibold text-base mb-4">Get Started</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
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
          
          {/* Desktop Bottom Bar */}
          <div className="hidden md:block border-t border-gray-800/50 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2024 Sahara Developers. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  RERA Registration: PRM/KA/RERA/1251/309/PR/180905/002345
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
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
        className={`fixed bottom-24 right-4 md:hidden w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg z-40 transition-all duration-300 ${
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