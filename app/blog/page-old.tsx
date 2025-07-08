"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, Search, Filter } from 'lucide-react'

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    slug: 'whitefield-real-estate-boom-2024',
    title: 'Whitefield: Why It\'s Bangalore\'s Hottest Real Estate Market in 2024',
    excerpt: 'Explore why Whitefield continues to attract homebuyers and investors with its IT corridor proximity, infrastructure development, and premium lifestyle offerings.',
    content: 'Full article content here...',
    author: 'Market Research Team',
    date: '2024-01-18',
    readTime: '8 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=1600&q=90',
    featured: true
  },
  {
    id: 2,
    slug: 'electronic-city-construction-guide',
    title: 'Building Your Dream Home in Electronic City: Complete Guide',
    excerpt: 'Everything you need to know about construction in Electronic City - from BBMP approvals to choosing the right contractors for this tech hub.',
    content: 'Full article content here...',
    author: 'Sahara Team',
    date: '2024-01-16',
    readTime: '10 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=90',
    featured: true
  },
  {
    id: 3,
    slug: 'bangalore-north-emerging-localities',
    title: 'North Bangalore\'s Rising Stars: Hebbal, Yelahanka & Devanahalli',
    excerpt: 'Discover why North Bangalore is becoming the preferred choice for new homeowners with upcoming metro connectivity and proximity to the airport.',
    content: 'Full article content here...',
    author: 'Location Experts',
    date: '2024-01-14',
    readTime: '9 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=90',
    featured: false
  },
  {
    id: 4,
    slug: 'sarjapur-road-construction-trends',
    title: 'Sarjapur Road: Construction Trends & Investment Opportunities',
    excerpt: 'Analysis of why Sarjapur Road has become Bangalore\'s premium residential corridor with insights on construction costs and ROI.',
    content: 'Full article content here...',
    author: 'Investment Team',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90',
    featured: false
  },
  {
    id: 5,
    slug: 'bangalore-water-crisis-solutions',
    title: 'Building Water-Secure Homes in Bangalore: A Developer\'s Guide',
    excerpt: 'Practical solutions for water management in Bangalore homes - from rainwater harvesting to borewells and tanker-free living.',
    content: 'Full article content here...',
    author: 'Sustainability Team',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&q=90',
    featured: false
  },
  {
    id: 6,
    slug: 'kr-puram-affordable-housing',
    title: 'KR Puram: Bangalore\'s Best-Kept Secret for Affordable Housing',
    excerpt: 'Why KR Puram is emerging as a hotspot for first-time homebuyers with excellent connectivity and reasonable construction costs.',
    content: 'Full article content here...',
    author: 'Market Analysis Team',
    date: '2024-01-08',
    readTime: '6 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=90',
    featured: false
  },
  {
    id: 7,
    slug: 'bangalore-metro-property-impact',
    title: 'How Bangalore Metro Phase 2 is Reshaping Property Markets',
    excerpt: 'Detailed analysis of upcoming metro lines and their impact on property values in areas like Kanakapura Road, Magadi Road, and Airport Road.',
    content: 'Full article content here...',
    author: 'Infrastructure Team',
    date: '2024-01-06',
    readTime: '11 min read',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=90',
    featured: false
  },
  {
    id: 8,
    slug: 'hsr-layout-premium-living',
    title: 'HSR Layout: Building Premium Homes in Bangalore\'s Start-up Hub',
    excerpt: 'Construction insights for HSR Layout - from dealing with high land costs to creating homes that appeal to the tech-savvy demographic.',
    content: 'Full article content here...',
    author: 'Premium Homes Team',
    date: '2024-01-04',
    readTime: '8 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90',
    featured: false
  },
  {
    id: 9,
    slug: 'bangalore-villa-vs-apartment',
    title: 'Villa vs Apartment in Bangalore: Making the Right Choice in 2024',
    excerpt: 'Comprehensive comparison of construction costs, maintenance, and lifestyle factors between villas and apartments across different Bangalore localities.',
    content: 'Full article content here...',
    author: 'Lifestyle Team',
    date: '2024-01-02',
    readTime: '9 min read',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90',
    featured: false
  },
  {
    id: 10,
    slug: 'bangalore-building-bylaws-2024',
    title: 'Navigating Bangalore\'s Building Bylaws: 2024 Updates',
    excerpt: 'Essential guide to BBMP regulations, setback rules, and approval processes for residential construction in different Bangalore zones.',
    content: 'Full article content here...',
    author: 'Legal Team',
    date: '2023-12-30',
    readTime: '15 min read',
    category: 'Regulations',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=90',
    featured: false
  },
  {
    id: 11,
    slug: 'jayanagar-renovation-guide',
    title: 'Renovating Heritage Homes in Jayanagar & Basavanagudi',
    excerpt: 'Special considerations for renovating old Bangalore homes - preserving character while adding modern amenities.',
    content: 'Full article content here...',
    author: 'Heritage Team',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Renovation',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&q=90',
    featured: false
  },
  {
    id: 12,
    slug: 'bangalore-gated-communities',
    title: 'Building in Bangalore\'s Gated Communities: Pros and Cons',
    excerpt: 'Detailed analysis of construction in gated communities across Bangalore - from approval processes to community guidelines.',
    content: 'Full article content here...',
    author: 'Community Living Team',
    date: '2023-12-26',
    readTime: '10 min read',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=90',
    featured: false
  }
]

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Bangalore Areas', count: 6 },
  { name: 'Construction', count: 3 },
  { name: 'Sustainability', count: 1 },
  { name: 'Infrastructure', count: 1 },
  { name: 'Regulations', count: 1 },
  { name: 'Renovation', count: 1 }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])
  
  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        <div className="relative container mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight"
            >
              Insights &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Inspiration
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed"
            >
              Expert advice, design trends, and construction insights from our team
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Bar */}
      <section className="sticky top-24 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-amber-600/20 border border-transparent focus:border-amber-600/30 transition-all duration-300 outline-none"
              />
            </div>
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-60">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="py-20">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group relative rounded-3xl overflow-hidden bg-gray-100">
                  <div className="grid lg:grid-cols-2 min-h-[600px]">
                    {/* Image */}
                    <div className="relative h-full min-h-[400px]">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-12 lg:p-16 flex flex-col justify-center">
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-2 text-amber-600 font-medium">
                          <Tag className="h-4 w-4" />
                          Featured
                        </span>
                      </div>
                      
                      <h2 className="text-4xl lg:text-5xl font-semibold mb-6 group-hover:text-amber-600 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      
                      <div className="mt-8">
                        <span className="inline-flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all duration-300">
                          Read Article
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'All' && !searchQuery ? regularPosts : filteredPosts).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-semibold mb-6">
              Stay in the know.
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Get the latest insights on construction and design delivered to your inbox.
            </p>
            
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 px-6 rounded-full bg-white border border-gray-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all duration-300 outline-none"
              />
              <button
                type="submit"
                className="px-8 h-14 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}