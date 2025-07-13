import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { leadSchema } from '@/lib/validations/lead'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
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
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const body = await request.json()
    
    // Validate input with zod
    const validationResult = leadSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }
    
    const validatedData = validationResult.data
    
    // Check for duplicate email
    const existingLead = await Lead.findOne({ email: validatedData.email })
    if (existingLead) {
      return NextResponse.json(
        { success: false, message: 'Lead with this email already exists' },
        { status: 409 }
      )
    }
    
    // Create new lead
    const lead = await Lead.create({
      ...validatedData,
      status: validatedData.status || 'new',
      priority: validatedData.priority || 'medium',
      source: validatedData.source || 'website'
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