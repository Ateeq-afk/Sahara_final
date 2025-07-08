import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    // Build query
    const query: any = {}
    
    if (status) query.status = status
    if (category) query.categories = { $in: [category] }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const [blogs, total, statusCounts] = await Promise.all([
      Blog.find(query)
        .select('title slug excerpt status publishedAt author views likes categories tags createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
      Blog.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ])
    
    // Format status counts
    const statusSummary = statusCounts.reduce((acc: any, item: any) => {
      acc[item._id] = item.count
      return acc
    }, {})
    
    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      },
      statusSummary
    })
    
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    const { title, content, excerpt } = body
    
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { success: false, message: 'Title, content, and excerpt are required' },
        { status: 400 }
      )
    }
    
    // Generate slug if not provided
    if (!body.slug) {
      body.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
    }
    
    // Check for duplicate slug
    const existingBlog = await Blog.findOne({ slug: body.slug })
    if (existingBlog) {
      // Append timestamp to make unique
      body.slug = `${body.slug}-${Date.now()}`
    }
    
    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(' ').length
    body.readingTime = Math.ceil(wordCount / 200)
    
    // Create new blog
    const blog = await Blog.create({
      ...body,
      status: body.status || 'draft',
      author: body.author || 'Sahara Team'
    })
    
    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      blog
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    )
  }
}