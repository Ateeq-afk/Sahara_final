import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/construction'

// Import models dynamically to ensure they're loaded correctly
const MaterialModule = await import('../src/models/Material.ts')
const SupplierModule = await import('../src/models/Supplier.ts')

const Material = MaterialModule.default
const Supplier = SupplierModule.default

const suppliers = [
  {
    name: 'BuildMart Supplies',
    email: 'contact@buildmart.com',
    phone: '+91 9876543210',
    description: 'Leading supplier of construction materials with 20+ years of experience',
    verified: true,
    rating: 4.5,
    totalReviews: 234,
    contact: {
      email: 'contact@buildmart.com',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      address: {
        street: '123 Industrial Area',
        area: 'Whitefield',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560066',
        country: 'India'
      },
      website: 'https://buildmart.com'
    },
    categories: ['cement', 'steel', 'bricks', 'sand'],
    certifications: [
      {
        name: 'ISO 9001:2015',
        issuedBy: 'ISO',
        validFrom: new Date('2023-01-01'),
        validTo: new Date('2025-12-31')
      }
    ],
    establishedYear: 2003,
    deliveryAreas: [
      { area: 'Whitefield', pincode: '560066', deliveryCharge: 0, minOrderValue: 5000, estimatedDays: 1 },
      { area: 'Marathahalli', pincode: '560037', deliveryCharge: 500, minOrderValue: 5000, estimatedDays: 2 },
      { area: 'Koramangala', pincode: '560034', deliveryCharge: 750, minOrderValue: 7500, estimatedDays: 2 }
    ],
    paymentTerms: ['cash', 'online', 'credit'],
    status: 'active'
  },
  {
    name: 'Premium Construction Hub',
    email: 'info@premiumhub.com',
    phone: '+91 9876543211',
    description: 'Premium quality construction materials for luxury projects',
    verified: true,
    rating: 4.8,
    totalReviews: 156,
    contact: {
      email: 'info@premiumhub.com',
      phone: '+91 9876543211',
      address: {
        street: '456 Elite Plaza',
        area: 'Indiranagar',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India'
      }
    },
    categories: ['tiles', 'paint', 'electrical', 'plumbing'],
    establishedYear: 2010,
    deliveryAreas: [
      { area: 'Indiranagar', pincode: '560038', deliveryCharge: 0, minOrderValue: 10000, estimatedDays: 1 },
      { area: 'HSR Layout', pincode: '560102', deliveryCharge: 500, minOrderValue: 10000, estimatedDays: 1 }
    ],
    paymentTerms: ['online', 'cheque'],
    status: 'active'
  }
]

