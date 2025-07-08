import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

// POST subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { email, name, source = 'website' } = body
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email })
    
    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Resubscribe
        existing.status = 'active'
        existing.unsubscribedAt = undefined
        existing.name = name || existing.name
        await existing.save()
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been resubscribed to our newsletter.',
          data: existing
        })
      }
      
      return NextResponse.json({
        success: false,
        error: 'This email is already subscribed to our newsletter.'
      }, { status: 400 })
    }
    
    // Create new subscription
    const subscription = await Newsletter.create({
      email,
      name,
      source
    })
    
    // TODO: Send welcome email
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: subscription
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

// GET all subscriptions (admin only)
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'active'
    
    const subscriptions = await Newsletter.find({ status })
      .sort({ createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: subscriptions,
      total: subscriptions.length
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}