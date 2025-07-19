import { NextResponse } from 'next/server'
import { LeadService } from '@/lib/services/lead-service'
import dbConnect from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { email, name, phone, guide, timestamp } = body

    // Create lead in database
    await LeadService.createLeadFromLeadMagnet({
      email,
      name,
      phone,
      guide,
      resource: guide,
    })

    console.log('New lead magnet download:', {
      email,
      name,
      phone,
      guide,
      timestamp
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    })
  } catch (error) {
    console.error('Lead magnet error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}