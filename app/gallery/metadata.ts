import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Gallery | Our Work Portfolio - Sahara Developers Bangalore',
  description: 'Explore our portfolio of 500+ completed construction and interior design projects in Bangalore. View residential homes, commercial buildings, luxury interiors, and renovation transformations.',
  keywords: 'construction portfolio Bangalore, interior design gallery, completed projects, residential projects gallery, commercial construction portfolio, before after renovation, Sahara Developers work',
  openGraph: {
    title: 'Project Gallery - 500+ Completed Projects | Sahara Developers',
    description: 'Browse through our impressive portfolio of construction and interior design projects across Bangalore. See the quality and craftsmanship in every detail.',
    url: 'https://saharadevelopers.com/gallery',
    images: [
      {
        url: '/og-image-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Project Gallery - Construction & Interior Portfolio',
      },
    ],
  },
  alternates: {
    canonical: '/gallery',
  },
}