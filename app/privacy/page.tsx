'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Shield, Lock, Eye, Database, Globe, Mail, Phone } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          points: [
            'Name, email address, and phone number when you contact us or request a quote',
            'Property address and project details for service delivery',
            'Payment information for transaction processing',
            'Communication preferences for marketing purposes'
          ]
        },
        {
          subtitle: 'Automatically Collected Information',
          points: [
            'Device information including IP address and browser type',
            'Usage data such as pages visited and time spent on site',
            'Location data to provide region-specific services',
            'Cookies and similar tracking technologies'
          ]
        }
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Delivery',
          points: [
            'Process your inquiries and provide quotes',
            'Manage your construction or renovation projects',
            'Communicate project updates and timelines',
            'Handle payments and invoicing'
          ]
        },
        {
          subtitle: 'Improvement & Marketing',
          points: [
            'Enhance our services based on user feedback',
            'Send relevant updates about our services',
            'Personalize your experience on our platform',
            'Comply with legal obligations'
          ]
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: Shield,
      content: [
        {
          subtitle: 'Security Measures',
          points: [
            'Industry-standard SSL encryption for data transmission',
            'Secure servers with regular security updates',
            'Limited access to personal information on need-to-know basis',
            'Regular security audits and assessments'
          ]
        },
        {
          subtitle: 'Data Retention',
          points: [
            'Personal data retained only as long as necessary',
            'Project data kept for warranty and legal requirements',
            'Marketing data removed upon unsubscribe request',
            'Secure deletion of data when no longer needed'
          ]
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights & Choices',
      icon: Lock,
      content: [
        {
          subtitle: 'Your Rights',
          points: [
            'Access your personal information we hold',
            'Request correction of inaccurate data',
            'Request deletion of your personal data',
            'Opt-out of marketing communications',
            'Data portability upon request'
          ]
        },
        {
          subtitle: 'Cookie Preferences',
          points: [
            'Manage cookie settings through your browser',
            'Opt-out of analytics tracking',
            'Control personalization preferences',
            'Disable third-party cookies'
          ]
        }
      ]
    },
    {
      id: 'third-parties',
      title: 'Third-Party Services',
      icon: Globe,
      content: [
        {
          subtitle: 'Service Providers',
          points: [
            'Payment processors for secure transactions',
            'Analytics services to improve our platform',
            'Email service providers for communications',
            'Cloud storage providers for data backup'
          ]
        },
        {
          subtitle: 'Partner Guidelines',
          points: [
            'All partners comply with data protection standards',
            'Limited data sharing on need-to-know basis',
            'Contractual obligations for data security',
            'Regular audits of third-party compliance'
          ]
        }
      ]
    }
  ]

  const lastUpdated = 'January 15, 2024'
  const effectiveDate = 'February 1, 2024'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Your privacy is fundamental to our business. This policy describes how Sahara Developers 
              collects, uses, and protects your personal information.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
              <span>Last updated: {lastUpdated}</span>
              <span>•</span>
              <span>Effective: {effectiveDate}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto py-4 scrollbar-hide">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap transition-colors"
              >
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-16 scroll-mt-20"
              >
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-8">
                  {section.content.map((subsection, idx) => (
                    <div key={idx} className="ml-12">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-3">
                        {subsection.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )
          })}

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-200 pt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Us About Privacy
            </h2>
            <p className="text-gray-600 mb-8">
              If you have questions about this Privacy Policy or how we handle your personal information, 
              please contact our Data Protection Officer.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-4">Data Protection Officer</h3>
                <div className="space-y-3">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'mailto:' + 'privacy' + '@' + window.location.hostname.replace('www.', '');
                  }} className="flex items-center gap-3 text-gray-600 hover:text-[#D26700] transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>Privacy Contact</span>
                  </a>
                  <a href="tel:+919591837216" className="flex items-center gap-3 text-gray-600 hover:text-[#D26700] transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+91 95918 37216</span>
                  </a>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-4">Mailing Address</h3>
                <address className="text-gray-600 not-italic leading-relaxed">
                  Sahara Developers<br />
                  100-feet Ring Road, 8th Main Road<br />
                  BTM Layout 1st Stage<br />
                  Bangalore - 560029<br />
                  Karnataka, India
                </address>
              </div>
            </div>
          </motion.section>

          {/* Updates Notice */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-blue-50 rounded-xl"
          >
            <h3 className="font-medium text-gray-900 mb-2">Policy Updates</h3>
            <p className="text-gray-600 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              We encourage you to review this Privacy Policy periodically.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
}