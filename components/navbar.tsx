"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Pages that should always have a solid navbar background
  const solidNavbarPages = ['/quote', '/contact', '/packages', '/gallery', '/services', '/about', '/tools', '/blog']
  const shouldUseSolidNavbar = solidNavbarPages.some(page => pathname.startsWith(page)) || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Determine navbar style based on page and scroll state
  const isNavbarSolid = shouldUseSolidNavbar || scrolled

  const navLinks = [
    { title: 'Services', href: '/services' },
    { title: 'Packages', href: '/packages' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          isNavbarSolid 
            ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50'
            : 'bg-gray-900/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10'
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="h-[72px] flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-10 flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Logo 
                  variant={isNavbarSolid ? 'default' : 'dark'} 
                  className="h-8 w-auto" 
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 relative",
                    isNavbarSolid 
                      ? "text-gray-800 hover:text-gray-900" 
                      : "text-white/90 hover:text-white",
                    pathname === link.href && "text-amber-600"
                  )}
                >
                  {link.title}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-amber-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/quote"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300",
                  isNavbarSolid
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
                )}
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                isNavbarSolid 
                  ? "hover:bg-gray-100" 
                  : "hover:bg-white/10"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-colors origin-left",
                    isNavbarSolid ? "bg-gray-800" : "bg-white"
                  )}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-colors",
                    isNavbarSolid ? "bg-gray-800" : "bg-white"
                  )}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-colors origin-left",
                    isNavbarSolid ? "bg-gray-800" : "bg-white"
                  )}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <Logo variant="default" className="h-8 w-auto" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex-1 overflow-y-auto py-8">
                  <div className="px-6 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block py-3 text-[17px] font-medium transition-colors",
                            pathname === link.href
                              ? "text-amber-600"
                              : "text-gray-900 hover:text-amber-600"
                          )}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t">
                  <Link
                    href="/quote"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 px-6 bg-gray-900 text-white text-center rounded-xl font-medium hover:bg-black transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar