"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/showcase', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]

export default function NavbarMinimal() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Only add listener on client
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial scroll position
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ${
      isScrolled 
        ? 'apple-glass-navbar' 
        : 'bg-gray-50/80 backdrop-blur-[20px] backdrop-saturate-[1.8]'
    }`}>
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-semibold text-[21px] tracking-[-0.02em] text-gray-900 hover:opacity-80 transition-opacity duration-[250ms]">
          Sahara
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="apple-nav-item"
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/quote" className="apple-button apple-button-primary">
            Get Quote
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 transition-colors duration-[250ms]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-50/95 backdrop-blur-[40px] backdrop-saturate-[1.8] border-b border-gray-200/50 shadow-lg"
          >
            <div className="max-w-[980px] mx-auto px-5 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-[17px] text-gray-700 hover:text-gray-900 transition-colors duration-[250ms]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200/50">
                <Link
                  href="/quote"
                  className="apple-button apple-button-primary w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}