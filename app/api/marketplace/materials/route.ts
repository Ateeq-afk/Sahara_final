import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/src/lib/mongodb'
import Material from '@/src/models/Material'
import type { MaterialSearchParams } from '@/src/types/marketplace'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rating = searchParams.get('rating')
    const availability = searchParams.get('availability')
    const supplier = searchParams.get('supplier')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const filter: any = { isActive: true }
    
    if (query) {
      filter.$text = { $search: query }
    }
    
    if (category) {
      filter['category.id'] = category
    }
    
    if (subcategory) {
      filter.subcategory = subcategory
    }
    
    if (brand) {
      filter.brand = { $in: brand.split(',') }
    }
    
    if (minPrice || maxPrice) {
      filter['pricing.basePrice'] = {}
      if (minPrice) filter['pricing.basePrice'].$gte = parseFloat(minPrice)
      if (maxPrice) filter['pricing.basePrice'].$lte = parseFloat(maxPrice)
    }
    
    if (rating) {
      filter['ratings.average'] = { $gte: parseFloat(rating) }
    }
    
    if (availability === 'true') {
      filter['availability.inStock'] = true
    }
    
    if (supplier) {
      filter['supplier.id'] = supplier
    }
    
    const sortOptions: any = {}
    sortOptions[sort] = order === 'asc' ? 1 : -1
    
    const skip = (page - 1) * limit
    
    const materials = await Material
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await Material.countDocuments(filter)
    
    return NextResponse.json({
      materials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching materials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const data = await request.json()
    
    const material = await Material.create(data)
    
    return NextResponse.json({ material }, { status: 201 })
  } catch (error) {
    console.error('Error creating material:', error)
    return NextResponse.json(
      { error: 'Failed to create material' },
      { status: 500 }
    )
  }
}