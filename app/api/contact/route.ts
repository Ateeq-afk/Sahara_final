import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'
import { LeadService } from '@/lib/services/lead-service'
import { EmailService } from '@/lib/email-service'
import { FormValidator } from '@/lib/form-validation'

// GET all contacts
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
    
    const skip = (page - 1) * limit
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    
    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(query)
    ])
    
    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// POST create new contact
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    // Check rate limit
    if (!FormValidator.checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Sanitize and validate input
    const sanitizedData = FormValidator.sanitizeContactForm(body)
    const validation = FormValidator.validateContactForm(sanitizedData)
    
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }
    
    // Create new contact
    const contact = await Contact.create(sanitizedData)
    
    // Create lead from contact
    await LeadService.createLeadFromContact(sanitizedData)
    
    // Send email notifications
    const emailData = {
      name: sanitizedData.name,
      email: sanitizedData.email || `${sanitizedData.name.toLowerCase().replace(/\s+/g, '')}@noemail.provided`,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject || 'General Inquiry',
      message: sanitizedData.message,
      source: body.source || 'contact-form'
    }
    
    const { notificationSent, confirmationSent } = await EmailService.sendContactEmails(emailData)
    
    if (!notificationSent) {
      console.warn('Failed to send contact form notification email')
    }
    
    if (!confirmationSent) {
      console.warn('Failed to send contact confirmation email')
    }
    
    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating contact:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}