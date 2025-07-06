import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Construction & Interior Design - Sahara Developers Bangalore',
  description: 'Explore our comprehensive construction and interior design services in Bangalore. From residential construction to commercial projects, renovations, and luxury interiors. Get expert solutions for all your building needs.',
  keywords: 'construction services Bangalore, interior design services, residential construction, commercial construction, renovation services, turnkey projects Bangalore, building contractors services',
  openGraph: {
    title: 'Construction & Interior Design Services - Sahara Developers',
    description: 'Complete construction and interior design solutions in Bangalore. Residential, commercial, renovation, and turnkey projects with 20+ years of expertise.',
    url: 'https://saharadevelopers.com/services',
    images: [
      {
        url: '/og-image-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Services - Construction and Interior Design',
      },
    ],
  },
  alternates: {
    canonical: '/services',
  },
}