const materials = [
  // Cement & Concrete
  {
    name: 'UltraTech Cement PPC 50kg',
    description: 'Premium Portland Pozzolana Cement for all construction needs. High strength and durability.',
    category: { id: 'cement', name: 'Cement & Concrete' },
    subcategory: 'PPC Cement',
    brand: 'UltraTech',
    model: 'PPC 43 Grade',
    specifications: [
      { name: 'Grade', value: '43', unit: '' },
      { name: 'Weight', value: '50', unit: 'kg' },
      { name: 'Compressive Strength', value: '43', unit: 'MPa' },
      { name: 'Setting Time', value: '30', unit: 'minutes' },
      { name: 'Fineness', value: '300', unit: 'm²/kg' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1590241899810-fbaa593e0267?w=800',
        alt: 'UltraTech Cement Bag',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 380,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 50, maxQuantity: 99, pricePerUnit: 370 },
        { minQuantity: 100, maxQuantity: 499, pricePerUnit: 360 },
        { minQuantity: 500, pricePerUnit: 350 }
      ],
      gst: 28
    },
    availability: {
      inStock: true,
      quantity: 5000,
      leadTime: 1,
      minOrder: 10,
      maxOrder: 1000,
      warehouse: ['Whitefield', 'Marathahalli']
    },
    ratings: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 15, 2: 5, 1: 4 }
    },
    tags: ['cement', 'ppc', 'construction', 'ultratech'],
    certifications: ['ISI', 'BIS']
  },
  {
    name: 'ACC Gold Water Shield Cement 50kg',
    description: 'Water resistant cement ideal for areas prone to dampness. Superior quality with enhanced durability.',
    category: { id: 'cement', name: 'Cement & Concrete' },
    subcategory: 'Water Resistant Cement',
    brand: 'ACC',
    specifications: [
      { name: 'Grade', value: '43', unit: '' },
      { name: 'Weight', value: '50', unit: 'kg' },
      { name: 'Water Resistance', value: 'High', unit: '' },
      { name: 'Setting Time', value: '45', unit: 'minutes' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800',
        alt: 'ACC Gold Cement',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 420,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 50, maxQuantity: 99, pricePerUnit: 410 },
        { minQuantity: 100, pricePerUnit: 400 }
      ],
      gst: 28
    },
    availability: {
      inStock: true,
      quantity: 3000,
      leadTime: 1,
      minOrder: 10,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.3,
      count: 189,
      distribution: { 5: 100, 4: 60, 3: 20, 2: 5, 1: 4 }
    },
    tags: ['cement', 'water-resistant', 'acc'],
    certifications: ['ISI', 'BIS']
  },
  
  // Steel & Iron
  {
    name: 'TMT Steel Bars Fe 500 - 12mm',
    description: 'High strength TMT bars suitable for RCC construction. Corrosion resistant with superior bonding.',
    category: { id: 'steel', name: 'Steel & Iron' },
    subcategory: 'TMT Bars',
    brand: 'TATA Steel',
    specifications: [
      { name: 'Diameter', value: '12', unit: 'mm' },
      { name: 'Grade', value: 'Fe 500', unit: '' },
      { name: 'Length', value: '12', unit: 'meters' },
      { name: 'Yield Strength', value: '500', unit: 'N/mm²' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1564520599123-3272b9ecfe23?w=800',
        alt: 'TMT Steel Bars',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 68,
      unit: 'kg',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 1000, maxQuantity: 4999, pricePerUnit: 66 },
        { minQuantity: 5000, pricePerUnit: 64 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 50000,
      leadTime: 2,
      minOrder: 100,
      warehouse: ['Whitefield', 'Marathahalli']
    },
    ratings: {
      average: 4.6,
      count: 312,
      distribution: { 5: 200, 4: 80, 3: 20, 2: 8, 1: 4 }
    },
    tags: ['steel', 'tmt', 'construction', 'rcc'],
    certifications: ['ISI', 'BIS']
  },
  
  // More materials...
  {
    name: 'Vitrified Floor Tiles 600x600mm - Pearl White',
    description: 'Premium vitrified tiles with nano polish finish. Stain resistant and easy to maintain.',
    category: { id: 'tiles', name: 'Tiles & Flooring' },
    subcategory: 'Vitrified Tiles',
    brand: 'Kajaria',
    specifications: [
      { name: 'Size', value: '600x600', unit: 'mm' },
      { name: 'Thickness', value: '10', unit: 'mm' },
      { name: 'Finish', value: 'Glossy', unit: '' },
      { name: 'Water Absorption', value: '<0.5', unit: '%' },
      { name: 'PEI Rating', value: '4', unit: '' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800',
        alt: 'Pearl White Vitrified Tiles',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 85,
      unit: 'sqft',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 500, maxQuantity: 999, pricePerUnit: 82 },
        { minQuantity: 1000, pricePerUnit: 78 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 15000,
      leadTime: 3,
      minOrder: 50,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.6,
      count: 423,
      distribution: { 5: 280, 4: 100, 3: 30, 2: 8, 1: 5 }
    },
    tags: ['tiles', 'vitrified', 'flooring', 'kajaria'],
    certifications: ['ISI', 'CE']
  }
]

async function seedMaterials() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Clear existing data
    await Material.deleteMany({})
    await Supplier.deleteMany({})
    console.log('Cleared existing data')
    
    // Create suppliers
    const createdSuppliers = await Supplier.create(suppliers)
    console.log(`Created ${createdSuppliers.length} suppliers`)
    
    // Assign suppliers to materials
    const materialsWithSuppliers = materials.map((material, index) => {
      const supplier = createdSuppliers[index % createdSuppliers.length]
      return {
        ...material,
        supplier: {
          id: supplier._id,
          ...supplier.toObject()
        }
      }
    })
    
    // Create materials
    const createdMaterials = await Material.create(materialsWithSuppliers)
    console.log(`Created ${createdMaterials.length} materials`)
    
    console.log('Seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding materials:', error)
    process.exit(1)
  }
}

seedMaterials()