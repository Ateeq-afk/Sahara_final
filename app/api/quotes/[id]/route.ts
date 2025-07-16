import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Quote from '@/models/Quote'

// GET single quote
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const quote = await Quote.findById(params.id).lean()
    
    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    // Allow customers to only see their own quotes
    if (session.user.role === 'customer' && quote.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: You can only view your own quotes' },
        { status: 403 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: quote
    })
  } catch (error) {
    console.error('Error fetching quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quote' },
      { status: 500 }
    )
  }
}

// PATCH update quote
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }
    
    await dbConnect()
    
    const body = await request.json()
    
    const quote = await Quote.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: quote
    })
  } catch (error: any) {
    console.error('Error updating quote:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update quote' },
      { status: 500 }
    )
  }
}

// DELETE quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }
    
    await dbConnect()
    
    const quote = await Quote.findByIdAndDelete(params.id)
    
    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Quote deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete quote' },
      { status: 500 }
    )
  }
}