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
  console.log('=== Contact Form Submission Started ===')
  console.log('Timestamp:', new Date().toISOString())
  
  try {
    await dbConnect()
    
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    console.log('Client IP:', clientIP)
    
    // Check rate limit
    if (!FormValidator.checkRateLimit(clientIP)) {
      console.log('Rate limit exceeded for IP:', clientIP)
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }
    console.log('Rate limit check passed')
    
    // Sanitize and validate input
    const sanitizedData = FormValidator.sanitizeContactForm(body)
    console.log('Sanitized data:', JSON.stringify(sanitizedData, null, 2))
    
    const validation = FormValidator.validateContactForm(sanitizedData)
    console.log('Validation result:', validation)
    
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors)
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }
    console.log('Validation passed')
    
    // Create new contact
    console.log('Creating contact in database...')
    const contact = await Contact.create(sanitizedData)
    console.log('Contact created with ID:', contact._id)
    
    // Create lead from contact
    console.log('Creating lead from contact...')
    await LeadService.createLeadFromContact(sanitizedData)
    console.log('Lead created successfully')
    
    // Send email notifications
    const emailData = {
      name: sanitizedData.name,
      email: sanitizedData.email || `${sanitizedData.name.toLowerCase().replace(/\s+/g, '')}@noemail.provided`,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject || 'General Inquiry',
      message: sanitizedData.message,
      source: body.source || 'contact-form'
    }
    
    console.log('=== Email Configuration ===')
    console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0)
    console.log('RESEND_API_KEY starts with:', process.env.RESEND_API_KEY?.substring(0, 3) || 'N/A')
    console.log('Notification emails:', process.env.NOTIFICATION_EMAILS || 'Not configured')
    console.log('Email data:', JSON.stringify(emailData, null, 2))
    
    console.log('\n=== Required .env.local Configuration ===')
    console.log('Please ensure your .env.local file contains:')
    console.log('RESEND_API_KEY=re_xxxxxxxxxx  # Get from https://resend.com/api-keys')
    console.log('NOTIFICATION_EMAILS=your-email@example.com  # Where to receive notifications')
    console.log('ADMIN_EMAIL=admin@example.com  # Optional admin email')
    
    console.log('Sending email notifications...')
    const { notificationSent, confirmationSent } = await EmailService.sendContactEmails(emailData)
    
    console.log('Email results:')
    console.log('- Notification sent:', notificationSent)
    console.log('- Confirmation sent:', confirmationSent)
    
    if (!notificationSent) {
      console.warn('⚠️ Failed to send contact form notification email')
    }
    
    if (!confirmationSent) {
      console.warn('⚠️ Failed to send contact confirmation email')
    }
    
    console.log('=== Contact Form Submission Completed ===')
    console.log('Success: Contact created and emails sent')
    
    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    }, { status: 201 })
  } catch (error: any) {
    console.error('=== Contact Form Submission Failed ===')
    console.error('Error type:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
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