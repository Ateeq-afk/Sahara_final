import HomeHero from '@/components/home/hero'
import AboutSection from '@/components/home/about-section'
import ServicesSection from '@/components/home/services-section'
import ProcessTimeline from '@/components/home/process-timeline'
import FeaturedPackages from '@/components/home/featured-packages'
import GalleryShowcase from '@/components/home/gallery-showcase'
import TestimonialsAnimated from '@/components/home/testimonials-animated'
import TrustedPartners from '@/components/home/trusted-partners'
import CTASection from '@/components/home/cta-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <ProcessTimeline />
      <GalleryShowcase />
      <FeaturedPackages />
      <TestimonialsAnimated />
      <TrustedPartners />
      <CTASection />
    </main>
  )
}