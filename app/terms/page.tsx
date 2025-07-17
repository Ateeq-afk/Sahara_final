"use client"

import { motion } from 'framer-motion'
import { 
  Scale, Shield, FileText, AlertTriangle,
  Clock, CreditCard, Hammer, MessageSquare,
  Building2, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Sahara Developers',
  description: 'Clear and fair terms of service for Sahara Developers construction and interior design services.',
}

export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: 'By accessing and using Sahara Developers&apos; website and services, you accept and agree to be bound by these terms. If you do not agree, please do not use our services.'
    },
    {
      id: 'services',
      title: 'Our Services',
      icon: Hammer,
      items: [
        'Residential construction and renovation',
        'Commercial construction projects',
        'Interior design and decoration',
        'Project management and consultation',
        'Material sourcing and supply',
        'Architectural planning and design'
      ]
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: CreditCard,
      subsections: [
        {
          title: 'Payment Schedule',
          content: '30% advance • 40% structural completion • 30% final delivery'
        },
        {
          title: 'Late Payments',
          content: '2% monthly interest on overdue amounts'
        }
      ]
    },
    {
      id: 'timeline',
      title: 'Project Timeline',
      icon: Clock,
      content: 'Timelines are estimates. Delays may occur due to weather, permits, or material availability.'
    },
    {
      id: 'warranty',
      title: 'Warranty & Liability',
      icon: Shield,
      subsections: [
        {
          title: 'Structural Work',
          content: '12-month warranty'
        },
        {
          title: 'Finishing Work',
          content: '6-month warranty'
        }
      ]
    },
    {
      id: 'termination',
      title: 'Contract Termination',
      icon: AlertTriangle,
      content: '30 days written notice required. Payment due for completed work.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-100 to-amber-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-4 leading-relaxed">
              Clear, fair terms that protect both you and us.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div 
            className="flex gap-6 py-4 overflow-x-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap text-sm font-medium text-gray-700"
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 max-w-4xl mx-auto"
        >
          {/* Introduction Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <Building2 className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Welcome to Sahara Developers</h2>
                <p className="text-gray-700 leading-relaxed">
                  These terms govern your use of our services. We&apos;ve written them to be clear and fair, 
                  protecting both your interests and ours. By using our services, you agree to these terms.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-3xl border border-gray-200 hover:border-amber-300 transition-all duration-300 overflow-hidden">
                {/* Section Header */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gray-100 group-hover:bg-amber-100 rounded-2xl transition-colors">
                      <section.icon className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 flex-1">
                      {section.title}
                    </h3>
                  </div>

                  {/* Section Content */}
                  {section.content && (
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  )}

                  {/* Items List */}
                  {section.items && (
                    <ul className="space-y-3 mt-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {section.subsections.map((sub, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-2xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-2">{sub.title}</h4>
                          <p className="text-gray-600">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Additional Sections */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Client Responsibilities */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 lg:p-10">
              <h3 className="text-2xl font-semibold mb-6">Your Responsibilities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Information & Communication</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Provide accurate project requirements</li>
                    <li>• Communicate changes promptly</li>
                    <li>• Respond to queries within 48 hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Legal & Financial</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Obtain necessary permits</li>
                    <li>• Make timely payments</li>
                    <li>• Maintain property insurance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Dispute Resolution</h3>
                  <p className="text-gray-600 mb-4">
                    We believe in resolving disputes through dialogue. Any disagreements will first 
                    be addressed through good faith negotiations and, if necessary, mediation.
                  </p>
                  <p className="text-sm text-gray-500">
                    Jurisdiction: Bangalore, Karnataka, India
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-10 text-white">
              <h3 className="text-2xl font-semibold mb-6">Questions About These Terms?</h3>
              <p className="text-white/90 mb-8">
                Our legal team is here to help clarify any questions you might have about these terms.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:legal@saharadevelopers.in"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  Email Legal Team
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+919591837216"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-full hover:bg-gray-100 transition-colors font-medium"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Note */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            These terms are designed to be fair and transparent. We may update them from time to time, 
            and will notify you of any significant changes. Thank you for choosing Sahara Developers.
          </p>
        </div>
      </section>
    </div>
  )
}