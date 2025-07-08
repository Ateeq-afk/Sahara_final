import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { title } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;
    
    while (await BlogPost.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Error generating slug:', error);
    return NextResponse.json(
      { error: 'Failed to generate slug' },
      { status: 500 }
    );
  }
}