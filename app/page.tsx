import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroModernOptimized from '@/components/home/hero-modern-optimized'

// Import skeleton loaders
import ServicesSkeleton from '@/components/skeletons/services-skeleton'
import ToolsDiscoverySkeleton from '@/components/skeletons/tools-discovery-skeleton'
import ProcessTimelineSkeleton from '@/components/skeletons/process-timeline-skeleton'
import GallerySkeleton from '@/components/skeletons/gallery-skeleton'
import PackagesSkeleton from '@/components/skeletons/packages-skeleton'
import TestimonialsSkeleton from '@/components/skeletons/testimonials-skeleton'
import FAQSkeleton from '@/components/skeletons/faq-skeleton'
import PartnersSkeleton from '@/components/skeletons/partners-skeleton'
import ContactSkeleton from '@/components/skeletons/contact-skeleton'

// Lazy load heavy components
const ServicesSection = dynamic(() => import('@/components/home/services-section'), {
  loading: () => <ServicesSkeleton />
})

const ProcessTimeline = dynamic(() => import('@/components/home/process-timeline'), {
  loading: () => <ProcessTimelineSkeleton />
})

const FeaturedPackages = dynamic(() => import('@/components/home/featured-packages'), {
  loading: () => <PackagesSkeleton />
})

const GalleryShowcase = dynamic(() => import('@/components/home/gallery-showcase'), {
  loading: () => <GallerySkeleton />
})

const TestimonialsAnimated = dynamic(() => import('@/components/home/testimonials-animated'), {
  loading: () => <TestimonialsSkeleton />
})

const FAQMinimal = dynamic(() => import('@/components/faq-minimal'), {
  loading: () => <FAQSkeleton />
})

const TrustedPartners = dynamic(() => import('@/components/home/trusted-partners'), {
  loading: () => <PartnersSkeleton />
})

const ContactSectionMinimal = dynamic(() => import('@/components/home/contact-section-minimal'), {
  loading: () => <ContactSkeleton />
})

const ToolsDiscovery = dynamic(() => import('@/components/home/tools-discovery'), {
  loading: () => <ToolsDiscoverySkeleton />
})

// Import floating components
const LeadMagnet = dynamic(() => import('@/components/lead-magnet-apple'), {
  ssr: false
})



export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroModernOptimized />
      
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