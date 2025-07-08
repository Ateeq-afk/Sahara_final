import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

// POST unsubscribe from newsletter
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const subscription = await Newsletter.findOne({ email })
    
    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Email not found in our newsletter list' },
        { status: 404 }
      )
    }
    
    if (subscription.status === 'unsubscribed') {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter'
      })
    }
    
    // Unsubscribe
    await subscription.unsubscribe()
    
    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter'
    })
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
}