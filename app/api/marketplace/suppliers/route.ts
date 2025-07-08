import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/src/lib/mongodb'
import Supplier from '@/src/models/Supplier'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const city = searchParams.get('city')
    const verified = searchParams.get('verified')
    const rating = searchParams.get('rating')
    const sort = searchParams.get('sort') || 'rating'
    const order = searchParams.get('order') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const filter: any = { status: 'active' }
    
    if (category) {
      filter.categories = category
    }
    
    if (city) {
      filter['contact.address.city'] = city
    }
    
    if (verified === 'true') {
      filter.verified = true
    }
    
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) }
    }
    
    const sortOptions: any = {}
    sortOptions[sort] = order === 'asc' ? 1 : -1
    
    const skip = (page - 1) * limit
    
    const suppliers = await Supplier
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-bankDetails -businessDetails.panNumber')
      .lean()
    
    const total = await Supplier.countDocuments(filter)
    
    return NextResponse.json({
      suppliers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const data = await request.json()
    
    const existingSupplier = await Supplier.findOne({
      'contact.email': data.contact.email
    })
    
    if (existingSupplier) {
      return NextResponse.json(
        { error: 'Supplier with this email already exists' },
        { status: 400 }
      )
    }
    
    const supplier = await Supplier.create(data)
    
    return NextResponse.json({ 
      supplier: {
        id: supplier._id,
        name: supplier.name,
        email: supplier.contact.email,
        status: supplier.status
      },
      message: 'Supplier registration successful. Pending verification.'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating supplier:', error)
    return NextResponse.json(
      { error: 'Failed to register supplier' },
      { status: 500 }
    )
  }
}