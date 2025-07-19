"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import DynamicEmailLink from '@/components/dynamic-email-link'

// Metadata should be moved to a layout.tsx or handled differently for client components

const faqCategories = [
  {
    title: 'General Questions',
    icon: HelpCircle,
    faqs: [
      {
        question: 'What types of construction services do you offer?',
        answer: 'We offer comprehensive construction services including residential villa construction, apartment construction, commercial buildings, home renovations, interior design, and architectural planning. Our services cover everything from initial design to final handover.'
      },
      {
        question: 'How long have you been in business?',
        answer: 'Sahara Developers has been serving Bangalore and surrounding areas for over 20 years. We have successfully completed 500+ projects and built a strong reputation for quality and reliability in the construction industry.'
      },
      {
        question: 'What areas do you serve?',
        answer: 'We primarily serve Bangalore and surrounding areas within a 50km radius. This includes areas like Whitefield, Electronic City, Sarjapur, Hebbal, and other major suburbs of Bangalore.'
      },
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes, we are fully licensed contractors with all necessary permits and certifications. We carry comprehensive insurance coverage including liability insurance and workers compensation to protect both our clients and our team.'
      }
    ]
  },
  {
    title: 'Project Planning & Design',
    icon: MessageSquare,
    faqs: [
      {
        question: 'Do you provide architectural design services?',
        answer: 'Yes, we have an in-house team of qualified architects and designers. We provide complete architectural planning, structural design, interior design, and 3D visualization services to help you visualize your project before construction begins.'
      },
      {
        question: 'Can I make changes to the design during construction?',
        answer: 'Minor changes can be accommodated during construction, but they may affect the timeline and budget. Major changes require approval and will result in a change order with updated costs and schedules. We recommend finalizing designs before construction begins.'
      },
      {
        question: 'How long does the design process take?',
        answer: 'The design process typically takes 2-4 weeks depending on the project complexity. This includes initial consultation, concept development, detailed drawings, approvals, and final design documentation.'
      },
      {
        question: 'Do you help with permits and approvals?',
        answer: 'Yes, we assist with obtaining all necessary permits and approvals including building permits, BBMP approvals, fire safety clearances, and other regulatory requirements. Our team is familiar with local regulations and processes.'
      }
    ]
  },
  {
    title: 'Construction Process',
    icon: MessageSquare,
    faqs: [
      {
        question: 'How long does a typical villa construction take?',
        answer: 'A typical villa construction takes 12-18 months depending on the size and complexity. Factors affecting timeline include design complexity, site conditions, weather, permit approvals, and change requests.'
      },
      {
        question: 'What is included in the construction cost?',
        answer: 'Our construction cost includes structural work, basic electrical and plumbing, standard flooring, painting, and basic fixtures. Premium finishes, branded fixtures, landscaping, and furniture are typically additional.'
      },
      {
        question: 'How do you ensure quality control?',
        answer: 'We have a dedicated quality control team that conducts regular inspections at every stage. We use quality materials from reputed suppliers, follow standard construction practices, and provide regular photo updates to clients.'
      },
      {
        question: 'What happens if there are delays?',
        answer: 'We communicate any potential delays immediately and work to minimize impact. Delays due to weather, permit issues, or unforeseen circumstances are beyond our control. We provide revised timelines and keep clients informed throughout.'
      }
    ]
  },
  {
    title: 'Payments & Contracts',
    icon: MessageSquare,
    faqs: [
      {
        question: 'What is your payment structure?',
        answer: 'We typically follow a 30-40-30 payment structure: 30% advance upon contract signing, 40% upon completion of structural work, and 30% upon project completion. Payment schedules can be customized based on project requirements.'
      },
      {
        question: 'Do you provide cost estimates?',
        answer: 'Yes, we provide detailed cost estimates after understanding your requirements and site conditions. Our estimates include materials, labor, and other associated costs. Final costs are confirmed in the contract.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept payments via bank transfer, cheques, and online payment methods. We provide proper receipts and maintain transparent financial records for all transactions.'
      },
      {
        question: 'What if I need to cancel the project?',
        answer: 'Contract cancellation terms are specified in your agreement. Generally, you will be charged for work completed and materials ordered. We try to work with clients to find mutually acceptable solutions in case of cancellations.'
      }
    ]
  },
  {
    title: 'Materials & Quality',
    icon: MessageSquare,
    faqs: [
      {
        question: 'What quality of materials do you use?',
        answer: 'We use high-quality materials from reputed brands and suppliers. We can accommodate different budget ranges by offering various material options from standard to premium categories.'
      },
      {
        question: 'Can I choose my own materials and suppliers?',
        answer: 'Yes, you can choose your own materials and suppliers. However, we recommend using our approved vendors to ensure quality and warranty. If you prefer specific brands or suppliers, we can coordinate with them.'
      },
      {
        question: 'Do you provide warranty on your work?',
        answer: 'Yes, we provide a 12-month warranty on structural work and 6-month warranty on finishing work. Third-party materials and equipment carry manufacturer warranties which we help facilitate.'
      },
      {
        question: 'How do you handle material price fluctuations?',
        answer: 'Material price fluctuations are addressed as per contract terms. For projects with long timelines, we may include price escalation clauses or fix material costs at contract signing.'
      }
    ]
  },
  {
    title: 'Communication & Support',
    icon: MessageSquare,
    faqs: [
      {
        question: 'How do you keep clients updated on progress?',
        answer: 'We provide regular updates through our client portal, WhatsApp groups, site visits, and progress photos. Our project managers are available for calls and meetings as needed.'
      },
      {
        question: 'Who is my main point of contact?',
        answer: 'Each project is assigned a dedicated project manager who serves as your main point of contact. They coordinate all aspects of the project and keep you informed throughout the construction process.'
      },
      {
        question: 'Can I visit the construction site?',
        answer: 'Yes, clients can visit the construction site during working hours. We recommend coordinating with your project manager for safety reasons and to avoid disruption to work.'
      },
      {
        question: 'What if I have issues after project completion?',
        answer: 'We provide post-completion support for any issues covered under warranty. Our customer service team is available to address concerns and coordinate any necessary repairs or adjustments.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our construction and interior design services.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-blue-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
              <CardDescription>
                Can't find the answer you're looking for? Get in touch with our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 justify-start">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Contact Form</div>
                      <div className="text-sm text-gray-600">Send us a message</div>
                    </div>
                  </Button>
                </Link>
                
                <a href="tel:+919591837216" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 justify-start">
                    <Phone className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm text-gray-600">+91 95918 37216</div>
                    </div>
                  </Button>
                </a>
                
                <DynamicEmailLink prefix="contact" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 justify-start">
                    <Mail className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Email Us</div>
                      <div className="text-sm text-gray-600">Contact Email</div>
                    </div>
                  </Button>
                </DynamicEmailLink>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-center text-gray-600">
                  For existing clients, you can also reach us through your 
                  <Link href="/portal" className="text-blue-600 hover:underline ml-1">
                    customer portal
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}