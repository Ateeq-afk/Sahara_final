'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, Search, Filter, TrendingUp, BookOpen, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt: string
  views: number
  author: {
    name: string
    role: string
    image: string
  }
}

interface BlogResponse {
  posts: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'construction', label: 'Construction' },
  { value: 'interior-design', label: 'Interior Design' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'tips', label: 'Tips & Tricks' },
  { value: 'news', label: 'Industry News' },
  { value: 'case-studies', label: 'Case Studies' }
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  // Fetch blog posts
  useEffect(() => {
    fetchPosts()
  }, [selectedCategory, pagination.page])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: '9',
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery })
      })

      const response = await fetch(`/api/blog/simple?${params}`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data: BlogResponse = await response.json()
      setPosts(data.posts)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Fallback to some default posts if API fails
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination({ ...pagination, page: 1 })
    fetchPosts()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity, scale }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Insights & Updates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Construction & Design Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Expert insights, industry trends, and practical tips for your construction and interior design projects in Bangalore
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl shadow-lg border-0"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b sticky top-0 bg-white z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="h-4 w-4" />
              <span>{pagination.total} articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 backdrop-blur text-gray-700">
                            {CATEGORIES.find(c => c.value === post.category)?.label || post.category}
                          </Badge>
                        </div>
                        {post.views > 1000 && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Popular
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {calculateReadTime(post.content)}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.author.image}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <p className="text-xs text-gray-500">{post.author.role}</p>
                            </div>
                          </div>
                          
                          <span className="text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {[...Array(pagination.pages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={pagination.page === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPagination({ ...pagination, page: i + 1 })}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Get the latest construction insights and design trends delivered to your inbox
            </p>
            
            <form 
              name="newsletter-blog"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="flex gap-4 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // You can add custom submission logic here if needed
                const form = e.target as HTMLFormElement;
                form.submit();
              }}
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="newsletter-blog" />
              <div hidden>
                <input name="bot-field" />
              </div>
              
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              Join 5,000+ industry professionals. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}