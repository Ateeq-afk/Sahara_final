import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Free Quote | Instant Cost Estimation - Sahara Developers',
  description: 'Get an instant, personalized quote for your construction or interior design project in Bangalore. Free consultation, transparent pricing, and detailed cost breakdown. Start your dream project today.',
  keywords: 'free construction quote Bangalore, interior design quote, construction cost calculator, instant quote, project estimation, building cost Bangalore, free consultation',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'Get Your Free Construction Quote - Instant Estimation | Sahara Developers',
    description: 'Receive a detailed, personalized quote for your construction or interior project in minutes. No obligations, just expert advice and transparent pricing.',
    url: 'https://saharadevelopers.com/quote',
    images: [
      {
        url: '/og-image-quote.jpg',
        width: 1200,
        height: 630,
        alt: 'Get Free Quote - Sahara Developers Construction Cost Calculator',
      },
    ],
  },
  alternates: {
    canonical: '/quote',
  },
}