import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Construction & Design Insights - Sahara Developers',
  description: 'Expert insights on construction, interior design, sustainability, and home building trends. Get advice from Bangalore\'s premier construction company.',
  keywords: 'construction blog, interior design blog, home building tips, sustainable construction, Bangalore construction insights, design trends 2024',
  openGraph: {
    title: 'Blog - Construction & Design Insights | Sahara Developers',
    description: 'Stay updated with the latest trends in construction and interior design. Expert advice from Bangalore\'s trusted builders.',
    url: 'https://saharadevelopers.com/blog',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Blog - Construction & Design Insights',
      },
    ],
  },
  alternates: {
    canonical: '/blog',
  },
}