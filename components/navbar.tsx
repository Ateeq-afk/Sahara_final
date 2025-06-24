"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Logo from '@/components/logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Pages that should always have a solid navbar background
  const solidNavbarPages = ['/quote', '/contact', '/packages', '/gallery', '/services']
  const shouldUseSolidNavbar = solidNavbarPages.some(page => pathname.startsWith(page)) || pathname !== '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine navbar style based on page and scroll state
  const isNavbarSolid = shouldUseSolidNavbar || scrolled

  const navLinks = [
    { title: 'Home', href: '/' },
    { 
      title: 'Services', 
      href: '/services',
      dropdown: [
        { title: 'Construction', href: '/services/construction' },
        { title: 'Interior Decor', href: '/services/interior-decor' },
        { title: 'Renovations', href: '/services/renovations' },
        { title: 'Turnkey Projects', href: '/services/turnkey' },
      ]
    },
    { title: 'Packages', href: '/packages' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isNavbarSolid 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative transition-all duration-300">
            <Logo 
              variant={isNavbarSolid ? 'default' : 'dark'} 
              className="h-8 sm:h-10 lg:h-12 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              link.dropdown ? (
                <DropdownMenu key={link.title}>
                  <DropdownMenuTrigger asChild>
                    <button className={cn(
                      "group flex items-center space-x-1.5 transition-colors duration-200",
                      isNavbarSolid 
                        ? "text-gray-700 hover:text-primary" 
                        : "text-white hover:text-primary-light"
                    )}>
                      <span className="text-sm font-medium tracking-wide">{link.title}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="center" 
                    className="w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-lg border-none mt-2"
                  >
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.title} asChild>
                        <Link 
                          href={item.href}
                          className="w-full px-4 py-2.5 text-sm font-medium tracking-wide text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                    isNavbarSolid 
                      ? "text-gray-700 hover:text-primary" 
                      : "text-white hover:text-primary-light",
                    pathname === link.href && "text-primary after:w-full"
                  )}
                >
                  {link.title}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Action Button */}
          <div className="hidden lg:flex items-center">
            <Button
              className="h-9 px-6 xl:h-10 xl:px-8 rounded-full bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              asChild
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden transition-colors duration-200 p-2",
              isNavbarSolid 
                ? "text-gray-700 hover:text-primary" 
                : "text-white hover:text-primary-light"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 absolute left-0 right-0 top-full shadow-lg">
            <div className="py-4 px-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.title}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <span className="block text-sm font-medium text-gray-700 py-2">
                        {link.title}
                      </span>
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                              "block text-sm text-gray-600 hover:text-primary transition-colors duration-200 py-2",
                              pathname === item.href && "text-primary font-medium"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 py-2",
                        pathname === link.href && "text-primary"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  className="w-full h-10 rounded-full bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <Link href="/quote" onClick={() => setIsOpen(false)}>Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar