import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/src/lib/mongodb'
import MaterialOrder from '@/src/models/MaterialOrder'
import Material from '@/src/models/Material'
import Supplier from '@/src/models/Supplier'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const filter: any = {}
    
    if (session.user.role === 'customer') {
      filter.customerId = session.user.id
    }
    
    if (status) {
      filter.status = status
    }
    
    const skip = (page - 1) * limit
    
    const orders = await MaterialOrder
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await MaterialOrder.countDocuments(filter)
    
    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await dbConnect()
    
    const data = await request.json()
    
    const materials = await Material.find({
      _id: { $in: data.items.map((item: any) => item.materialId) }
    })
    
    if (materials.length !== data.items.length) {
      return NextResponse.json(
        { error: 'Some materials not found' },
        { status: 400 }
      )
    }
    
    const orderItems = []
    let subtotal = 0
    let totalTax = 0
    let totalShipping = 0
    
    for (const item of data.items) {
      const material = materials.find(m => m._id.toString() === item.materialId)
      if (!material) continue
      
      const availability = material.checkAvailability(item.quantity)
      if (!availability.available) {
        return NextResponse.json(
          { error: `${material.name}: ${availability.message}` },
          { status: 400 }
        )
      }
      
      const pricing = material.calculatePrice(item.quantity)
      
      const supplier = await Supplier.findById(material.supplier.id)
      const delivery = supplier.canDeliver(data.addresses.shipping.pincode)
      
      if (!delivery.canDeliver) {
        return NextResponse.json(
          { error: `${supplier.name} does not deliver to ${data.addresses.shipping.pincode}` },
          { status: 400 }
        )
      }
      
      if (delivery.minOrderValue && pricing.subtotal < delivery.minOrderValue) {
        return NextResponse.json(
          { error: `Minimum order value for ${supplier.name} is ₹${delivery.minOrderValue}` },
          { status: 400 }
        )
      }
      
      orderItems.push({
        materialId: material._id,
        material: {
          name: material.name,
          brand: material.brand,
          model: material.model,
          image: material.images.find((img: any) => img.isPrimary)?.url || material.images[0]?.url,
          unit: material.pricing.unit
        },
        supplierId: material.supplier.id,
        supplierName: material.supplier.name,
        quantity: item.quantity,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.subtotal,
        tax: pricing.tax,
        deliveryDate: new Date(Date.now() + (availability.leadTime || 2) * 24 * 60 * 60 * 1000),
        notes: item.notes
      })
      
      subtotal += pricing.subtotal
      totalTax += pricing.tax
      totalShipping += delivery.charge || 0
    }
    
    const total = subtotal + totalTax + totalShipping
    
    const order = await MaterialOrder.create({
      customerId: session.user.id,
      customerName: session.user.name || data.customerName,
      customerEmail: session.user.email || data.customerEmail,
      customerPhone: data.customerPhone,
      items: orderItems,
      pricing: {
        subtotal,
        tax: totalTax,
        shipping: totalShipping,
        discount: 0,
        total
      },
      payment: {
        method: data.payment.method,
        status: data.payment.method === 'cod' ? 'pending' : 'processing'
      },
      addresses: data.addresses,
      delivery: {
        type: data.delivery?.type || 'standard',
        estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      projectId: data.projectId,
      estimateId: data.estimateId,
      notes: data.notes
    })
    
    for (const item of orderItems) {
      const material = await Material.findById(item.materialId)
      if (material && material.availability.quantity > 0) {
        material.availability.quantity -= item.quantity
        await material.save()
      }
    }
    
    return NextResponse.json({ 
      order,
      message: 'Order placed successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}