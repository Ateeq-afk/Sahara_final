import HeroModern from '@/components/home/hero-modern'
import AboutSection from '@/components/home/about-section'
import ServicesSection from '@/components/home/services-section'
import ProcessTimeline from '@/components/home/process-timeline'
import FeaturedPackages from '@/components/home/featured-packages'
import GalleryShowcase from '@/components/home/gallery-showcase'
import TestimonialsAnimated from '@/components/home/testimonials-animated'
import FAQMinimal from '@/components/faq-minimal'
import TrustedPartners from '@/components/home/trusted-partners'
import ContactSectionMinimal from '@/components/home/contact-section-minimal'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroModern />
      <AboutSection />
      <ServicesSection />
      <ProcessTimeline />
      <GalleryShowcase />
      <FeaturedPackages />
      <TestimonialsAnimated />
      <FAQMinimal />
      <TrustedPartners />
      <ContactSectionMinimal />
    </main>
  )
}