import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Showcase | Sahara Developers',
  description: 'Explore our premium construction projects with interactive 3D views and detailed galleries. Experience our luxury villas, commercial complexes, and residential apartments.',
  keywords: 'construction showcase, 3D project view, Bangalore construction projects, luxury villas, commercial buildings, residential apartments',
  openGraph: {
    title: 'Project Showcase | Sahara Developers',
    description: 'Explore our premium construction projects with interactive 3D views',
    type: 'website',
    url: 'https://saharadevelopers.com/showcase',
    images: [
      {
        url: '/og-showcase.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Project Showcase',
      },
    ],
  },
}