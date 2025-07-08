import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, phone, timestamp } = body

    // In production, you would:
    // 1. Save to database
    // 2. Send to CRM
    // 3. Trigger immediate notification to sales team
    // 4. Start automated follow-up sequence

    console.log('Exit intent lead captured:', {
      email,
      phone,
      timestamp,
      priority: 'HIGH'
    })

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    })
  } catch (error) {
    console.error('Exit intent error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}