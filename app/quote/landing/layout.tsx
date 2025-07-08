import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Free Construction Quote | Sahara Developers | Bangalore #1 Contractors',
  description: 'Get instant free quote for construction, interior design & renovation in Bangalore. 20+ years experience, 500+ happy clients, 4.9★ rating. Call within 2 hours guaranteed!',
  keywords: 'free quote construction bangalore, interior design quote, renovation quote bangalore, contractors quote, construction estimate, sahara developers quote, home construction quote',
  openGraph: {
    title: 'Get Free Construction Quote | Sahara Developers | Bangalore #1 Contractors',
    description: 'Get instant free quote for construction, interior design & renovation in Bangalore. 20+ years experience, 500+ happy clients, 4.9★ rating. Call within 2 hours guaranteed!',
    images: [
      {
        url: '/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Get Free Construction Quote - Sahara Developers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Free Construction Quote | Sahara Developers',
    description: 'Get instant free quote for construction, interior design & renovation in Bangalore. 20+ years experience, 500+ happy clients.',
    images: ['/landing-og.jpg'],
  },
  robots: {
    index: false, // Don't index landing pages to prevent organic traffic
    follow: true,
  },
}

export default function QuoteLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="landing-page">
      {children}
    </div>
  )
}