import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Services | Residential & Commercial Building - Sahara Developers',
  description: 'Premium construction services in Bangalore for residential homes, commercial buildings, offices, and retail spaces. Expert contractors with 20+ years experience, quality materials, and timely delivery.',
  keywords: 'construction services Bangalore, residential construction, commercial construction, building contractors, home construction Bangalore, office construction, quality construction company',
  openGraph: {
    title: 'Construction Services - Residential & Commercial | Sahara Developers',
    description: 'Build your dream space with Bangalore\'s trusted construction contractors. Residential homes, commercial buildings, offices - all with premium quality and transparency.',
    url: 'https://saharadevelopers.com/services/construction',
    images: [
      {
        url: '/og-image-construction.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Construction Services - Building Excellence in Bangalore',
      },
    ],
  },
  alternates: {
    canonical: '/services/construction',
  },
}