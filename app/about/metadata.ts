import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Sahara Developers - 20+ Years of Excellence in Bangalore',
  description: 'Learn about Sahara Developers, Bangalore\'s premier construction company with over 20 years of experience. 500+ successful projects, 2000+ happy clients, and a commitment to quality construction and interior design.',
  keywords: 'about Sahara Developers, construction company Bangalore, contractors history, building experience Bangalore, construction expertise, trusted builders Bangalore',
  openGraph: {
    title: 'About Sahara Developers - Leading Contractors in Bangalore',
    description: 'Discover our 20+ year journey of building dreams in Bangalore. From residential to commercial projects, we\'ve earned the trust of 2000+ clients.',
    url: 'https://saharadevelopers.com/about',
    images: [
      {
        url: '/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Team - Construction Experts in Bangalore',
      },
    ],
  },
  alternates: {
    canonical: '/about',
  },
}