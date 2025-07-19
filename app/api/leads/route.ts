import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { LeadService } from '@/lib/services/lead-service'

// GET all leads (admin only)
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
    const source = searchParams.get('source')
    const assignedTo = searchParams.get('assignedTo')
    
    const skip = (page - 1) * limit
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (source) query.source = source
    if (assignedTo) query.assignedTo = assignedTo
    
    // Get leads with pagination
    const [leads, total] = await Promise.all([
      Lead.find(query)
        .populate('assignedTo', 'name email')
        .sort({ score: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query)
    ])
    
    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

// POST create new lead
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || (!body.email && !body.phone)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name and either email or phone are required' 
        },
        { status: 400 }
      )
    }
    
    // Create lead using the service
    const lead = await LeadService.createLead({
      name: body.name,
      email: body.email || `${body.phone}@phone.placeholder`,
      phone: body.phone,
      source: body.source || 'manual',
      projectType: body.projectType,
      budget: body.budget,
      timeline: body.timeline,
      location: body.location,
      message: body.message,
      requirements: body.requirements,
      downloadedResource: body.downloadedResource,
      interestedIn: body.interestedIn,
      referralSource: body.referralSource,
      tags: body.tags,
    })
    
    return NextResponse.json({
      success: true,
      data: lead,
      message: 'Lead captured successfully'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating lead:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}