import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'
import mongoose from 'mongoose'
import { leadUpdateSchema } from '@/lib/validations/lead'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid lead ID' },
        { status: 400 }
      )
    }
    
    const lead = await Lead.findById(id).lean()
    
    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      lead
    })
    
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch lead' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const { id } = params
    const body = await request.json()
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid lead ID' },
        { status: 400 }
      )
    }
    
    // Validate input with zod
    const validationResult = leadUpdateSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }
    
    const validatedData = validationResult.data
    
    const lead = await Lead.findByIdAndUpdate(
      id,
      { ...validatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean()
    
    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully',
      lead
    })
    
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const { id } = params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid lead ID' },
        { status: 400 }
      )
    }
    
    const lead = await Lead.findByIdAndDelete(id)
    
    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}