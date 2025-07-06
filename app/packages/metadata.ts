import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Packages | Essential, Premium & Luxury Plans - Sahara Developers',
  description: 'Choose from our transparent construction packages in Bangalore. Essential (₹1,599/sqft), Premium (₹2,299/sqft), or Luxury (₹3,499/sqft). All-inclusive pricing with quality materials and warranty.',
  keywords: 'construction packages Bangalore, construction cost per sqft, home construction packages, building packages, transparent pricing construction, essential premium luxury construction',
  openGraph: {
    title: 'Transparent Construction Packages - Essential to Luxury | Sahara Developers',
    description: 'Clear, all-inclusive construction packages starting at ₹1,599/sqft. No hidden costs, quality materials, and comprehensive warranty. Choose your perfect plan.',
    url: 'https://saharadevelopers.com/packages',
    images: [
      {
        url: '/og-image-packages.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers Construction Packages - Transparent Pricing',
      },
    ],
  },
  alternates: {
    canonical: '/packages',
  },
}