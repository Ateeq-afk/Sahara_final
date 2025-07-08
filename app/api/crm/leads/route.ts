import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const source = searchParams.get('source')
    const search = searchParams.get('search')
    
    // Build query
    const query: any = {}
    
    if (status) query.status = status
    if (priority) query.priority = priority
    if (source) query.source = source
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const [leads, total, statusCounts] = await Promise.all([
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query),
      Lead.aggregate([
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
      leads,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      },
      statusSummary
    })
    
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone, interestedService, budget, timeline } = body
    
    if (!name || !email || !phone || !interestedService || !budget || !timeline) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Check for duplicate email
    const existingLead = await Lead.findOne({ email })
    if (existingLead) {
      return NextResponse.json(
        { success: false, message: 'Lead with this email already exists' },
        { status: 409 }
      )
    }
    
    // Create new lead
    const lead = await Lead.create({
      ...body,
      status: 'new',
      priority: body.priority || 'medium',
      source: body.source || 'website'
    })
    
    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      lead
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create lead' },
      { status: 500 }
    )
  }
}