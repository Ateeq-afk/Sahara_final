import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/construction'

// Import all models
const UserModule = await import('../src/models/User.ts')
const MaterialModule = await import('../src/models/Material.ts')
const SupplierModule = await import('../src/models/Supplier.ts')
const MaterialOrderModule = await import('../src/models/MaterialOrder.ts')
const EstimateModule = await import('../src/models/Estimate.ts')
const LeadModule = await import('../src/models/Lead.ts')
const BlogPostModule = await import('../src/models/BlogPost.ts')

const User = UserModule.default
const Material = MaterialModule.default
const Supplier = SupplierModule.default
const MaterialOrder = MaterialOrderModule.default
const Estimate = EstimateModule.default
const Lead = LeadModule.default
const BlogPost = BlogPostModule.default

// Users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@sahara.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    isVerified: true,
    createdAt: new Date('2023-01-01')
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    password: await bcrypt.hash('customer123', 10),
    role: 'customer',
    isVerified: true,
    phone: '+91 9876543210',
    createdAt: new Date('2023-06-15')
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: await bcrypt.hash('customer123', 10),
    role: 'customer',
    isVerified: true,
    phone: '+91 9876543211',
    createdAt: new Date('2023-07-20')
  },
  {
    name: 'Arun Patel',
    email: 'arun.patel@example.com',
    password: await bcrypt.hash('customer123', 10),
    role: 'customer',
    isVerified: true,
    phone: '+91 9876543212',
    createdAt: new Date('2023-08-10')
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    password: await bcrypt.hash('customer123', 10),
    role: 'customer',
    isVerified: true,
    phone: '+91 9876543213',
    createdAt: new Date('2023-09-05')
  }
]

// Suppliers data
const suppliers = [
  {
    name: 'BuildMart Supplies',
    email: 'contact@buildmart.com',
    phone: '+91 9876543210',
    description: 'Leading supplier of construction materials with 20+ years of experience',
    verified: true,
    verificationDate: new Date('2023-01-15'),
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
        country: 'India',
        coordinates: { latitude: 12.9698, longitude: 77.7500 }
      },
      website: 'https://buildmart.com'
    },
    categories: ['cement', 'steel', 'bricks', 'sand'],
    certifications: [
      {
        name: 'ISO 9001:2015',
        issuedBy: 'ISO',
        validFrom: new Date('2023-01-01'),
        validTo: new Date('2025-12-31'),
        documentUrl: 'https://example.com/cert1.pdf'
      }
    ],
    establishedYear: 2003,
    deliveryAreas: [
      { area: 'Whitefield', pincode: '560066', deliveryCharge: 0, minOrderValue: 5000, estimatedDays: 1 },
      { area: 'Marathahalli', pincode: '560037', deliveryCharge: 500, minOrderValue: 5000, estimatedDays: 2 },
      { area: 'Koramangala', pincode: '560034', deliveryCharge: 750, minOrderValue: 7500, estimatedDays: 2 },
      { area: 'Indiranagar', pincode: '560038', deliveryCharge: 1000, minOrderValue: 10000, estimatedDays: 3 }
    ],
    paymentTerms: ['cash', 'online', 'credit', 'cheque'],
    bankDetails: {
      accountName: 'BuildMart Supplies Pvt Ltd',
      accountNumber: '1234567890',
      bankName: 'HDFC Bank',
      branchName: 'Whitefield Branch',
      ifscCode: 'HDFC0001234',
      upiId: 'buildmart@hdfc'
    },
    businessDetails: {
      gstNumber: '29ABCDE1234F1Z5',
      panNumber: 'ABCDE1234F',
      licenseNumber: 'TRADE/2023/12345',
      registrationType: 'pvtltd'
    },
    performance: {
      totalOrders: 1250,
      completedOrders: 1180,
      cancelledOrders: 70,
      totalRevenue: 85000000,
      averageDeliveryTime: 2.5,
      onTimeDeliveryRate: 92
    },
    preferences: {
      minOrderValue: 5000,
      maxOrderValue: 5000000,
      workingHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '09:00', close: '14:00' },
        sunday: { open: '', close: '' }
      },
      leadTime: 2,
      bulkDiscounts: [
        { minQuantity: 100, discountPercentage: 5 },
        { minQuantity: 500, discountPercentage: 10 },
        { minQuantity: 1000, discountPercentage: 15 }
      ]
    },
    status: 'active'
  },
  {
    name: 'Premium Construction Hub',
    email: 'info@premiumhub.com',
    phone: '+91 9876543211',
    description: 'Premium quality construction materials for luxury projects',
    verified: true,
    verificationDate: new Date('2023-02-20'),
    rating: 4.8,
    totalReviews: 156,
    contact: {
      email: 'info@premiumhub.com',
      phone: '+91 9876543211',
      whatsapp: '+91 9876543211',
      address: {
        street: '456 Elite Plaza',
        area: 'Indiranagar',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India',
        coordinates: { latitude: 12.9784, longitude: 77.6408 }
      },
      website: 'https://premiumhub.com'
    },
    categories: ['tiles', 'paint', 'electrical', 'plumbing', 'sanitaryware'],
    certifications: [
      {
        name: 'ISO 9001:2015',
        issuedBy: 'ISO',
        validFrom: new Date('2023-01-01'),
        validTo: new Date('2025-12-31')
      },
      {
        name: 'Green Building Certified',
        issuedBy: 'IGBC',
        validFrom: new Date('2023-03-01'),
        validTo: new Date('2024-02-29')
      }
    ],
    establishedYear: 2010,
    deliveryAreas: [
      { area: 'Indiranagar', pincode: '560038', deliveryCharge: 0, minOrderValue: 10000, estimatedDays: 1 },
      { area: 'HSR Layout', pincode: '560102', deliveryCharge: 500, minOrderValue: 10000, estimatedDays: 1 },
      { area: 'Koramangala', pincode: '560034', deliveryCharge: 500, minOrderValue: 10000, estimatedDays: 2 }
    ],
    paymentTerms: ['online', 'cheque', 'credit'],
    businessDetails: {
      gstNumber: '29XYZAB5678C1D2',
      panNumber: 'XYZAB5678C',
      licenseNumber: 'TRADE/2023/67890',
      registrationType: 'pvtltd'
    },
    performance: {
      totalOrders: 890,
      completedOrders: 860,
      cancelledOrders: 30,
      totalRevenue: 125000000,
      averageDeliveryTime: 1.8,
      onTimeDeliveryRate: 95
    },
    status: 'active'
  },
  {
    name: 'EcoGreen Building Solutions',
    email: 'sales@ecogreen.com',
    phone: '+91 9876543214',
    description: 'Sustainable and eco-friendly construction materials',
    verified: true,
    rating: 4.6,
    totalReviews: 98,
    contact: {
      email: 'sales@ecogreen.com',
      phone: '+91 9876543214',
      address: {
        street: '789 Green Valley',
        area: 'HSR Layout',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560102',
        country: 'India'
      }
    },
    categories: ['cement', 'bricks', 'insulation', 'waterproofing'],
    establishedYear: 2015,
    deliveryAreas: [
      { area: 'HSR Layout', pincode: '560102', deliveryCharge: 0, minOrderValue: 8000, estimatedDays: 1 },
      { area: 'BTM Layout', pincode: '560076', deliveryCharge: 400, minOrderValue: 8000, estimatedDays: 2 }
    ],
    paymentTerms: ['online', 'cash'],
    status: 'active'
  }
]

