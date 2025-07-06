import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior Design Services | Luxury Home & Office Interiors - Sahara Developers',
  description: 'Transform your space with premium interior design services in Bangalore. Modern home interiors, office design, modular kitchens, and complete interior solutions. Expert designers, quality materials, stunning results.',
  keywords: 'interior design Bangalore, home interiors, office interior design, modular kitchen Bangalore, luxury interiors, interior decorators Bangalore, residential interiors, commercial interiors',
  openGraph: {
    title: 'Interior Design Services - Transform Your Space | Sahara Developers',
    description: 'Create stunning interiors with Bangalore\'s premier interior design team. From concept to completion, we bring your vision to life with style and sophistication.',
    url: 'https://saharadevelopers.com/services/interior-decor',
    images: [
      {
        url: '/og-image-interior.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Interior Design - Luxury Interiors in Bangalore',
      },
    ],
  },
  alternates: {
    canonical: '/services/interior-decor',
  },
}