import { NextRequest, NextResponse } from 'next/server';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    
    // TODO: Check for uniqueness when BlogPost model is created
    
    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Error generating slug:', error);
    return NextResponse.json(
      { error: 'Failed to generate slug' },
      { status: 500 }
    );
  }
}