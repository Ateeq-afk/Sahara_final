"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './logo'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/showcase', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' }
]

export default function NavbarMinimal({ isMobileMenuOpen, setIsMobileMenuOpen }: { 
  isMobileMenuOpen?: boolean; 
  setIsMobileMenuOpen?: (open: boolean) => void 
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [localMobileMenuOpen, setLocalMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Use props if provided, otherwise use local state
  const menuOpen = isMobileMenuOpen ?? localMobileMenuOpen
  const setMenuOpen = setIsMobileMenuOpen ?? setLocalMobileMenuOpen
  
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  }, [menuOpen])
  
  return (
    <nav className={`fixed top-0 w-full z-[90] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-sm' 
        : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-70 transition-all duration-300">
            <Logo variant="typography" className="h-8 sm:h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>
        
          {/* Desktop CTA */}
          <Link 
            href="/quote" 
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#D26700] rounded-full hover:bg-[#B85600] transition-all duration-300 hover:scale-105"
          >
            Get Quote
          </Link>
          
          {/* Mobile Menu Button - Hidden when using bottom nav */}
          <div className="md:hidden w-10"></div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden fixed top-16 left-0 right-0 z-[100] bg-white border-b border-gray-200/50 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto -webkit-overflow-scrolling-touch"
          >
            <div className="max-w-[980px] mx-auto px-5 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2.5 text-[17px] text-gray-700 hover:text-gray-900 transition-colors duration-[250ms]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200/50">
                <Link
                  href="/quote"
                  className="apple-button apple-button-primary w-full justify-center"
                  onClick={() => setMenuOpen(false)}
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