// Comprehensive materials data
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
    reviews: [
      {
        userId: 'user1',
        userName: 'Rajesh Kumar',
        rating: 5,
        title: 'Excellent Quality',
        comment: 'Used for my home construction. Very good quality and strength.',
        verified: true,
        helpful: 45,
        createdAt: new Date('2023-10-15')
      },
      {
        userId: 'user2',
        userName: 'Priya S',
        rating: 4,
        title: 'Good product',
        comment: 'Good quality cement but delivery was delayed by a day.',
        verified: true,
        helpful: 23,
        createdAt: new Date('2023-11-20')
      }
    ],
    tags: ['cement', 'ppc', 'construction', 'ultratech', '43-grade'],
    certifications: ['ISI', 'BIS', 'ISO 9001:2015']
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
    tags: ['cement', 'water-resistant', 'acc', 'gold-shield'],
    certifications: ['ISI', 'BIS']
  },
  {
    name: 'Ambuja Plus Cement 50kg',
    description: 'High performance cement with superior strength and faster setting time.',
    category: { id: 'cement', name: 'Cement & Concrete' },
    subcategory: 'OPC Cement',
    brand: 'Ambuja',
    model: 'Plus',
    specifications: [
      { name: 'Grade', value: '53', unit: '' },
      { name: 'Weight', value: '50', unit: 'kg' },
      { name: 'Compressive Strength', value: '53', unit: 'MPa' },
      { name: 'Setting Time', value: '25', unit: 'minutes' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
        alt: 'Ambuja Plus Cement',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 400,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 50, pricePerUnit: 390 }
      ],
      gst: 28
    },
    availability: {
      inStock: true,
      quantity: 4000,
      leadTime: 1,
      minOrder: 10,
      warehouse: ['Marathahalli', 'Whitefield']
    },
    ratings: {
      average: 4.4,
      count: 156,
      distribution: { 5: 90, 4: 45, 3: 15, 2: 4, 1: 2 }
    },
    tags: ['cement', 'opc', 'ambuja', '53-grade'],
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
      { name: 'Yield Strength', value: '500', unit: 'N/mm²' },
      { name: 'Ultimate Tensile Strength', value: '545', unit: 'N/mm²' }
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
    tags: ['steel', 'tmt', 'construction', 'rcc', 'tata'],
    certifications: ['ISI', 'BIS', 'ISO 9001:2015']
  },
  {
    name: 'JSW TMT Steel Bars Fe 500D - 16mm',
    description: 'Earthquake resistant TMT bars with high ductility. Ideal for seismic zones.',
    category: { id: 'steel', name: 'Steel & Iron' },
    subcategory: 'TMT Bars',
    brand: 'JSW Steel',
    specifications: [
      { name: 'Diameter', value: '16', unit: 'mm' },
      { name: 'Grade', value: 'Fe 500D', unit: '' },
      { name: 'Length', value: '12', unit: 'meters' },
      { name: 'Yield Strength', value: '500', unit: 'N/mm²' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
        alt: 'JSW TMT Steel',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 70,
      unit: 'kg',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 1000, pricePerUnit: 68 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 30000,
      leadTime: 2,
      minOrder: 100,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 15, 2: 5, 1: 4 }
    },
    tags: ['steel', 'tmt', 'earthquake-resistant', 'jsw'],
    certifications: ['ISI', 'BIS']
  },
  {
    name: 'MS Angle 50x50x6mm',
    description: 'Mild steel angles for structural framework and supports. Premium quality with uniform dimensions.',
    category: { id: 'steel', name: 'Steel & Iron' },
    subcategory: 'MS Angles',
    brand: 'JSW Steel',
    specifications: [
      { name: 'Size', value: '50x50', unit: 'mm' },
      { name: 'Thickness', value: '6', unit: 'mm' },
      { name: 'Length', value: '6', unit: 'meters' },
      { name: 'Weight', value: '4.5', unit: 'kg/m' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
        alt: 'MS Angles',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 75,
      unit: 'kg',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 500, maxQuantity: 999, pricePerUnit: 73 },
        { minQuantity: 1000, pricePerUnit: 71 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 20000,
      leadTime: 2,
      minOrder: 50,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.4,
      count: 145,
      distribution: { 5: 80, 4: 45, 3: 15, 2: 3, 1: 2 }
    },
    tags: ['steel', 'angles', 'structural', 'jsw'],
    certifications: ['ISI']
  },
  
  // Bricks & Blocks
  {
    name: 'Red Clay Bricks - Standard Size',
    description: 'Traditional red clay bricks manufactured with high-quality clay. Excellent strength and durability.',
    category: { id: 'bricks', name: 'Bricks & Blocks' },
    subcategory: 'Clay Bricks',
    brand: 'Local Manufacturer',
    specifications: [
      { name: 'Size', value: '230x110x75', unit: 'mm' },
      { name: 'Compressive Strength', value: '7.5', unit: 'N/mm²' },
      { name: 'Water Absorption', value: '15', unit: '%' },
      { name: 'Weight', value: '3.5', unit: 'kg' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1606588260160-491c19c22e0f?w=800',
        alt: 'Red Clay Bricks',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 7,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 5000, maxQuantity: 9999, pricePerUnit: 6.5 },
        { minQuantity: 10000, pricePerUnit: 6 }
      ],
      gst: 5
    },
    availability: {
      inStock: true,
      quantity: 100000,
      leadTime: 1,
      minOrder: 1000,
      warehouse: ['Whitefield', 'Marathahalli']
    },
    ratings: {
      average: 4.2,
      count: 567,
      distribution: { 5: 250, 4: 200, 3: 80, 2: 25, 1: 12 }
    },
    tags: ['bricks', 'clay', 'red-bricks', 'construction'],
    certifications: ['ISI']
  },
  {
    name: 'AAC Blocks 600x200x150mm',
    description: 'Autoclaved Aerated Concrete blocks - lightweight, eco-friendly with excellent thermal insulation.',
    category: { id: 'bricks', name: 'Bricks & Blocks' },
    subcategory: 'AAC Blocks',
    brand: 'Birla Aerocon',
    specifications: [
      { name: 'Size', value: '600x200x150', unit: 'mm' },
      { name: 'Density', value: '550-650', unit: 'kg/m³' },
      { name: 'Compressive Strength', value: '4', unit: 'N/mm²' },
      { name: 'Thermal Conductivity', value: '0.16', unit: 'W/mK' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1565197974917-e0a2f4022901?w=800',
        alt: 'AAC Blocks',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 45,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 500, maxQuantity: 999, pricePerUnit: 43 },
        { minQuantity: 1000, pricePerUnit: 41 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 20000,
      leadTime: 2,
      minOrder: 100,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.7,
      count: 289,
      distribution: { 5: 180, 4: 80, 3: 20, 2: 6, 1: 3 }
    },
    tags: ['blocks', 'aac', 'lightweight', 'eco-friendly', 'birla'],
    certifications: ['ISI', 'Green Building']
  },
  {
    name: 'Concrete Hollow Blocks 400x200x200mm',
    description: 'Heavy duty concrete blocks for load bearing walls. High compressive strength.',
    category: { id: 'bricks', name: 'Bricks & Blocks' },
    subcategory: 'Concrete Blocks',
    brand: 'Local Manufacturer',
    specifications: [
      { name: 'Size', value: '400x200x200', unit: 'mm' },
      { name: 'Compressive Strength', value: '7.5', unit: 'N/mm²' },
      { name: 'Weight', value: '18', unit: 'kg' },
      { name: 'Density', value: '2000', unit: 'kg/m³' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
        alt: 'Concrete Blocks',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 35,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 500, pricePerUnit: 33 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 15000,
      leadTime: 1,
      minOrder: 100,
      warehouse: ['Marathahalli']
    },
    ratings: {
      average: 4.3,
      count: 178,
      distribution: { 5: 90, 4: 60, 3: 20, 2: 5, 1: 3 }
    },
    tags: ['blocks', 'concrete', 'hollow', 'construction'],
    certifications: ['ISI']
  },
  
  // Tiles & Flooring
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
    reviews: [
      {
        userId: 'user3',
        userName: 'Arun Patel',
        rating: 5,
        title: 'Beautiful tiles',
        comment: 'These tiles look amazing in my living room. Very easy to clean and maintain.',
        verified: true,
        helpful: 67,
        images: ['https://example.com/review1.jpg'],
        createdAt: new Date('2023-09-20')
      }
    ],
    tags: ['tiles', 'vitrified', 'flooring', 'kajaria', 'premium'],
    certifications: ['ISI', 'CE']
  },
  {
    name: 'Ceramic Wall Tiles 300x600mm - Subway White',
    description: 'Classic subway tiles for kitchen and bathroom walls. Easy to clean and maintain.',
    category: { id: 'tiles', name: 'Tiles & Flooring' },
    subcategory: 'Wall Tiles',
    brand: 'Somany',
    specifications: [
      { name: 'Size', value: '300x600', unit: 'mm' },
      { name: 'Thickness', value: '8', unit: 'mm' },
      { name: 'Finish', value: 'Glossy', unit: '' },
      { name: 'Water Absorption', value: '10-15', unit: '%' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        alt: 'Subway White Tiles',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 45,
      unit: 'sqft',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 300, pricePerUnit: 42 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 20000,
      leadTime: 2,
      minOrder: 50,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.4,
      count: 234,
      distribution: { 5: 140, 4: 70, 3: 15, 2: 6, 1: 3 }
    },
    tags: ['tiles', 'ceramic', 'wall', 'subway', 'somany'],
    certifications: ['ISI']
  },
  {
    name: 'Wooden Laminate Flooring - Oak Finish',
    description: 'High-density fiberboard with realistic oak wood texture. Scratch and water resistant.',
    category: { id: 'tiles', name: 'Tiles & Flooring' },
    subcategory: 'Laminate Flooring',
    brand: 'Pergo',
    specifications: [
      { name: 'Plank Size', value: '1200x190', unit: 'mm' },
      { name: 'Thickness', value: '8', unit: 'mm' },
      { name: 'AC Rating', value: 'AC4', unit: '' },
      { name: 'Warranty', value: '15', unit: 'years' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800',
        alt: 'Oak Laminate Flooring',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 120,
      unit: 'sqft',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 300, maxQuantity: 599, pricePerUnit: 115 },
        { minQuantity: 600, pricePerUnit: 110 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 8000,
      leadTime: 5,
      minOrder: 100,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.8,
      count: 189,
      distribution: { 5: 140, 4: 35, 3: 10, 2: 3, 1: 1 }
    },
    tags: ['flooring', 'laminate', 'wooden', 'oak', 'pergo'],
    certifications: ['E1', 'PEFC']
  },
  
  // Paints & Finishes
  {
    name: 'Asian Paints Apex Ultima - White (20L)',
    description: 'Premium exterior emulsion with dirt resistance technology. 12 years performance warranty.',
    category: { id: 'paint', name: 'Paints & Finishes' },
    subcategory: 'Exterior Paint',
    brand: 'Asian Paints',
    specifications: [
      { name: 'Volume', value: '20', unit: 'liters' },
      { name: 'Coverage', value: '140-160', unit: 'sqft/liter' },
      { name: 'Finish', value: 'Matt', unit: '' },
      { name: 'Drying Time', value: '4-6', unit: 'hours' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?w=800',
        alt: 'Asian Paints Apex Ultima',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 8500,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 5, maxQuantity: 9, pricePerUnit: 8200 },
        { minQuantity: 10, pricePerUnit: 7900 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 500,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.7,
      count: 567,
      distribution: { 5: 400, 4: 120, 3: 30, 2: 12, 1: 5 }
    },
    tags: ['paint', 'exterior', 'emulsion', 'asian-paints', 'premium'],
    certifications: ['Green Building', 'Low VOC']
  },
  {
    name: 'Berger Silk Interior Emulsion - Ivory (10L)',
    description: 'Luxurious silk finish interior paint with anti-bacterial properties. Washable and long-lasting.',
    category: { id: 'paint', name: 'Paints & Finishes' },
    subcategory: 'Interior Paint',
    brand: 'Berger',
    specifications: [
      { name: 'Volume', value: '10', unit: 'liters' },
      { name: 'Coverage', value: '120-140', unit: 'sqft/liter' },
      { name: 'Finish', value: 'Silk', unit: '' },
      { name: 'Washability', value: '30000+', unit: 'cycles' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
        alt: 'Berger Silk Paint',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 3200,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 5, maxQuantity: 9, pricePerUnit: 3100 },
        { minQuantity: 10, pricePerUnit: 3000 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 800,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.5,
      count: 345,
      distribution: { 5: 200, 4: 100, 3: 30, 2: 10, 1: 5 }
    },
    tags: ['paint', 'interior', 'silk', 'berger', 'anti-bacterial'],
    certifications: ['Low VOC', 'Anti-bacterial']
  },
  {
    name: 'Nerolac Wood Finish - Teak Brown (1L)',
    description: 'Premium wood stain and finish for interior woodwork. UV resistant with long-lasting protection.',
    category: { id: 'paint', name: 'Paints & Finishes' },
    subcategory: 'Wood Finish',
    brand: 'Nerolac',
    specifications: [
      { name: 'Volume', value: '1', unit: 'liter' },
      { name: 'Coverage', value: '100-120', unit: 'sqft/liter' },
      { name: 'Finish', value: 'Satin', unit: '' },
      { name: 'Drying Time', value: '6-8', unit: 'hours' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800',
        alt: 'Wood Finish',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 650,
      unit: 'piece',
      currency: 'INR',
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 1200,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.4,
      count: 123,
      distribution: { 5: 70, 4: 35, 3: 12, 2: 4, 1: 2 }
    },
    tags: ['paint', 'wood-finish', 'stain', 'nerolac'],
    certifications: ['Low VOC']
  },
  
  // Sand & Aggregates
  {
    name: 'M-Sand (Manufactured Sand) - Grade II',
    description: 'High quality manufactured sand ideal for concrete and plastering. Consistent gradation.',
    category: { id: 'sand', name: 'Sand & Aggregates' },
    subcategory: 'M-Sand',
    brand: 'Local Supplier',
    specifications: [
      { name: 'Grade', value: 'II', unit: '' },
      { name: 'Fineness Modulus', value: '2.5-3.5', unit: '' },
      { name: 'Silt Content', value: '<3', unit: '%' },
      { name: 'Particle Size', value: '0-4.75', unit: 'mm' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800',
        alt: 'M-Sand',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 1800,
      unit: 'ton',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 10, maxQuantity: 19, pricePerUnit: 1700 },
        { minQuantity: 20, pricePerUnit: 1600 }
      ],
      gst: 5
    },
    availability: {
      inStock: true,
      quantity: 1000,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Whitefield', 'Marathahalli']
    },
    ratings: {
      average: 4.1,
      count: 234,
      distribution: { 5: 100, 4: 80, 3: 40, 2: 10, 1: 4 }
    },
    tags: ['sand', 'm-sand', 'aggregates', 'construction'],
    certifications: ['BIS']
  },
  {
    name: 'River Sand - Medium Grade',
    description: 'Natural river sand suitable for plastering and masonry work. Well graded and clean.',
    category: { id: 'sand', name: 'Sand & Aggregates' },
    subcategory: 'River Sand',
    brand: 'Local Supplier',
    specifications: [
      { name: 'Type', value: 'Medium', unit: '' },
      { name: 'Fineness Modulus', value: '2.2-2.8', unit: '' },
      { name: 'Silt Content', value: '<5', unit: '%' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1629197221007-9b8f03a06622?w=800',
        alt: 'River Sand',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 2200,
      unit: 'ton',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 10, pricePerUnit: 2100 }
      ],
      gst: 5
    },
    availability: {
      inStock: true,
      quantity: 500,
      leadTime: 2,
      minOrder: 5,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.0,
      count: 156,
      distribution: { 5: 70, 4: 50, 3: 25, 2: 8, 1: 3 }
    },
    tags: ['sand', 'river-sand', 'natural', 'construction'],
    certifications: []
  },
  {
    name: '20mm Granite Aggregates',
    description: 'Crushed granite aggregates for concrete work. Clean and properly graded.',
    category: { id: 'sand', name: 'Sand & Aggregates' },
    subcategory: 'Aggregates',
    brand: 'Local Quarry',
    specifications: [
      { name: 'Size', value: '20', unit: 'mm' },
      { name: 'Shape', value: 'Angular', unit: '' },
      { name: 'Specific Gravity', value: '2.7', unit: '' },
      { name: 'Water Absorption', value: '<1', unit: '%' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1629197221007-9b8f03a06622?w=800',
        alt: 'Granite Aggregates',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 1500,
      unit: 'ton',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 10, maxQuantity: 19, pricePerUnit: 1400 },
        { minQuantity: 20, pricePerUnit: 1300 }
      ],
      gst: 5
    },
    availability: {
      inStock: true,
      quantity: 2000,
      leadTime: 1,
      minOrder: 5,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.3,
      count: 178,
      distribution: { 5: 90, 4: 60, 3: 20, 2: 5, 1: 3 }
    },
    tags: ['aggregates', 'granite', '20mm', 'concrete'],
    certifications: ['BIS']
  },
  
  // Electrical
  {
    name: 'Havells 6A MCB Single Pole',
    description: 'Miniature Circuit Breaker for overload and short circuit protection. High breaking capacity.',
    category: { id: 'electrical', name: 'Electrical' },
    subcategory: 'MCB',
    brand: 'Havells',
    specifications: [
      { name: 'Current Rating', value: '6', unit: 'A' },
      { name: 'Poles', value: '1', unit: '' },
      { name: 'Breaking Capacity', value: '10', unit: 'kA' },
      { name: 'Tripping Curve', value: 'C', unit: '' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800',
        alt: 'Havells MCB',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 180,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 10, maxQuantity: 49, pricePerUnit: 170 },
        { minQuantity: 50, pricePerUnit: 160 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 1000,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.6,
      count: 456,
      distribution: { 5: 300, 4: 100, 3: 40, 2: 10, 1: 6 }
    },
    tags: ['electrical', 'mcb', 'circuit-breaker', 'havells'],
    certifications: ['ISI', 'CE']
  },
  {
    name: 'Finolex 2.5 sq.mm House Wire (90m)',
    description: 'FR PVC insulated copper wire for house wiring. Fire retardant with high conductivity.',
    category: { id: 'electrical', name: 'Electrical' },
    subcategory: 'Wires',
    brand: 'Finolex',
    specifications: [
      { name: 'Size', value: '2.5', unit: 'sq.mm' },
      { name: 'Length', value: '90', unit: 'meters' },
      { name: 'Conductor', value: 'Copper', unit: '' },
      { name: 'Insulation', value: 'FR PVC', unit: '' },
      { name: 'Voltage Rating', value: '1100', unit: 'V' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        alt: 'Finolex Wire',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 2200,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 5, maxQuantity: 9, pricePerUnit: 2100 },
        { minQuantity: 10, pricePerUnit: 2000 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 500,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 15, 2: 6, 1: 3 }
    },
    tags: ['electrical', 'wire', 'copper', 'finolex'],
    certifications: ['ISI', 'FRLS']
  },
  {
    name: 'Anchor 6A Socket with Switch',
    description: 'Premium quality socket with switch and safety shutter. Suitable for all plug types.',
    category: { id: 'electrical', name: 'Electrical' },
    subcategory: 'Switches & Sockets',
    brand: 'Anchor',
    specifications: [
      { name: 'Current Rating', value: '6', unit: 'A' },
      { name: 'Voltage Rating', value: '240', unit: 'V' },
      { name: 'Type', value: 'Universal', unit: '' },
      { name: 'Material', value: 'Polycarbonate', unit: '' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800',
        alt: 'Anchor Socket',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 120,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 20, pricePerUnit: 110 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 2000,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.4,
      count: 345,
      distribution: { 5: 200, 4: 100, 3: 30, 2: 10, 1: 5 }
    },
    tags: ['electrical', 'socket', 'switch', 'anchor'],
    certifications: ['ISI']
  },
  
  // Plumbing
  {
    name: 'Astral CPVC Pipe 1" (3m)',
    description: 'Chlorinated Polyvinyl Chloride pipe for hot and cold water applications. Lead-free and durable.',
    category: { id: 'plumbing', name: 'Plumbing' },
    subcategory: 'CPVC Pipes',
    brand: 'Astral',
    specifications: [
      { name: 'Diameter', value: '1', unit: 'inch' },
      { name: 'Length', value: '3', unit: 'meters' },
      { name: 'Pressure Rating', value: 'SDR-11', unit: '' },
      { name: 'Temperature', value: '93', unit: '°C max' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
        alt: 'Astral CPVC Pipe',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 380,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 10, maxQuantity: 49, pricePerUnit: 360 },
        { minQuantity: 50, pricePerUnit: 340 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 800,
      leadTime: 1,
      minOrder: 1,
      warehouse: ['Indiranagar', 'HSR Layout']
    },
    ratings: {
      average: 4.7,
      count: 345,
      distribution: { 5: 250, 4: 70, 3: 15, 2: 7, 1: 3 }
    },
    tags: ['plumbing', 'cpvc', 'pipe', 'astral'],
    certifications: ['ISI', 'NSF']
  },
  {
    name: 'Jaquar Single Lever Basin Mixer',
    description: 'Premium chrome-plated basin mixer with ceramic cartridge. Smooth operation and water saving.',
    category: { id: 'plumbing', name: 'Plumbing' },
    subcategory: 'Faucets',
    brand: 'Jaquar',
    specifications: [
      { name: 'Type', value: 'Single Lever', unit: '' },
      { name: 'Finish', value: 'Chrome', unit: '' },
      { name: 'Cartridge', value: '35mm Ceramic', unit: '' },
      { name: 'Flow Rate', value: '6', unit: 'LPM' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        alt: 'Jaquar Basin Mixer',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 3500,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 5, maxQuantity: 9, pricePerUnit: 3300 },
        { minQuantity: 10, pricePerUnit: 3100 }
      ],
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 200,
      leadTime: 3,
      minOrder: 1,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.8,
      count: 234,
      distribution: { 5: 180, 4: 40, 3: 10, 2: 3, 1: 1 }
    },
    tags: ['plumbing', 'faucet', 'basin-mixer', 'jaquar'],
    certifications: ['ISI', 'Water Efficiency']
  },
  {
    name: 'Hindware Wall Hung Toilet',
    description: 'Modern wall mounted toilet with soft close seat. Space saving design.',
    category: { id: 'plumbing', name: 'Plumbing' },
    subcategory: 'Sanitaryware',
    brand: 'Hindware',
    specifications: [
      { name: 'Type', value: 'Wall Hung', unit: '' },
      { name: 'Material', value: 'Vitreous China', unit: '' },
      { name: 'Flush Type', value: 'Dual Flush', unit: '' },
      { name: 'Water Usage', value: '3/6', unit: 'liters' }
    ],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1565537467184-d3fb7fc6fed7?w=800',
        alt: 'Wall Hung Toilet',
        isPrimary: true,
        type: 'product'
      }
    ],
    pricing: {
      basePrice: 12000,
      unit: 'piece',
      currency: 'INR',
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 50,
      leadTime: 5,
      minOrder: 1,
      warehouse: ['Indiranagar']
    },
    ratings: {
      average: 4.5,
      count: 123,
      distribution: { 5: 80, 4: 30, 3: 8, 2: 3, 1: 2 }
    },
    tags: ['plumbing', 'toilet', 'sanitaryware', 'hindware', 'wall-hung'],
    certifications: ['ISI', 'Water Efficient']
  }
]

// Leads data
const leads = [
  {
    name: 'Amit Sharma',
    email: 'amit.sharma@email.com',
    phone: '+91 9876543220',
    projectType: 'Residential',
    budget: '50-75 Lakhs',
    timeline: '6-12 months',
    location: 'Whitefield, Bangalore',
    message: 'Looking to build a 3BHK villa on a 30x40 plot. Need complete construction services including interiors.',
    source: 'Website Contact Form',
    status: 'new',
    createdAt: new Date('2024-01-10')
  },
  {
    name: 'Priya Reddy',
    email: 'priya.reddy@email.com',
    phone: '+91 9876543221',
    projectType: 'Interior Design',
    budget: '10-15 Lakhs',
    timeline: '3-6 months',
    location: 'Indiranagar, Bangalore',
    message: 'Need interior design for my 2BHK apartment. Looking for modern minimalist design.',
    source: 'Quote Form',
    status: 'contacted',
    contactedAt: new Date('2024-01-12'),
    notes: 'Interested in modular kitchen and wardrobes',
    createdAt: new Date('2024-01-11')
  },
  {
    name: 'Suresh Kumar',
    email: 'suresh.k@email.com',
    phone: '+91 9876543222',
    projectType: 'Commercial',
    budget: '1-2 Crores',
    timeline: '12-18 months',
    location: 'Electronic City, Bangalore',
    message: 'Planning to build a small office complex. Need architectural design and construction.',
    source: 'Referral',
    status: 'qualified',
    qualifiedAt: new Date('2024-01-15'),
    notes: 'Has land ready, needs building plan approval',
    createdAt: new Date('2024-01-08')
  },
  {
    name: 'Deepa Nair',
    email: 'deepa.nair@email.com',
    phone: '+91 9876543223',
    projectType: 'Renovation',
    budget: '20-30 Lakhs',
    timeline: '3-6 months',
    location: 'Koramangala, Bangalore',
    message: 'Want to renovate my old house. Need to add one more floor and modernize interiors.',
    source: 'Google Ads',
    status: 'proposal-sent',
    proposalSentAt: new Date('2024-01-20'),
    proposalAmount: 2500000,
    createdAt: new Date('2024-01-05')
  },
  {
    name: 'Rajesh Gupta',
    email: 'rajesh.gupta@email.com',
    phone: '+91 9876543224',
    projectType: 'Residential',
    budget: '75-100 Lakhs',
    timeline: '12-18 months',
    location: 'HSR Layout, Bangalore',
    message: 'Building a 4BHK duplex house. Looking for premium construction with smart home features.',
    source: 'Website Contact Form',
    status: 'converted',
    convertedAt: new Date('2024-01-25'),
    dealValue: 8500000,
    createdAt: new Date('2023-12-20')
  }
]

// Estimates data
const generateEstimates = (users) => {
  return [
    {
      customerName: 'Rajesh Kumar',
      customerEmail: 'rajesh.kumar@example.com',
      customerPhone: '+91 9876543210',
      projectType: 'construction',
      propertyType: 'residential',
      location: {
        area: 'Whitefield',
        pincode: '560066',
        city: 'Bangalore'
      },
      specifications: {
        plotSize: 1200,
        builtUpArea: 2400,
        floors: 2,
        bedrooms: 4,
        bathrooms: 4,
        carParking: 2
      },
      quality: {
        structure: 'premium',
        finishes: 'premium',
        fittings: 'luxury'
      },
      additionalFeatures: ['modularKitchen', 'landscaping', 'homeAutomation'],
      costBreakdown: {
        baseCost: 4800000,
        structureCost: 600000,
        finishesCost: 800000,
        fittingsCost: 400000,
        additionalFeaturesCost: 600000,
        taxesAndFees: 540000,
        totalCost: 7740000,
        costPerSqFt: 3225
      },
      marketComparison: {
        areaAverage: 3100,
        cityAverage: 2900,
        percentageDifference: 4.03
      },
      timeline: {
        estimatedDuration: 18,
        phases: [
          { name: 'Foundation', duration: 2, startMonth: 1, endMonth: 2 },
          { name: 'Structure', duration: 6, startMonth: 3, endMonth: 8 },
          { name: 'Finishing', duration: 6, startMonth: 9, endMonth: 14 },
          { name: 'Final Touches', duration: 4, startMonth: 15, endMonth: 18 }
        ]
      },
      suggestions: [
        {
          category: 'Material',
          suggestion: 'Consider AAC blocks instead of regular bricks',
          potentialSaving: 120000
        },
        {
          category: 'Design',
          suggestion: 'Optimize room sizes to reduce wastage',
          potentialSaving: 80000
        }
      ],
      status: 'sent',
      viewedAt: new Date('2024-01-15'),
      createdAt: new Date('2024-01-10')
    },
    {
      customerName: 'Priya Sharma',
      customerEmail: 'priya.sharma@example.com',
      customerPhone: '+91 9876543211',
      projectType: 'interior',
      propertyType: 'residential',
      location: {
        area: 'Indiranagar',
        pincode: '560038',
        city: 'Bangalore'
      },
      specifications: {
        plotSize: 0,
        builtUpArea: 1200,
        floors: 1,
        bedrooms: 2,
        bathrooms: 2,
        carParking: 1
      },
      quality: {
        structure: 'standard',
        finishes: 'premium',
        fittings: 'premium'
      },
      additionalFeatures: ['modularKitchen', 'interiorDesign'],
      costBreakdown: {
        baseCost: 0,
        structureCost: 0,
        finishesCost: 800000,
        fittingsCost: 400000,
        additionalFeaturesCost: 300000,
        taxesAndFees: 120000,
        totalCost: 1620000,
        costPerSqFt: 1350
      },
      marketComparison: {
        areaAverage: 1250,
        cityAverage: 1100,
        percentageDifference: 8
      },
      timeline: {
        estimatedDuration: 3,
        phases: [
          { name: 'Design & Planning', duration: 1, startMonth: 1, endMonth: 1 },
          { name: 'Execution', duration: 2, startMonth: 2, endMonth: 3 }
        ]
      },
      status: 'accepted',
      acceptedAt: new Date('2024-01-18'),
      createdAt: new Date('2024-01-12')
    }
  ]
}

// Blog posts data
const blogPosts = [
  {
    title: '10 Modern Home Design Trends for 2024',
    slug: 'modern-home-design-trends-2024',
    excerpt: 'Discover the latest trends in modern home design that are shaping the construction industry in 2024.',
    content: `
# 10 Modern Home Design Trends for 2024

The construction and design industry is constantly evolving, and 2024 brings exciting new trends that blend aesthetics with functionality. Here are the top 10 trends shaping modern homes this year.

## 1. Sustainable Materials

Eco-friendly construction materials are no longer optional—they're essential. Homeowners are increasingly choosing sustainable options like bamboo flooring, recycled steel, and reclaimed wood.

## 2. Smart Home Integration

From automated lighting to AI-powered security systems, smart home technology is becoming standard in new constructions. The focus is on seamless integration that enhances daily living.

## 3. Biophilic Design

Bringing nature indoors through living walls, indoor gardens, and natural light optimization creates healthier, more vibrant living spaces.

## 4. Minimalist Aesthetics

Clean lines, neutral colors, and clutter-free spaces continue to dominate. The emphasis is on quality over quantity, with each element serving both form and function.

## 5. Multi-functional Spaces

With remote work becoming permanent for many, homes now feature flexible spaces that can transform from office to gym to entertainment area.

## 6. Energy Efficiency

Solar panels, better insulation, and energy-efficient appliances are priorities for cost-conscious and environmentally aware homeowners.

## 7. Outdoor Living Extensions

Patios, decks, and outdoor kitchens are being designed as natural extensions of indoor living spaces, complete with weatherproof furniture and heating.

## 8. Bold Color Accents

While neutral bases remain popular, bold color accents through furniture, art, and feature walls add personality and vibrancy.

## 9. Wellness-Focused Design

Home gyms, meditation spaces, and spa-like bathrooms reflect the growing emphasis on health and wellness at home.

## 10. Local Material Sourcing

Using locally sourced materials reduces transportation costs and carbon footprint while supporting local economies.

Stay tuned for more insights on modern construction and design trends!
    `,
    author: 'Sahara Construction Team',
    category: 'Design Trends',
    tags: ['modern design', 'home trends', '2024', 'interior design', 'architecture'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
    published: true,
    featured: true,
    views: 1523,
    readTime: 5,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10')
  },
  {
    title: 'Complete Guide to Home Construction Costs in Bangalore',
    slug: 'home-construction-costs-bangalore-guide',
    excerpt: 'A comprehensive breakdown of construction costs in Bangalore, including materials, labor, and hidden expenses.',
    content: `
# Complete Guide to Home Construction Costs in Bangalore

Building your dream home in Bangalore? Understanding the cost structure is crucial for proper budgeting. This guide breaks down all aspects of construction costs in India's IT capital.

## Current Market Rates (2024)

### Basic Construction
- Economy: ₹1,500 - ₹1,800 per sq.ft
- Standard: ₹1,800 - ₹2,200 per sq.ft
- Premium: ₹2,200 - ₹3,000 per sq.ft
- Luxury: ₹3,000+ per sq.ft

## Cost Breakdown

### 1. Structure (40-45%)
- Foundation and basement
- Columns, beams, and slabs
- Walls and roofing
- Waterproofing

### 2. Finishes (25-30%)
- Flooring (tiles, marble, wood)
- Wall finishes and painting
- False ceiling
- External cladding

### 3. Fittings (15-20%)
- Doors and windows
- Kitchen cabinets
- Bathroom fittings
- Electrical fixtures

### 4. Services (10-15%)
- Plumbing system
- Electrical wiring
- HVAC installation
- Security systems

### 5. Other Costs (5-10%)
- Architect fees
- Structural engineer fees
- Legal and approval costs
- Contingency fund

## Hidden Costs to Consider

1. **Soil Testing**: ₹5,000 - ₹15,000
2. **Plan Approval**: ₹50,000 - ₹1,50,000
3. **Boring and Water Connection**: ₹50,000 - ₹1,00,000
4. **Compound Wall**: ₹700 - ₹1,000 per running foot
5. **Landscaping**: ₹50 - ₹200 per sq.ft

## Tips to Optimize Costs

1. **Plan Thoroughly**: Changes during construction increase costs by 15-20%
2. **Buy in Bulk**: Purchase materials in bulk for better rates
3. **Seasonal Buying**: Buy cement and steel during off-season
4. **Local Sourcing**: Use locally available materials when possible
5. **Phase Construction**: Build in phases if budget is tight

## Area-wise Cost Variations

- **North Bangalore** (Hebbal, Yelahanka): Lower land costs, standard construction rates
- **East Bangalore** (Whitefield, Marathahalli): Premium rates due to IT corridor proximity
- **South Bangalore** (JP Nagar, Bannerghatta): Mid to premium range
- **West Bangalore** (Rajajinagar, Malleswaram): Established areas with premium rates

Remember, these are indicative costs. Actual expenses vary based on design complexity, material choices, and site conditions. Always maintain a 10-15% contingency fund for unexpected expenses.

*Contact Sahara Construction for a detailed, personalized cost estimate for your project.*
    `,
    author: 'Sahara Construction Team',
    category: 'Construction Guide',
    tags: ['construction costs', 'bangalore', 'budget planning', 'home building'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    published: true,
    featured: true,
    views: 2847,
    readTime: 8,
    publishedAt: new Date('2024-01-08'),
    createdAt: new Date('2024-01-05')
  },
  {
    title: 'Vastu Tips for Modern Homes',
    slug: 'vastu-tips-modern-homes',
    excerpt: 'How to incorporate Vastu principles in contemporary home design without compromising on aesthetics.',
    content: `
# Vastu Tips for Modern Homes

Vastu Shastra, the ancient Indian science of architecture, can be seamlessly integrated into modern home design. Here's how to balance traditional wisdom with contemporary aesthetics.

## Understanding Vastu Basics

Vastu focuses on harmonizing your living space with natural elements and cosmic energy. The goal is to create positive energy flow throughout your home.

## Key Vastu Principles for Modern Homes

### 1. Main Entrance
- **Ideal Direction**: North, Northeast, or East
- **Modern Tip**: Use a grand entrance door with good lighting
- **Avoid**: Shoes rack directly in front of the door

### 2. Living Room
- **Best Location**: North or Northeast
- **Furniture**: Heavy furniture in Southwest
- **Modern Touch**: Use light colors and mirrors on North walls

### 3. Kitchen
- **Ideal Position**: Southeast corner
- **Cooking Direction**: Face East while cooking
- **Contemporary Design**: Modular kitchens work well with Vastu

### 4. Master Bedroom
- **Location**: Southwest corner
- **Bed Position**: Head towards South or West
- **Modern Elements**: Walk-in closets in West or South

### 5. Bathrooms
- **Placement**: Northwest or Southeast
- **Avoid**: Northeast or Southwest
- **Design Tip**: Ensure proper ventilation and natural light

## Vastu-Friendly Modern Features

### Open Floor Plans
- Maintain energy flow
- Use furniture placement to define spaces
- Keep center of home clutter-free

### Large Windows
- Northeast windows for morning light
- Avoid large openings in Southwest
- Use sheer curtains for energy balance

### Indoor Plants
- Money plants in Southeast
- Bamboo in East or Southeast
- Avoid cacti and thorny plants indoors

### Water Features
- Fountains in North or Northeast
- Aquariums in Northeast living room
- Ensure water is always clean and flowing

## Common Vastu Myths Debunked

1. **Myth**: Vastu means traditional design only
   **Reality**: Vastu principles work with any design style

2. **Myth**: Major structural changes are always needed
   **Reality**: Simple adjustments often suffice

3. **Myth**: Vastu is rigid and inflexible
   **Reality**: There are usually multiple solutions

## Quick Vastu Fixes for Existing Homes

1. **Mirrors**: Place in North or East walls
2. **Colors**: Use light shades in Northeast
3. **Lighting**: Ensure bright Northeast corner
4. **Plants**: Add holy basil in Northeast
5. **Symbols**: Om or Swastik at entrance

## Balancing Vastu with Modern Needs

Remember, Vastu is about creating positive spaces. While following these guidelines, prioritize:
- Natural light and ventilation
- Functional layout
- Personal comfort
- Aesthetic preferences

The best home is one that feels right to you while incorporating beneficial Vastu elements where possible.

*Consult with Sahara Construction's Vastu experts for personalized advice on your project.*
    `,
    author: 'Sahara Construction Team',
    category: 'Vastu & Design',
    tags: ['vastu', 'home design', 'traditional architecture', 'modern homes'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    published: true,
    featured: false,
    views: 1965,
    readTime: 6,
    publishedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-18')
  },
  {
    title: 'Sustainable Construction Materials: Building Green in 2024',
    slug: 'sustainable-construction-materials-2024',
    excerpt: 'Explore eco-friendly construction materials that reduce environmental impact without compromising quality.',
    content: `
# Sustainable Construction Materials: Building Green in 2024

The construction industry is embracing sustainability like never before. Here's your guide to eco-friendly materials that are reshaping how we build.

## Why Sustainable Construction Matters

- Reduces carbon footprint
- Lowers long-term costs
- Improves indoor air quality
- Increases property value
- Contributes to environmental conservation

## Top Sustainable Materials

### 1. Bamboo
**Benefits**: 
- Grows 3-4 feet per day
- Stronger than steel in tensile strength
- Natural pest resistance

**Applications**: Flooring, wall panels, structural elements

### 2. Recycled Steel
**Benefits**:
- Uses 75% less energy than new steel
- Infinitely recyclable
- High durability

**Applications**: Framing, roofing, structural support

### 3. Fly Ash Bricks
**Benefits**:
- Utilizes industrial waste
- Better insulation than clay bricks
- Higher strength

**Applications**: Wall construction, pavements

### 4. AAC Blocks
**Benefits**:
- 3x lighter than traditional bricks
- Excellent thermal insulation
- Fire resistant

**Applications**: Internal and external walls

### 5. Reclaimed Wood
**Benefits**:
- Reduces deforestation
- Unique character and patina
- Often stronger than new wood

**Applications**: Flooring, beams, decorative elements

## Innovative Green Technologies

### Solar Tiles
- Generate electricity
- Look like regular roof tiles
- 30-year lifespan

### Hempcrete
- Carbon negative material
- Excellent insulation
- Naturally pest resistant

### Recycled Plastic Blocks
- Diverts plastic from landfills
- Waterproof and durable
- Easy to install

## Cost Analysis

| Material | Initial Cost | Long-term Savings | ROI Period |
|----------|-------------|-------------------|------------|
| Bamboo Flooring | Medium | High | 5-7 years |
| Fly Ash Bricks | Low | Medium | Immediate |
| Solar Tiles | High | Very High | 8-10 years |
| AAC Blocks | Medium | High | 3-5 years |

## Implementation Tips

1. **Start Small**: Begin with one or two sustainable materials
2. **Local Sourcing**: Find local suppliers to reduce transportation
3. **Certification**: Look for green building certifications
4. **Expert Consultation**: Work with experienced green builders

## Government Incentives

- Tax benefits for green buildings
- Faster approvals for sustainable projects
- Subsidies for solar installations
- Lower interest rates on green home loans

## Future Trends

- Self-healing concrete
- 3D printed sustainable homes
- Living building materials
- Carbon-absorbing cement

Building sustainably is no longer a luxury—it's a responsibility and smart investment. Make your next project green!

*Partner with Sahara Construction for sustainable building solutions.*
    `,
    author: 'Sahara Construction Team',
    category: 'Sustainability',
    tags: ['sustainable construction', 'green building', 'eco-friendly', 'materials'],
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200',
    published: true,
    featured: false,
    views: 1234,
    readTime: 7,
    publishedAt: new Date('2024-01-22'),
    createdAt: new Date('2024-01-20')
  }
]

// Material Orders data
const generateMaterialOrders = (users, materials, suppliers) => {
  return [
    {
      orderId: 'ORD-202401-ABC123',
      customerId: users[1]._id, // Rajesh Kumar
      customerName: 'Rajesh Kumar',
      customerEmail: 'rajesh.kumar@example.com',
      customerPhone: '+91 9876543210',
      items: [
        {
          materialId: materials[0]._id,
          material: {
            name: materials[0].name,
            brand: materials[0].brand,
            model: materials[0].model,
            image: materials[0].images[0].url,
            unit: materials[0].pricing.unit
          },
          supplierId: suppliers[0]._id,
          supplierName: suppliers[0].name,
          quantity: 100,
          unitPrice: 360,
          totalPrice: 36000,
          tax: 10080,
          status: 'delivered',
          deliveryDate: new Date('2024-01-25'),
          trackingNumber: 'TRK123456789'
        },
        {
          materialId: materials[3]._id,
          material: {
            name: materials[3].name,
            brand: materials[3].brand,
            image: materials[3].images[0].url,
            unit: materials[3].pricing.unit
          },
          supplierId: suppliers[0]._id,
          supplierName: suppliers[0].name,
          quantity: 5000,
          unitPrice: 64,
          totalPrice: 320000,
          tax: 57600,
          status: 'delivered',
          deliveryDate: new Date('2024-01-25')
        }
      ],
      pricing: {
        subtotal: 356000,
        tax: 67680,
        shipping: 2000,
        discount: 0,
        total: 425680
      },
      payment: {
        method: 'online',
        status: 'completed',
        transactionId: 'TXN123456789',
        paidAt: new Date('2024-01-20')
      },
      addresses: {
        shipping: {
          street: '123 Main Road',
          area: 'Whitefield',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560066',
          country: 'India',
          landmark: 'Near Tech Park'
        },
        billing: {
          street: '123 Main Road',
          area: 'Whitefield',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560066',
          country: 'India'
        }
      },
      status: 'delivered',
      delivery: {
        type: 'standard',
        estimatedDate: new Date('2024-01-25'),
        actualDate: new Date('2024-01-25'),
        instructions: 'Call before delivery'
      },
      timeline: [
        { status: 'pending', timestamp: new Date('2024-01-20'), note: 'Order placed' },
        { status: 'confirmed', timestamp: new Date('2024-01-20'), note: 'Payment confirmed' },
        { status: 'processing', timestamp: new Date('2024-01-21'), note: 'Order being prepared' },
        { status: 'shipped', timestamp: new Date('2024-01-23'), note: 'Out for delivery' },
        { status: 'delivered', timestamp: new Date('2024-01-25'), note: 'Delivered successfully' }
      ],
      invoice: {
        number: 'INV-ORD-202401-ABC123',
        generatedAt: new Date('2024-01-25')
      },
      createdAt: new Date('2024-01-20')
    },
    {
      orderId: 'ORD-202401-DEF456',
      customerId: users[2]._id, // Priya Sharma
      customerName: 'Priya Sharma',
      customerEmail: 'priya.sharma@example.com',
      customerPhone: '+91 9876543211',
      items: [
        {
          materialId: materials[9]._id,
          material: {
            name: materials[9].name,
            brand: materials[9].brand,
            image: materials[9].images[0].url,
            unit: materials[9].pricing.unit
          },
          supplierId: suppliers[1]._id,
          supplierName: suppliers[1].name,
          quantity: 1000,
          unitPrice: 78,
          totalPrice: 78000,
          tax: 14040,
          status: 'processing',
          deliveryDate: new Date('2024-02-05')
        }
      ],
      pricing: {
        subtotal: 78000,
        tax: 14040,
        shipping: 0,
        discount: 3900,
        total: 88140
      },
      payment: {
        method: 'online',
        status: 'completed',
        transactionId: 'TXN987654321',
        paidAt: new Date('2024-01-28')
      },
      addresses: {
        shipping: {
          street: '456 Park Avenue',
          area: 'Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560038',
          country: 'India'
        }
      },
      status: 'processing',
      delivery: {
        type: 'standard',
        estimatedDate: new Date('2024-02-05')
      },
      timeline: [
        { status: 'pending', timestamp: new Date('2024-01-28'), note: 'Order placed' },
        { status: 'confirmed', timestamp: new Date('2024-01-28'), note: 'Payment confirmed' },
        { status: 'processing', timestamp: new Date('2024-01-29'), note: 'Order being prepared' }
      ],
      createdAt: new Date('2024-01-28')
    }
  ]
}

async function seedAllData() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Clear all collections
    console.log('Clearing existing data...')
    await User.deleteMany({})
    await Material.deleteMany({})
    await Supplier.deleteMany({})
    await MaterialOrder.deleteMany({})
    await Estimate.deleteMany({})
    await Lead.deleteMany({})
    await BlogPost.deleteMany({})
    
    // Create users
    console.log('Creating users...')
    const createdUsers = await User.create(users)
    console.log(`✓ Created ${createdUsers.length} users`)
    
    // Create suppliers
    console.log('Creating suppliers...')
    const createdSuppliers = await Supplier.create(suppliers)
    console.log(`✓ Created ${createdSuppliers.length} suppliers`)
    
    // Assign suppliers to materials
    console.log('Creating materials...')
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
    const createdMaterials = await Material.create(materialsWithSuppliers)
    console.log(`✓ Created ${createdMaterials.length} materials`)
    
    // Create leads
    console.log('Creating leads...')
    const createdLeads = await Lead.create(leads)
    console.log(`✓ Created ${createdLeads.length} leads`)
    
    // Create estimates
    console.log('Creating estimates...')
    const estimatesData = generateEstimates(createdUsers)
    const createdEstimates = await Estimate.create(estimatesData)
    console.log(`✓ Created ${createdEstimates.length} estimates`)
    
    // Create blog posts
    console.log('Creating blog posts...')
    const createdBlogPosts = await BlogPost.create(blogPosts)
    console.log(`✓ Created ${createdBlogPosts.length} blog posts`)
    
    // Create material orders
    console.log('Creating material orders...')
    const ordersData = generateMaterialOrders(createdUsers, createdMaterials, createdSuppliers)
    const createdOrders = await MaterialOrder.create(ordersData)
    console.log(`✓ Created ${createdOrders.length} material orders`)
    
    console.log('\n=== Seeding Summary ===')
    console.log(`✓ Users: ${createdUsers.length}`)
    console.log(`✓ Suppliers: ${createdSuppliers.length}`)
    console.log(`✓ Materials: ${createdMaterials.length}`)
    console.log(`✓ Leads: ${createdLeads.length}`)
    console.log(`✓ Estimates: ${createdEstimates.length}`)
    console.log(`✓ Blog Posts: ${createdBlogPosts.length}`)
    console.log(`✓ Material Orders: ${createdOrders.length}`)
    
    console.log('\n=== Sample Login Credentials ===')
    console.log('Admin: admin@sahara.com / admin123')
    console.log('Customer: rajesh.kumar@example.com / customer123')
    
    console.log('\nAll data seeded successfully! 🎉')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedAllData()