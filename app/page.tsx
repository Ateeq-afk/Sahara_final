import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroModern from '@/components/home/hero-modern'
import ServicesSection from '@/components/home/services-section'
import ProcessTimeline from '@/components/home/process-timeline'
import FeaturedPackages from '@/components/home/featured-packages'
import GalleryShowcase from '@/components/home/gallery-showcase'
import TestimonialsAnimated from '@/components/home/testimonials-animated'
import FAQMinimal from '@/components/faq-minimal'
import TrustedPartners from '@/components/home/trusted-partners'
import ContactSectionMinimal from '@/components/home/contact-section-minimal'
// import StatsSection from '@/components/home/stats-section-simple'

// Dynamic imports for tool sections with loading states
const ToolsDiscovery = dynamic(() => import('@/components/home/tools-discovery'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

// const SmartToolsBanner = dynamic(() => import('@/components/home/smart-tools-banner'), {
//   ssr: false,
//   loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
// })


// Import floating components
const LeadMagnet = dynamic(() => import('@/components/lead-magnet-apple'), {
  ssr: false
})



export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroModern />
      
      {/* Tools Discovery - Early Introduction */}
      <section className="bg-gray-50">
        <ToolsDiscovery />
      </section>
      
      {/* Services - What We Offer */}
      <ServicesSection />
      
      {/* Process Timeline - How We Work */}
      <section className="bg-gray-50">
        <ProcessTimeline />
      </section>
      
      {/* Gallery - Visual Proof */}
      <GalleryShowcase />
      
      {/* Featured Packages - Pricing Options */}
      <section className="bg-gray-50">
        <FeaturedPackages />
      </section>
      
      {/* Smart Tools Banner - Additional Tools */}
      {/* <SmartToolsBanner /> */}
      
      {/* Testimonials - Social Proof */}
      <TestimonialsAnimated />
      
      {/* FAQ - Address Concerns */}
      <FAQMinimal />
      
      {/* Partners - Credibility */}
      <TrustedPartners />
      
      {/* Contact - Call to Action */}
      <ContactSectionMinimal />
      
      {/* Floating Interactive Elements */}
      <LeadMagnet />
    </main>
  )
}