// Re-export the file-based blog store
// This provides persistence across server restarts
import blogFileStore from './blog-file-store'
export default blogFileStore

/* Original in-memory implementation preserved below for reference

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
  createdAt: string
  updatedAt: string
}

// Initial sample posts
const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Modern Home Design Trends for 2024',
    slug: '10-modern-home-design-trends-2024',
    excerpt: 'Discover the latest trends in modern home design that are shaping the way we build and live in 2024.',
    content: `# 10 Modern Home Design Trends for 2024

The world of home design is constantly evolving, and 2024 brings exciting new trends that blend functionality with aesthetics. Here are the top 10 trends dominating the construction and interior design landscape.

## 1. Sustainable Materials

Eco-conscious homeowners are increasingly opting for sustainable building materials. From reclaimed wood to recycled steel, the focus is on reducing environmental impact without compromising on quality.

## 2. Smart Home Integration

The future is here with seamless smart home technology. Voice-controlled systems, automated lighting, and intelligent climate control are becoming standard features in modern homes.

## 3. Biophilic Design

Bringing nature indoors continues to be a major trend. Living walls, indoor gardens, and natural light optimization create healthier, more vibrant living spaces.

## 4. Minimalist Aesthetics

Less is more in 2024. Clean lines, uncluttered spaces, and functional design elements create a sense of calm and sophistication.

## 5. Multi-Functional Spaces

With remote work becoming permanent for many, homes now feature versatile spaces that can transform from office to gym to entertainment area.`,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    category: 'interior-design',
    tags: ['trends', 'modern', 'design', '2024'],
    status: 'published',
    publishedAt: '2024-03-15T10:00:00Z',
    views: 1250,
    author: {
      name: 'Sarah Johnson',
      role: 'Design Expert',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Sustainable Construction Materials: A Comprehensive Guide',
    slug: 'sustainable-construction-materials-guide',
    excerpt: 'Learn about eco-friendly construction materials that reduce environmental impact without compromising quality.',
    content: `# Sustainable Construction Materials: A Comprehensive Guide

As environmental consciousness grows, the construction industry is embracing sustainable materials that offer both performance and eco-friendliness.

## Why Choose Sustainable Materials?

- **Reduced Carbon Footprint**: Lower emissions during production and transportation
- **Energy Efficiency**: Better insulation and thermal properties
- **Durability**: Often last longer than traditional materials
- **Health Benefits**: Non-toxic and improve indoor air quality

## Top Sustainable Materials

### 1. Bamboo
Fast-growing and stronger than steel in tensile strength, bamboo is perfect for flooring and structural elements.

### 2. Recycled Steel
Using recycled steel reduces mining impact and energy consumption by up to 75%.

### 3. Hempcrete
Made from hemp fibers, this material is carbon-negative and provides excellent insulation.

### 4. Cork
Renewable, biodegradable, and naturally resistant to mold and insects.`,
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    category: 'construction',
    tags: ['sustainability', 'materials', 'eco-friendly', 'green-building'],
    status: 'published',
    publishedAt: '2024-03-10T12:00:00Z',
    views: 890,
    author: {
      name: 'Mike Chen',
      role: 'Construction Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    createdAt: '2024-03-08T09:00:00Z',
    updatedAt: '2024-03-10T12:00:00Z'
  },
  {
    id: '3',
    title: 'Bangalore Real Estate Market Analysis 2024',
    slug: 'bangalore-real-estate-market-analysis-2024',
    excerpt: 'An in-depth look at Bangalore\'s booming real estate market, trends, and investment opportunities.',
    content: `# Bangalore Real Estate Market Analysis 2024

Bangalore continues to be one of India's hottest real estate markets. Here's what you need to know about the current trends and opportunities.

## Market Overview

The Silicon Valley of India shows no signs of slowing down. With IT companies expanding and new startups emerging, demand for both residential and commercial properties remains strong.

## Key Growth Areas

### 1. North Bangalore
- Hebbal, Yelahanka, and Devanahalli
- Proximity to airport driving development
- 15-20% annual appreciation

### 2. East Bangalore
- Whitefield and Marathahalli
- IT corridor expansion
- Excellent infrastructure development

### 3. South Bangalore
- Electronic City and Bannerghatta Road
- Established IT hubs
- Premium residential projects`,
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    category: 'news',
    tags: ['bangalore', 'real-estate', 'market-analysis', 'investment'],
    status: 'published',
    publishedAt: '2024-03-05T14:00:00Z',
    views: 2100,
    author: {
      name: 'Priya Sharma',
      role: 'Market Analyst',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T14:00:00Z'
  }
]

class BlogStore {
  private posts: Map<string, BlogPost>
  
  constructor() {
    this.posts = new Map()
    // Initialize with sample posts
    initialPosts.forEach(post => {
      this.posts.set(post.id, post)
    })
  }

  // Get all posts with filtering
  async getPosts(options: {
    page?: number
    limit?: number
    category?: string
    tag?: string
    search?: string
    status?: string
  } = {}) {
    const {
      page = 1,
      limit = 9,
      category,
      tag,
      search,
      status = 'published'
    } = options

    let filteredPosts = Array.from(this.posts.values())

    // Apply filters
    if (status !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.status === status)
    }

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(tag))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    // Sort by published date
    filteredPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    // Pagination
    const start = (page - 1) * limit
    const paginatedPosts = filteredPosts.slice(start, start + limit)

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
        pages: Math.ceil(filteredPosts.length / limit)
      }
    }
  }

  // Get single post by ID or slug
  async getPost(idOrSlug: string) {
    // Check if it's an ID
    let post = this.posts.get(idOrSlug)
    
    // If not found by ID, search by slug
    if (!post) {
      post = Array.from(this.posts.values()).find(p => p.slug === idOrSlug)
    }

    if (post) {
      // Increment views
      post.views++
      return { ...post }
    }

    return null
  }

  // Create new post
  async createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'> & { slug?: string }) {
    const id = Date.now().toString()
    const now = new Date().toISOString()
    
    // Ensure slug is generated if not provided
    let slug = data.slug
    if (!slug && data.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      
      // Check for duplicate slugs
      let counter = 1
      let finalSlug = slug
      while (Array.from(this.posts.values()).some(p => p.slug === finalSlug)) {
        finalSlug = `${slug}-${counter}`
        counter++
      }
      slug = finalSlug
    }
    
    const newPost: BlogPost = {
      ...data,
      slug: slug || id, // Fallback to id if no slug
      id,
      views: 0,
      createdAt: now,
      updatedAt: now
    }

    this.posts.set(id, newPost)
    return newPost
  }

  // Update post
  async updatePost(id: string, data: Partial<BlogPost>) {
    const post = this.posts.get(id)
    if (!post) return null

    const updatedPost = {
      ...post,
      ...data,
      id: post.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    }

    this.posts.set(id, updatedPost)
    return updatedPost
  }

  // Delete post
  async deletePost(id: string) {
    const post = this.posts.get(id)
    if (!post) return false

    this.posts.delete(id)
    return true
  }

  // Get related posts
  async getRelatedPosts(postId: string, limit: number = 3) {
    const post = this.posts.get(postId)
    if (!post) return []

    const allPosts = Array.from(this.posts.values())
      .filter(p => p.id !== postId && p.status === 'published')

    // Score posts based on similarity
    const scoredPosts = allPosts.map(p => {
      let score = 0
      
      // Same category
      if (p.category === post.category) score += 3
      
      // Shared tags
      const sharedTags = p.tags.filter(tag => post.tags.includes(tag))
      score += sharedTags.length * 2
      
      return { post: p, score }
    })

    // Sort by score and return top matches
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post)
  }

  // Get popular posts
  async getPopularPosts(limit: number = 5) {
    return Array.from(this.posts.values())
      .filter(post => post.status === 'published')
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
  }

  // Get posts by category
  async getPostsByCategory(category: string, limit?: number) {
    const posts = Array.from(this.posts.values())
      .filter(post => post.category === category && post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return limit ? posts.slice(0, limit) : posts
  }

  // Get all categories with post count
  async getCategories() {
    const categories = new Map<string, number>()
    
    Array.from(this.posts.values())
      .filter(post => post.status === 'published')
      .forEach(post => {
        const count = categories.get(post.category) || 0
        categories.set(post.category, count + 1)
      })

    return Array.from(categories.entries()).map(([category, count]) => ({
      category,
      count
    }))
  }

  // Get all tags with usage count
  async getTags() {
    const tags = new Map<string, number>()
    
    Array.from(this.posts.values())
      .filter(post => post.status === 'published')
      .forEach(post => {
        post.tags.forEach(tag => {
          const count = tags.get(tag) || 0
          tags.set(tag, count + 1)
        })
      })

    return Array.from(tags.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }
}

// Create singleton instance
const blogStore = new BlogStore()

// Export the in-memory store (not used)
// export default blogStore
*/