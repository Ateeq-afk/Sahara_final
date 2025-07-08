import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Quote from '@/models/Quote'
// import { sendEmail, createQuoteNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, phone, serviceType, source, timestamp } = body

    // Create quote in database
    const quote = await Quote.create({
      name,
      email: `${phone}@phone.sahara`, // Placeholder email since we only collect phone
      phone,
      serviceType,
      projectType: serviceType, // Using serviceType as projectType
      propertySize: 'TBD',
      budget: 'TBD',
      timeline: 'immediately',
      message: `Lead from Google Ads landing page. Service: ${serviceType}`,
      source,
      status: 'new',
      priority: 'high', // Google Ads leads are high priority
      metadata: {
        landingPage: true,
        timestamp,
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'landing-page'
      }
    })

    // Send notification email
    // TODO: Implement email notifications
    console.log('Quote received from landing page:', { name, phone, serviceType })

    // Send SMS notification if configured
    // TODO: Implement SMS notification

    return NextResponse.json({
      success: true,
      message: 'Quote request received successfully',
      quoteId: quote._id
    })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit quote' },
      { status: 500 }
    )
  }
}