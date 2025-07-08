import { NextRequest, NextResponse } from 'next/server'
import blogStore from '@/lib/blog-store'

export async function GET(request: NextRequest) {
  const allPosts = await blogStore.getPosts({ status: 'all', limit: 100 })
  
  return NextResponse.json({
    totalPosts: allPosts.posts.length,
    posts: allPosts.posts.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      category: p.category
    }))
  })
}