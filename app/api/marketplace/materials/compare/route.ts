import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/src/lib/mongodb'
import Material from '@/src/models/Material'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { materialIds } = await request.json()
    
    if (!materialIds || materialIds.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 materials required for comparison' },
        { status: 400 }
      )
    }
    
    if (materialIds.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 materials can be compared' },
        { status: 400 }
      )
    }
    
    const materials = await (Material as any).find({
      _id: { $in: materialIds },
      isActive: true
    }).lean()
    
    if (materials.length < 2) {
      return NextResponse.json(
        { error: 'Some materials not found' },
        { status: 404 }
      )
    }
    
    const attributes = [
      { name: 'Price', field: 'pricing.basePrice', unit: 'INR', highlight: 'lowest' },
      { name: 'Rating', field: 'ratings.average', unit: 'stars', highlight: 'highest' },
      { name: 'Reviews', field: 'ratings.count', unit: 'reviews', highlight: 'highest' },
      { name: 'GST', field: 'pricing.gst', unit: '%' },
      { name: 'Min Order', field: 'availability.minOrder', unit: 'units', highlight: 'lowest' },
      { name: 'Lead Time', field: 'availability.leadTime', unit: 'days', highlight: 'lowest' }
    ]
    
    const comparison = {
      materials: materials.map(m => ({
        id: m._id,
        name: m.name,
        brand: m.brand,
        image: m.images.find((img: any) => img.isPrimary)?.url || m.images[0]?.url,
        supplier: m.supplier.name,
        verified: m.supplier.verified
      })),
      attributes: attributes.map(attr => {
        const values: any = {}
        materials.forEach((material: any) => {
          const value = attr.field.split('.').reduce((obj, key) => obj?.[key], material as any)
          values[material._id.toString()] = value || 0
        })
        
        let highlight = null
        if (attr.highlight) {
          const materialValues = Object.entries(values)
          if (attr.highlight === 'lowest') {
            const min = Math.min(...materialValues.map(([_, val]) => val as number))
            highlight = materialValues.find(([_, val]) => val === min)?.[0]
          } else if (attr.highlight === 'highest') {
            const max = Math.max(...materialValues.map(([_, val]) => val as number))
            highlight = materialValues.find(([_, val]) => val === max)?.[0]
          }
        }
        
        return {
          name: attr.name,
          values,
          unit: attr.unit,
          highlight
        }
      }),
      specifications: extractCommonSpecifications(materials)
    }
    
    return NextResponse.json({ comparison })
  } catch (error) {
    console.error('Error comparing materials:', error)
    return NextResponse.json(
      { error: 'Failed to compare materials' },
      { status: 500 }
    )
  }
}

function extractCommonSpecifications(materials: any[]) {
  const allSpecs = new Map()
  
  materials.forEach(material => {
    material.specifications?.forEach((spec: any) => {
      if (!allSpecs.has(spec.name)) {
        allSpecs.set(spec.name, { name: spec.name, values: {}, unit: spec.unit })
      }
      allSpecs.get(spec.name).values[material._id] = spec.value
    })
  })
  
  return Array.from(allSpecs.values()).filter(spec => 
    Object.keys(spec.values).length >= materials.length * 0.5
  )
}