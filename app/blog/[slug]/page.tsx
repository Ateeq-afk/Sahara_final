'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  Eye,
  Tag,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

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

const CATEGORIES = {
  'construction': 'Construction',
  'interior-design': 'Interior Design',
  'architecture': 'Architecture',
  'tips': 'Tips & Tricks',
  'news': 'Industry News',
  'case-studies': 'Case Studies'
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/simple/${slug}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        // console.error('Error response:', errorData)
        throw new Error(errorData.error || 'Post not found')
      }
      
      const data = await response.json()
      // console.log('Post data received:', data)
      setPost(data)
      
      // Fetch related posts
      fetchRelatedPosts(data.category, data.id)
    } catch (error) {
      console.error('Error fetching post:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load blog post',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (category: string, currentId: string) => {
    try {
      const response = await fetch(`/api/blog/simple?category=${category}&limit=3`)
      if (!response.ok) return
      
      const data = await response.json()
      setRelatedPosts(data.posts.filter((p: BlogPost) => p.id !== currentId))
    } catch (error) {
      console.error('Error fetching related posts:', error)
    }
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

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: 'Link copied!',
      description: 'The article link has been copied to your clipboard.'
    })
  }

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    return content.split('\n').map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.substring(3)}</h2>
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.substring(4)}</h3>
      }
      
      // Lists
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 list-disc">{paragraph.substring(2)}</li>
      }
      
      // Blockquotes
      if (paragraph.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
            {paragraph.substring(2)}
          </blockquote>
        )
      }
      
      // Regular paragraphs
      if (paragraph.trim()) {
        return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
      }
      
      return null
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Article Header */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="secondary">
              {CATEGORIES[post.category as keyof typeof CATEGORIES] || post.category}
            </Badge>
            <span className="text-gray-500 flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views} views
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{post.author.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {calculateReadTime(post.content)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLiked(!liked)}
                className={liked ? 'text-red-500' : ''}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBookmarked(!bookmarked)}
                className={bookmarked ? 'text-blue-500' : ''}
              >
                <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 -mx-4 md:-mx-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-12" />

        {/* Share Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>

        {/* Author Card */}
        <Card className="p-6 mb-12">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{post.author.name}</h3>
              <p className="text-gray-600 mb-3">{post.author.role}</p>
              <p className="text-gray-700">
                Expert in construction and interior design with over 10 years of experience 
                helping families build their dream homes in Bangalore.
              </p>
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="group h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(relatedPost.publishedAt)}
                        <ChevronRight className="h-4 w-4 ml-auto text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Don't miss an update</h2>
          <p className="text-gray-600 mb-8">
            Get the latest construction and design insights delivered to your inbox
          </p>
          <form 
            name="newsletter-blog-post"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="flex gap-4 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              form.submit();
            }}
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="newsletter-blog-post" />
            <div hidden>
              <input name="bot-field" />
            </div>
            
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </main>
  )
}