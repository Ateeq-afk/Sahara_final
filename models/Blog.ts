import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  
  // Publishing
  status: 'draft' | 'published' | 'archived'
  publishedAt: Date
  
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]
  
  // Content
  featuredImage: string
  categories: string[]
  tags: string[]
  readingTime: number
  
  // Author
  author: string
  
  // Engagement
  views: number
  likes: number
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true, maxlength: 300 },
  
  // Publishing
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: { type: Date },
  
  // SEO
  metaTitle: { type: String, maxlength: 60 },
  metaDescription: { type: String, maxlength: 160 },
  keywords: [{ type: String }],
  
  // Content
  featuredImage: { type: String },
  categories: [{ type: String }],
  tags: [{ type: String }],
  readingTime: { type: Number, default: 5 },
  
  // Author
  author: { type: String, default: 'Sahara Team' },
  
  // Engagement
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Indexes
BlogSchema.index({ slug: 1 })
BlogSchema.index({ status: 1 })
BlogSchema.index({ publishedAt: -1 })
BlogSchema.index({ categories: 1 })
BlogSchema.index({ tags: 1 })

// Pre-save middleware
BlogSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Auto-generate slug if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  
  // Set publishedAt when status changes to published
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  next()
})

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)

export default Blog