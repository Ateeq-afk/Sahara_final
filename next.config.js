/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.pexels.com', 'placehold.co', 'images.unsplash.com', 'upload.wikimedia.org', 'danubehome.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  transpilePackages: ['framer-motion'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

module.exports = nextConfig;