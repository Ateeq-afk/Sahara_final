import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'
import { LeadService } from '@/lib/services/lead-service'
import { EmailService } from '@/lib/email-service'
import { FormValidator } from '@/lib/form-validation'
import { rateLimit } from '@/lib/rate-limit'
import { loggers, logError, logAudit } from '@/lib/logger'

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
    logError(error, { context: 'Failed to fetch contacts' })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// POST create new contact
export async function POST(request: NextRequest) {
  // Apply rate limiting for forms
  const rateLimitResponse = await rateLimit(request, 'forms')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  const logger = loggers.api
  logger.info('Contact form submission started')
  
  try {
    await dbConnect()
    
    const body = await request.json()
    logger.debug({ body }, 'Request body received')
    
    
    // Sanitize and validate input
    const sanitizedData = FormValidator.sanitizeContactForm(body)
    logger.debug({ sanitizedData }, 'Data sanitized')
    
    const validation = FormValidator.validateContactForm(sanitizedData)
    logger.debug({ validation }, 'Validation completed')
    
    if (!validation.isValid) {
      logger.warn({ errors: validation.errors }, 'Validation failed')
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }
    
    // Create new contact
    logger.debug('Creating contact in database...')
    const contact = await Contact.create(sanitizedData)
    logger.info({ contactId: contact._id }, 'Contact created successfully')
    
    // Create lead from contact
    logger.debug('Creating lead from contact...')
    await LeadService.createLeadFromContact(sanitizedData)
    logger.info('Lead created successfully')
    
    // Send email notifications
    const emailData = {
      name: sanitizedData.name,
      email: sanitizedData.email || `${sanitizedData.name.toLowerCase().replace(/\s+/g, '')}@noemail.provided`,
      phone: sanitizedData.phone,
      subject: sanitizedData.subject || 'General Inquiry',
      message: sanitizedData.message,
      source: body.source || 'contact-form'
    }
    
    logger.debug({
      emailConfig: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        notificationEmails: process.env.NOTIFICATION_EMAILS || 'Not configured',
      },
      emailData
    }, 'Email configuration')
    
    logger.debug('Sending email notifications...')
    const { notificationSent, confirmationSent } = await EmailService.sendContactEmails(emailData)
    
    logger.info({
      notificationSent,
      confirmationSent
    }, 'Email sending completed')
    
    if (!notificationSent) {
      logger.warn('Failed to send contact form notification email')
    }
    
    if (!confirmationSent) {
      logger.warn('Failed to send contact confirmation email')
    }
    
    logger.info({ contactId: contact._id }, 'Contact form submission completed successfully')
    
    // Log audit event
    logAudit('contact_form_submitted', contact.email || 'anonymous', {
      contactId: contact._id,
      source: body.source || 'contact-form'
    })
    
    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    }, { status: 201 })
  } catch (error: any) {
    logError(error, {
      context: 'Contact form submission failed',
      body: body
    })
    
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