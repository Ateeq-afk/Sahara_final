import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images: string[];
  category: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views: number;
  likes: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    images: [{
      type: String,
    }],
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['construction', 'interior-design', 'architecture', 'tips', 'news', 'case-studies'],
    },
    tags: [{
      type: String,
      lowercase: true,
      trim: true,
    }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      maxlength: [60, 'SEO title cannot exceed 60 characters'],
    },
    seoDescription: {
      type: String,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
    },
    seoKeywords: [{
      type: String,
      lowercase: true,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ author: 1 });

blogPostSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  if (!this.seoTitle) {
    this.seoTitle = this.title;
  }
  
  if (!this.seoDescription) {
    this.seoDescription = this.excerpt;
  }
  
  next();
});

const BlogPost = (mongoose.models.BlogPost as mongoose.Model<IBlogPost>) || mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;