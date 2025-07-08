import Link from 'next/link'

const footerLinks = {
  services: [
    { href: '/services/construction', label: 'Construction' },
    { href: '/services/interior-design', label: 'Interior Design' },
    { href: '/services/renovation', label: 'Renovation' },
    { href: '/services/consultation', label: 'Consultation' }
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Portfolio' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' }
  ],
  support: [
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/quote', label: 'Get Quote' },
    { href: '/terms', label: 'Terms' }
  ]
}

export default function FooterMinimal() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="apple-container apple-section-compact">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Sahara Developers</h3>
            <p className="apple-caption mb-6">
              Crafting exceptional spaces in Bangalore for over 20 years.
            </p>
            {/* Contact Info - Integrated naturally */}
            <div className="space-y-2">
              <a href="tel:+919591837216" className="apple-link text-sm block">
                +91 9591 837216
              </a>
              <a href="mailto:info@saharadevelopers.com" className="apple-link text-sm block">
                info@saharadevelopers.com
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="apple-caption hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="apple-caption hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="apple-caption hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="apple-caption">
              © 2024 Sahara Developers. All rights reserved.
            </p>
            
            {/* Social Links - Minimal */}
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="apple-caption hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/terms" className="apple-caption hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}