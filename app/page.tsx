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
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

// const InteractiveToolsDemo = dynamic(() => import('@/components/home/interactive-tools-demo'), {
//   loading: () => <div className="h-96 bg-black animate-pulse" />
// })

// const ARExperienceSection = dynamic(() => import('@/components/home/ar-experience-section'), {
//   loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
// })

const SmartToolsBanner = dynamic(() => import('@/components/home/smart-tools-banner'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
})

// Import floating components
const LeadMagnet = dynamic(() => import('@/components/lead-magnet-apple'), {
  ssr: false
})

// FAQ Chatbot removed for cleaner interface
// const FAQChatbot = dynamic(() => import('@/components/faq-chatbot'), {
//   ssr: false
// })

const WhatsAppWidget = dynamic(() => import('@/components/whatsapp-widget'), {
  ssr: false
})

const ExitIntentPopup = dynamic(() => import('@/components/exit-intent-popup'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroModern />
      
      {/* Tools Discovery - Early Introduction */}
      <ToolsDiscovery />
      
      {/* Services - What We Offer */}
      <ServicesSection />
      
      
      {/* Process Timeline - How We Work */}
      <ProcessTimeline />
      
      
      {/* Gallery - Visual Proof */}
      <GalleryShowcase />
      
      {/* Featured Packages - Pricing Options */}
      <FeaturedPackages />
      
      {/* Smart Tools Banner - Additional Tools */}
      <SmartToolsBanner />
      
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
      <WhatsAppWidget />
      <ExitIntentPopup />
    </main>
  )
}