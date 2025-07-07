"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown, Search, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // Pages that should always have a solid navbar background
  const solidNavbarPages = ['/quote', '/contact', '/packages', '/gallery', '/services', '/about', '/tools', '/blog']
  const shouldUseSolidNavbar = solidNavbarPages.some(page => pathname.startsWith(page)) || pathname !== '/'

  // Hide/show navbar on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setLastScrollY(latest)
    setScrolled(latest > 10)
  })

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
    { title: 'Interior Design', href: '/services/interior-decor' },
    { title: 'Projects', href: '/gallery' },
    { title: 'Packages', href: '/packages' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <motion.header 
        animate={{
          y: hidden ? -100 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-700',
          isNavbarSolid 
            ? 'bg-white/70 backdrop-blur-2xl backdrop-saturate-200 supports-backdrop-blur:bg-white/60'
            : 'bg-gray-900/20 backdrop-blur-2xl backdrop-saturate-200 supports-backdrop-blur:bg-gray-900/10'
        )}
        style={{
          borderBottom: isNavbarSolid ? '0.5px solid rgba(0, 0, 0, 0.08)' : '0.5px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="relative">
          <nav className="h-20 max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-10 flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Logo 
                  variant={isNavbarSolid ? 'default' : 'dark'} 
                  className="h-10 w-auto" 
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "text-sm font-normal tracking-[-0.01em] transition-all duration-200 relative py-1",
                    isNavbarSolid 
                      ? pathname === link.href
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900" 
                      : pathname === link.href
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-5">
              <button
                className={cn(
                  "p-1 transition-opacity duration-200",
                  isNavbarSolid 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-white/80 hover:text-white"
                )}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link
                href="/quote"
                className={cn(
                  "text-sm font-normal transition-all duration-200",
                  isNavbarSolid 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-white/80 hover:text-white"
                )}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden relative w-9 h-9 flex items-center justify-center -mr-2",
                "touch-manipulation"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              <div className="relative w-[18px] h-[14px] flex flex-col justify-between">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    "block h-[1.5px] w-full rounded-sm transition-colors origin-left",
                    isNavbarSolid ? "bg-gray-600" : "bg-white/80"
                  )}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "block h-[1.5px] w-full rounded-sm transition-colors",
                    isNavbarSolid ? "bg-gray-600" : "bg-white/80"
                  )}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    "block h-[1.5px] w-full rounded-sm transition-colors origin-left",
                    isNavbarSolid ? "bg-gray-600" : "bg-white/80"
                  )}
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

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
              className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - Apple Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-0 top-20 z-50 md:hidden"
            >
              <div className="mx-4 mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl backdrop-saturate-200 shadow-2xl overflow-hidden"
                style={{
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Mobile Menu Links */}
                <nav className="py-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-5 py-4 text-[17px] transition-all duration-200",
                          pathname === link.href
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Divider */}
                  <div className="my-2 h-px bg-gray-200/70" />
                  
                  {/* Mobile Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: navLinks.length * 0.05,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <button className="w-full text-left px-5 py-4 text-[17px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center justify-between">
                      <span>Search</span>
                      <Search className="h-4 w-4" />
                    </button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: (navLinks.length + 1) * 0.05,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Link
                      href="/quote"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-4 text-[17px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    >
                      Get Quote
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar