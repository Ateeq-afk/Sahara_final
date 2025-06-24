"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CTASection = () => {
  return (
    <section className="bg-[#F3EFEA] py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-neutral-600 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
          Get in touch with our experts for a free consultation and transform your vision into reality.
        </p>
        <div className="flex justify-center gap-3 sm:gap-4 flex-col sm:flex-row">
          <Button
            size="lg"
            className="bg-primary text-white px-6 sm:px-8 rounded-full hover:bg-primary/90 transition-colors h-12 sm:h-14 text-sm sm:text-base"
            asChild
          >
            <Link href="/quote">Get a Free Quote</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-neutral-400 text-neutral-800 px-6 sm:px-8 rounded-full hover:bg-neutral-100 transition-colors h-12 sm:h-14 text-sm sm:text-base"
            asChild
          >
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection