import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import SupportTicket, { ISupportTicket } from '@/src/models/SupportTicket'
import { supportTicketSchema } from '@/lib/form-schemas'

// POST - Create a new support ticket
export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate input data against Zod schema
    const validationResult = supportTicketSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Connect to database
    await connectToDatabase()

    // Create new support ticket
    const newTicket = new SupportTicket({
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      projectId: validatedData.projectId,
      priority: validatedData.priority,
      category: validatedData.category,
      subject: validatedData.subject,
      description: validatedData.description,
      status: 'open',
      attachments: validatedData.attachments || [],
      responses: []
    })

    // Save to database
    const savedTicket = await newTicket.save()

    // Return success response
    return NextResponse.json({
      success: true,
      ticket: {
        id: savedTicket._id.toString(),
        ticketId: savedTicket.ticketId,
        subject: savedTicket.subject,
        priority: savedTicket.priority,
        category: savedTicket.category,
        status: savedTicket.status,
        createdAt: savedTicket.createdAt,
        updatedAt: savedTicket.updatedAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating support ticket:', error)
    
    // Handle specific database errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database validation failed',
          details: error.message
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create support ticket. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// GET - Fetch user's support tickets
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const category = searchParams.get('category')

    // Build query
    const query: any = {
      userId: session.user.id
    }

    if (status) query.status = status
    if (priority) query.priority = priority
    if (category) query.category = category

    // Connect to database
    await connectToDatabase()

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch tickets with pagination
    const [tickets, totalCount] = await Promise.all([
      SupportTicket.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-responses -__v')
        .lean(),
      SupportTicket.countDocuments(query)
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    // Return tickets with pagination info
    return NextResponse.json({
      success: true,
      tickets: tickets.map(ticket => ({
        id: ticket._id.toString(),
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        priority: ticket.priority,
        category: ticket.category,
        status: ticket.status,
        description: ticket.description,
        projectId: ticket.projectId,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      summary: {
        total: totalCount,
        open: await SupportTicket.countDocuments({ ...query, status: 'open' }),
        inProgress: await SupportTicket.countDocuments({ ...query, status: 'in_progress' }),
        resolved: await SupportTicket.countDocuments({ ...query, status: 'resolved' }),
        closed: await SupportTicket.countDocuments({ ...query, status: 'closed' })
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error fetching support tickets:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch support tickets. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// PUT - Update a support ticket (for responses)
export async function PUT(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { ticketId, message } = body

    if (!ticketId || !message) {
      return NextResponse.json(
        { success: false, error: 'Ticket ID and message are required' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Find and update the ticket
    const ticket = await SupportTicket.findOneAndUpdate(
      { 
        ticketId: ticketId, 
        userId: session.user.id 
      },
      {
        $push: {
          responses: {
            message: message,
            author: session.user.name || session.user.email,
            authorType: 'customer',
            timestamp: new Date()
          }
        },
        $set: {
          updatedAt: new Date()
        }
      },
      { new: true }
    )

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket._id.toString(),
        ticketId: ticket.ticketId,
        subject: ticket.subject,
        priority: ticket.priority,
        category: ticket.category,
        status: ticket.status,
        updatedAt: ticket.updatedAt,
        responses: ticket.responses
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error updating support ticket:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update support ticket. Please try again.' 
      },
      { status: 500 }
    )
  }
}