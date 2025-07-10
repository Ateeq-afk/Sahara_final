import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Quote from '@/models/Quote'

// POST create new quote from the quote form
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Transform the form data to match our Quote model
    const quoteData = {
      name: body.name || body.fullName,
      email: body.email, 
      phone: body.phone,
      projectType: body.serviceType || body.projectType || 'construction',
      propertyType: body.projectType || body.propertyType || 'other',
      area: body.propertySize ? 
        (body.propertySize.includes('under') || body.propertySize.includes('<') ? 800 :
         body.propertySize.includes('1000-2000') || body.propertySize.includes('1000') ? 1500 :
         body.propertySize.includes('2000-3000') || body.propertySize.includes('2000') ? 2500 :
         body.propertySize.includes('above') || body.propertySize.includes('>') ? 3500 : 
         parseInt(body.propertySize) || 1500)
        : 1500,
      location: body.location || body.propertyLocation || 'Bangalore',
      budget: {
        min: body.budget ? 
          (body.budget.includes('10-20') || body.budget.includes('10') ? 1000000 :
           body.budget.includes('20-50') || body.budget.includes('20') ? 2000000 :
           body.budget.includes('50-100') || body.budget.includes('50') ? 5000000 :
           body.budget.includes('100+') || body.budget.includes('100') ? 10000000 : 
           parseInt(body.budget) * 100000 || 1000000)
          : parseInt(body.estimatedBudget) || 1000000,
        max: body.budget ?
          (body.budget.includes('10-20') ? 2000000 :
           body.budget.includes('20-50') ? 5000000 :
           body.budget.includes('50-100') ? 10000000 :
           body.budget.includes('100+') ? 50000000 : 
           parseInt(body.budget) * 150000 || 5000000)
          : parseInt(body.estimatedBudget) * 1.5 || 5000000
      },
      expectedStartDate: body.timeline === 'immediate' || body.timeline === 'asap'
        ? new Date() 
        : body.timeline === '3-months' || body.timeline === '1-3months'
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      urgency: body.timeline === 'immediate' || body.timeline === 'asap' ? 'immediate' :
               body.timeline === '3-months' || body.timeline === '1-3months' ? '1-3months' : 
               '3-6months',
      requirements: `${body.message || body.specialRequirements || body.additionalComments || ''}\n\nDesign Styles: ${(body.designStyle || []).join(', ')}\nKey Features: ${(body.keyFeatures || []).join(', ')}`,
      referralSource: body.hearAboutUs || 'website-quote-form'
    }
    
    // Create new quote
    const quote = await Quote.create(quoteData)
    
    // Calculate estimated cost
    const estimatedCost = quote.getEstimatedCost()
    
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer
    
    return NextResponse.json({
      success: true,
      data: {
        id: quote._id,
        quoteId: quote._id,
        estimatedCost,
        estimatedQuote: {
          basePrice: estimatedCost,
          priceRange: {
            min: estimatedCost * 0.9,
            max: estimatedCost * 1.2,
          },
          currency: 'INR',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      },
      message: 'Quote request submitted successfully! We will contact you within 2-4 hours.',
      expectedResponseTime: '2-4 hours'
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