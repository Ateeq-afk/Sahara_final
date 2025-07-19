import './globals.css';
import './apple-minimal.css';
import './mobile-optimizations.css';
import './mobile-scroll-fix.css';
import './mobile-fixes.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import NavbarMinimal from '@/components/navbar-minimal';
import FooterMinimal from '@/components/footer-minimal';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/error-boundary';
import NextAuthSessionProvider from '@/components/providers/session-provider';
import WhatsAppWidget from '@/components/whatsapp-widget';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/client-layout'), {
  ssr: false
});


export const metadata: Metadata = {
  title: 'Sahara Developers | Premier Contractors in Bangalore | Construction & Interior Design',
  description: 'Leading contractors in Bangalore with 20+ years of excellence. Sahara Developers specializes in residential construction, commercial projects, and luxury interior design. Trusted by 500+ clients across Bangalore.',
  keywords: 'contractors in Bangalore, construction contractors Bangalore, building contractors Bangalore, interior design Bangalore, residential construction, commercial construction, home construction Bangalore, construction company Bangalore, architects Bangalore, turnkey projects, renovation contractors',
  authors: [{ name: 'Sahara Developers' }],
  creator: 'Sahara Developers',
  publisher: 'Sahara Developers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saharadevelopers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sahara Developers | Premier Contractors in Bangalore | Construction & Interior Design',
    description: 'Leading contractors in Bangalore with 20+ years of excellence. Trusted by 500+ clients for residential construction, commercial projects, and luxury interior design.',
    url: 'https://saharadevelopers.com',
    siteName: 'Sahara Developers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sahara Developers - Premier Contractors in Bangalore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahara Developers | Premier Contractors in Bangalore',
    description: 'Leading contractors in Bangalore with 20+ years of excellence. Trusted by 500+ clients for construction and interior design.',
    images: ['/og-image.jpg'],
    creator: '@saharadevelopers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B7355" />
        <meta name="msapplication-TileColor" content="#8B7355" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        {/* Language Alternatives */}
        <link rel="alternate" hrefLang="en-IN" href="https://saharadevelopers.com" />
        <link rel="alternate" hrefLang="x-default" href="https://saharadevelopers.com" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Sahara Developers RSS Feed" href="/feed.xml" />
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://saharadevelopers.com/#organization",
              "name": "Sahara Developers",
              "alternateName": ["Sahara Developers Bangalore", "Contractors in Bangalore"],
              "url": "https://saharadevelopers.com",
              "logo": "https://saharadevelopers.com/logo.png",
              "image": "https://saharadevelopers.com/og-image.jpg",
              "description": "Leading contractors in Bangalore with 20+ years of excellence in residential construction, commercial projects, and luxury interior design. Trusted by 500+ clients.",
              "priceRange": "₹₹₹",
              "telephone": "+91-9591-837216",
              "email": "contact@example.com",
              "foundingDate": "2003",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "100-feet Ring Road, 8th Main Road, BTM Layout 1st Stage",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560029",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9141,
                "longitude": 77.6101
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 12.9716,
                  "longitude": 77.5946
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Construction and Interior Design Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Residential Construction",
                      "description": "Custom home construction and villa development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Construction",
                      "description": "Office buildings, retail spaces, and commercial complexes"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Interior Design",
                      "description": "Luxury interior design and space planning"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Renovation Services",
                      "description": "Home renovation and remodeling projects"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "sameAs": [
                "https://www.facebook.com/saharadevelopers",
                "https://www.instagram.com/saharadevelopers",
                "https://www.linkedin.com/company/saharadevelopers"
              ]
            })
          }}
        />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sahara Developers",
              "url": "https://saharadevelopers.com",
              "logo": "https://saharadevelopers.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9591-837216",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi", "kn"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "100-feet Ring Road, 8th Main Road, BTM Layout 1st Stage",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560029",
                "addressCountry": "IN"
              }
            })
          }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TLV992L06Y"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TLV992L06Y');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <ClientLayout>{children}</ClientLayout>
              <Toaster />
            </ErrorBoundary>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}