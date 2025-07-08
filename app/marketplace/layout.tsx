import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Materials Marketplace | Sahara Construction',
  description: 'Find quality construction materials from verified suppliers at competitive prices. Browse cement, steel, tiles, paints, and more.',
  keywords: 'construction materials, building materials, cement, steel, tiles, paint, electrical, plumbing, Bangalore',
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}