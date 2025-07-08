import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';
    const tag = searchParams.get('tag');
    
    const skip = (page - 1) * limit;
    
    const query: any = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (tag) query.tags = tag;
    
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('author', 'name email avatar')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      images,
      category,
      tags,
      author,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;
    
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }
    
    const blogPost = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      images,
      category,
      tags,
      author,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
    });
    
    const populatedPost = await BlogPost.findById(blogPost._id)
      .populate('author', 'name email avatar')
      .lean();
    
    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}