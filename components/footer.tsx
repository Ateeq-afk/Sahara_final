import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Clock, ChevronRight, UserCheck } from 'lucide-react'
import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className="bg-[#1d1d1f] text-[#f5f5f7]">
      <div className="container mx-auto max-w-[980px] px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-10 border-b border-[#424245]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-8 text-[11px] sm:text-xs">
            {/* Shop and Learn */}
            <div className="col-span-1">
              <h3 className="font-medium text-[#f5f5f7] mb-2.5 sm:mb-3 tracking-tight text-[11px] sm:text-xs">Shop and Learn</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { text: "Services", href: "/services" },
                  { text: "Construction", href: "/services/construction" },
                  { text: "Interior Design", href: "/services/interior-decor" },
                  { text: "Renovations", href: "/services/renovations" },
                  { text: "Packages", href: "/packages" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <h3 className="font-medium text-[#f5f5f7] mb-2.5 sm:mb-3 tracking-tight text-[11px] sm:text-xs">Company</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { text: "About Us", href: "/about" },
                  { text: "Portfolio", href: "/gallery" },
                  { text: "Testimonials", href: "/testimonials" },
                  { text: "Awards", href: "/awards" },
                  { text: "Blog", href: "/blog" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Business */}
            <div className="col-span-1">
              <h3 className="font-medium text-[#f5f5f7] mb-2.5 sm:mb-3 tracking-tight text-[11px] sm:text-xs">For Business</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { text: "Commercial", href: "/services/construction" },
                  { text: "Corporate", href: "/services/interior-decor" },
                  { text: "Turnkey", href: "/services/turnkey" },
                  { text: "Consultancy", href: "/services" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="col-span-1">
              <h3 className="font-medium text-[#f5f5f7] mb-2.5 sm:mb-3 tracking-tight text-[11px] sm:text-xs">Support</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { text: "Contact Us", href: "/contact" },
                  { text: "Get a Quote", href: "/quote" },
                  { text: "FAQs", href: "/faqs" },
                  { text: "Timeline", href: "/timeline" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sahara Values */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-medium text-[#f5f5f7] mb-2.5 sm:mb-3 tracking-tight text-[11px] sm:text-xs">Sahara Values</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { text: "Quality", href: "/quality" },
                  { text: "Sustainability", href: "/sustainability" },
                  { text: "Innovation", href: "/innovation" },
                  { text: "Careers", href: "/careers" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-3 sm:py-4 border-b border-[#424245]">
          <div className="text-[10px] sm:text-xs leading-relaxed">
            <p className="text-[#86868b]">
              More ways to shop: <Link href="/contact" className="text-[#2997ff] hover:underline">Visit our showroom</Link> or <Link href="tel:+919591837216" className="text-[#2997ff] hover:underline">call +91 9591 837216</Link>.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[10px] sm:text-xs">
              <p className="text-[#86868b]">
                Copyright © 2024 Sahara Developers. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4">
                <Link href="/privacy-policy" className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150">
                  Privacy Policy
                </Link>
                <span className="text-[#424245] hidden sm:inline">|</span>
                <Link href="/terms-of-service" className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150">
                  Terms of Use
                </Link>
                <span className="text-[#424245] hidden sm:inline">|</span>
                <Link href="/sitemap" className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150">
                  Site Map
                </Link>
                <span className="text-[#424245] hidden sm:inline">|</span>
                <Link href="/crm/login" className="text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 inline-flex items-center gap-1">
                  <UserCheck className="h-3 w-3" />
                  <span className="hidden sm:inline">Employee Portal</span>
                  <span className="sm:hidden">Login</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="https://www.facebook.com/saharadevelopers" 
                className="text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-150"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link 
                href="https://www.instagram.com/saharadevelopers" 
                className="text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-150"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
              <Link 
                href="https://www.linkedin.com/company/saharadevelopers" 
                className="text-[#86868b] hover:text-[#f5f5f7] transition-colors duration-150"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="py-2.5 sm:py-3 text-[10px] sm:text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[#a1a1a6]">
            <Link href="/" className="hover:text-[#f5f5f7] transition-colors duration-150">
              <Logo variant="dark" className="h-3.5 w-auto sm:h-4" />
            </Link>
            <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#424245]" />
            <span className="text-[#f5f5f7]">Bangalore</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer