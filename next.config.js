/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'placehold.co']
  },
  transpilePackages: ['framer-motion'],
  swcMinify: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

module.exports = nextConfig;