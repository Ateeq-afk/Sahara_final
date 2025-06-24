import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Clock } from 'lucide-react'
import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Logo variant="dark" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Premium construction and interior design solutions with a legacy of over 20 years in Bangalore. 
              Transforming visions into reality with excellence and innovation.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/saharadevelopers" 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/saharadevelopers" 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/company/saharadevelopers" 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { text: "Our Services", href: "/services" },
                { text: "Construction", href: "/services/construction" },
                { text: "Interior Design", href: "/services/interior-decor" },
                { text: "Packages & Pricing", href: "/packages" },
                { text: "Project Gallery", href: "/gallery" },
                { text: "Get a Quote", href: "/quote" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6">Our Expertise</h3>
            <ul className="space-y-4">
              {[
                { text: "Residential Construction", href: "/services/construction" },
                { text: "Commercial Projects", href: "/services/construction" },
                { text: "Interior Design", href: "/services/interior-decor" },
                { text: "Home Renovation", href: "/services/renovations" },
                { text: "Turnkey Solutions", href: "/services/turnkey" },
                { text: "Architectural Planning", href: "/services" }
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {service.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <strong className="text-white">Sahara Developers</strong><br />
                    100-feet Ring Road, 8th Main Road,<br />
                    BTM Layout 1st Stage,<br />
                    Bangalore - 560029, Karnataka
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <a 
                    href="tel:+919591837216" 
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    +91 9591 837216
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <a 
                    href="mailto:info@saharadevelopers.com" 
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    info@saharadevelopers.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">
                    Mon - Sat: 9:00 AM - 6:00 PM<br />
                    Sunday: By Appointment
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sahara Developers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer