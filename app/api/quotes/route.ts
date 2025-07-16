import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Quote from '@/models/Quote'

// GET all quotes (with pagination and filters)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }
    
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const projectType = searchParams.get('projectType')
    
    const skip = (page - 1) * limit
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (projectType) query.projectType = projectType
    
    // Get quotes with pagination
    const [quotes, total] = await Promise.all([
      Quote.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Quote.countDocuments(query)
    ])
    
    return NextResponse.json({
      success: true,
      data: quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}

// POST create new quote
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Transform the form data to match our Quote model
    const quoteData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      projectType: body.serviceType || 'construction',
      propertyType: body.projectType || 'other',
      area: body.propertySize ? parseInt(body.propertySize.split('-')[0]) || 1000 : 1000,
      location: body.location || 'Bangalore',
      budget: {
        min: body.budget ? parseInt(body.budget.split('-')[0]) * 100000 : 1000000,
        max: body.budget ? parseInt(body.budget.split('-')[1]) * 100000 : 5000000
      },
      expectedStartDate: body.timeline === 'immediate' 
        ? new Date() 
        : new Date(Date.now() + (body.timeline === '3-months' ? 90 : 180) * 24 * 60 * 60 * 1000),
      urgency: body.timeline || '1-3months',
      requirements: body.message || '',
      referralSource: 'website-quote-form'
    }
    
    // Create new quote
    const quote = await Quote.create(quoteData)
    
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer
    
    return NextResponse.json({
      success: true,
      data: quote,
      message: 'Quote request submitted successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating quote:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create quote' },
      { status: 500 }
    )
  }
}