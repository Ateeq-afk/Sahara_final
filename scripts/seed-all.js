const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/construction'

// Define schemas inline to avoid TypeScript imports
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'customer' },
  isVerified: { type: Boolean, default: false },
  phone: String,
  createdAt: { type: Date, default: Date.now }
})

const SupplierSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  verified: Boolean,
  verificationDate: Date,
  rating: Number,
  totalReviews: Number,
  contact: {
    email: String,
    phone: String,
    whatsapp: String,
    address: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    website: String
  },
  categories: [String],
  certifications: [{
    name: String,
    issuedBy: String,
    validFrom: Date,
    validTo: Date,
    documentUrl: String
  }],
  establishedYear: Number,
  deliveryAreas: [{
    area: String,
    pincode: String,
    deliveryCharge: Number,
    minOrderValue: Number,
    estimatedDays: Number
  }],
  paymentTerms: [String],
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    branchName: String,
    ifscCode: String,
    upiId: String
  },
  businessDetails: {
    gstNumber: String,
    panNumber: String,
    licenseNumber: String,
    registrationType: String
  },
  performance: {
    totalOrders: Number,
    completedOrders: Number,
    cancelledOrders: Number,
    totalRevenue: Number,
    averageDeliveryTime: Number,
    onTimeDeliveryRate: Number
  },
  preferences: {
    minOrderValue: Number,
    maxOrderValue: Number,
    workingHours: Object,
    leadTime: Number,
    bulkDiscounts: [{
      minQuantity: Number,
      discountPercentage: Number
    }]
  },
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const MaterialSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    id: String,
    name: String
  },
  subcategory: String,
  brand: String,
  model: String,
  specifications: [{
    name: String,
    value: String,
    unit: String
  }],
  images: [{
    id: String,
    url: String,
    alt: String,
    isPrimary: Boolean,
    type: String
  }],
  pricing: {
    basePrice: Number,
    unit: String,
    currency: String,
    bulkPricing: [{
      minQuantity: Number,
      maxQuantity: Number,
      pricePerUnit: Number
    }],
    gst: Number
  },
  availability: {
    inStock: Boolean,
    quantity: Number,
    leadTime: Number,
    minOrder: Number,
    maxOrder: Number,
    warehouse: [String]
  },
  supplier: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    logo: String,
    description: String,
    verified: Boolean,
    rating: Number,
    totalReviews: Number,
    contact: Object,
    categories: [String],
    certifications: [String],
    establishedYear: Number,
    deliveryAreas: [String],
    paymentTerms: [String]
  },
  ratings: {
    average: Number,
    count: Number,
    distribution: {
      5: Number,
      4: Number,
      3: Number,
      2: Number,
      1: Number
    }
  },
  reviews: [{
    userId: String,
    userName: String,
    rating: Number,
    title: String,
    comment: String,
    verified: Boolean,
    helpful: Number,
    images: [String],
    createdAt: Date
  }],
  tags: [String],
  certifications: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  budget: String,
  timeline: String,
  location: String,
  message: String,
  source: String,
  status: String,
  contactedAt: Date,
  qualifiedAt: Date,
  proposalSentAt: Date,
  convertedAt: Date,
  notes: String,
  proposalAmount: Number,
  dealValue: Number,
  createdAt: { type: Date, default: Date.now }
})

const EstimateSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  projectType: String,
  propertyType: String,
  location: {
    area: String,
    pincode: String,
    city: String
  },
  specifications: {
    plotSize: Number,
    builtUpArea: Number,
    floors: Number,
    bedrooms: Number,
    bathrooms: Number,
    carParking: Number
  },
  quality: {
    structure: String,
    finishes: String,
    fittings: String
  },
  additionalFeatures: [String],
  costBreakdown: {
    baseCost: Number,
    structureCost: Number,
    finishesCost: Number,
    fittingsCost: Number,
    additionalFeaturesCost: Number,
    taxesAndFees: Number,
    totalCost: Number,
    costPerSqFt: Number
  },
  marketComparison: {
    areaAverage: Number,
    cityAverage: Number,
    percentageDifference: Number
  },
  timeline: {
    estimatedDuration: Number,
    phases: [{
      name: String,
      duration: Number,
      startMonth: Number,
      endMonth: Number
    }]
  },
  suggestions: [{
    category: String,
    suggestion: String,
    potentialSaving: Number
  }],
  status: String,
  validUntil: Date,
  viewedAt: Date,
  acceptedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const BlogPostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  image: String,
  published: Boolean,
  featured: Boolean,
  views: Number,
  readTime: Number,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const MaterialOrderSchema = new mongoose.Schema({
  orderId: String,
  customerId: mongoose.Schema.Types.ObjectId,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: [{
    materialId: mongoose.Schema.Types.ObjectId,
    material: {
      name: String,
      brand: String,
      model: String,
      image: String,
      unit: String
    },
    supplierId: mongoose.Schema.Types.ObjectId,
    supplierName: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    tax: Number,
    status: String,
    deliveryDate: Date,
    trackingNumber: String,
    notes: String
  }],
  pricing: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    discount: Number,
    total: Number
  },
  payment: {
    method: String,
    status: String,
    transactionId: String,
    paidAt: Date
  },
  addresses: {
    shipping: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      landmark: String
    },
    billing: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      landmark: String
    }
  },
  status: String,
  timeline: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  delivery: {
    type: String,
    estimatedDate: Date,
    actualDate: Date,
    slot: String,
    instructions: String
  },
  invoice: {
    number: String,
    generatedAt: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Create models
const User = mongoose.models.User || mongoose.model('User', UserSchema)
const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema)
const Material = mongoose.models.Material || mongoose.model('Material', MaterialSchema)
const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
const Estimate = mongoose.models.Estimate || mongoose.model('Estimate', EstimateSchema)
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
const MaterialOrder = mongoose.models.MaterialOrder || mongoose.model('MaterialOrder', MaterialOrderSchema)

// Sample data
async function generateUsers() {
  return [
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
    }
  ]
}

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
        validTo: new Date('2025-12-31')
      }
    ],
    establishedYear: 2003,
    deliveryAreas: [
      { area: 'Whitefield', pincode: '560066', deliveryCharge: 0, minOrderValue: 5000, estimatedDays: 1 },
      { area: 'Marathahalli', pincode: '560037', deliveryCharge: 500, minOrderValue: 5000, estimatedDays: 2 }
    ],
    paymentTerms: ['cash', 'online', 'credit'],
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
      { area: 'Indiranagar', pincode: '560038', deliveryCharge: 0, minOrderValue: 10000, estimatedDays: 1 }
    ],
    paymentTerms: ['online', 'cheque'],
    status: 'active'
  }
]

const materials = [
  {
    name: 'UltraTech Cement PPC 50kg',
    description: 'Premium Portland Pozzolana Cement for all construction needs.',
    category: { id: 'cement', name: 'Cement & Concrete' },
    subcategory: 'PPC Cement',
    brand: 'UltraTech',
    model: 'PPC 43 Grade',
    specifications: [
      { name: 'Grade', value: '43', unit: '' },
      { name: 'Weight', value: '50', unit: 'kg' }
    ],
    images: [{
      id: '1',
      url: 'https://images.unsplash.com/photo-1590241899810-fbaa593e0267?w=800',
      alt: 'UltraTech Cement',
      isPrimary: true,
      type: 'product'
    }],
    pricing: {
      basePrice: 380,
      unit: 'piece',
      currency: 'INR',
      bulkPricing: [
        { minQuantity: 50, maxQuantity: 99, pricePerUnit: 370 }
      ],
      gst: 28
    },
    availability: {
      inStock: true,
      quantity: 5000,
      leadTime: 1,
      minOrder: 10,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 15, 2: 5, 1: 4 }
    },
    tags: ['cement', 'ppc', 'construction'],
    certifications: ['ISI', 'BIS']
  },
  {
    name: 'TMT Steel Bars Fe 500 - 12mm',
    description: 'High strength TMT bars suitable for RCC construction.',
    category: { id: 'steel', name: 'Steel & Iron' },
    subcategory: 'TMT Bars',
    brand: 'TATA Steel',
    specifications: [
      { name: 'Diameter', value: '12', unit: 'mm' },
      { name: 'Grade', value: 'Fe 500', unit: '' }
    ],
    images: [{
      id: '1',
      url: 'https://images.unsplash.com/photo-1564520599123-3272b9ecfe23?w=800',
      alt: 'TMT Steel',
      isPrimary: true,
      type: 'product'
    }],
    pricing: {
      basePrice: 68,
      unit: 'kg',
      currency: 'INR',
      gst: 18
    },
    availability: {
      inStock: true,
      quantity: 50000,
      leadTime: 2,
      minOrder: 100,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.6,
      count: 312,
      distribution: { 5: 200, 4: 80, 3: 20, 2: 8, 1: 4 }
    },
    tags: ['steel', 'tmt', 'construction'],
    certifications: ['ISI', 'BIS']
  },
  {
    name: 'Red Clay Bricks - Standard',
    description: 'Traditional red clay bricks for construction.',
    category: { id: 'bricks', name: 'Bricks & Blocks' },
    subcategory: 'Clay Bricks',
    brand: 'Local',
    specifications: [
      { name: 'Size', value: '230x110x75', unit: 'mm' }
    ],
    images: [{
      id: '1',
      url: 'https://images.unsplash.com/photo-1606588260160-491c19c22e0f?w=800',
      alt: 'Red Bricks',
      isPrimary: true,
      type: 'product'
    }],
    pricing: {
      basePrice: 7,
      unit: 'piece',
      currency: 'INR',
      gst: 5
    },
    availability: {
      inStock: true,
      quantity: 100000,
      leadTime: 1,
      minOrder: 1000,
      warehouse: ['Whitefield']
    },
    ratings: {
      average: 4.2,
      count: 567,
      distribution: { 5: 250, 4: 200, 3: 80, 2: 25, 1: 12 }
    },
    tags: ['bricks', 'clay', 'construction'],
    certifications: ['ISI']
  },
  {
    name: 'Vitrified Floor Tiles 600x600mm',
    description: 'Premium vitrified tiles with nano polish finish.',
    category: { id: 'tiles', name: 'Tiles & Flooring' },
    subcategory: 'Vitrified Tiles',
    brand: 'Kajaria',
    specifications: [
      { name: 'Size', value: '600x600', unit: 'mm' },
      { name: 'Thickness', value: '10', unit: 'mm' }
    ],
    images: [{
      id: '1',
      url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800',
      alt: 'Vitrified Tiles',
      isPrimary: true,
      type: 'product'
    }],
    pricing: {
      basePrice: 85,
      unit: 'sqft',
      currency: 'INR',
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
    tags: ['tiles', 'vitrified', 'flooring'],
    certifications: ['ISI', 'CE']
  },
  {
    name: 'Asian Paints Apex Ultima',
    description: 'Premium exterior emulsion paint.',
    category: { id: 'paint', name: 'Paints & Finishes' },
    subcategory: 'Exterior Paint',
    brand: 'Asian Paints',
    specifications: [
      { name: 'Volume', value: '20', unit: 'liters' },
      { name: 'Coverage', value: '140-160', unit: 'sqft/liter' }
    ],
    images: [{
      id: '1',
      url: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?w=800',
      alt: 'Asian Paints',
      isPrimary: true,
      type: 'product'
    }],
    pricing: {
      basePrice: 8500,
      unit: 'piece',
      currency: 'INR',
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
      average: 4.7,
      count: 567,
      distribution: { 5: 400, 4: 120, 3: 30, 2: 12, 1: 5 }
    },
    tags: ['paint', 'exterior', 'emulsion'],
    certifications: ['Green Building', 'Low VOC']
  }
]

const leads = [
  {
    name: 'Amit Sharma',
    email: 'amit.sharma@email.com',
    phone: '+91 9876543220',
    projectType: 'Residential',
    budget: '50-75 Lakhs',
    timeline: '6-12 months',
    location: 'Whitefield, Bangalore',
    message: 'Looking to build a 3BHK villa',
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
    message: 'Need interior design for 2BHK',
    source: 'Quote Form',
    status: 'contacted',
    createdAt: new Date('2024-01-11')
  }
]

const blogPosts = [
  {
    title: '10 Modern Home Design Trends for 2024',
    slug: 'modern-home-design-trends-2024',
    excerpt: 'Discover the latest trends in modern home design.',
    content: '# 10 Modern Home Design Trends for 2024\n\nContent here...',
    author: 'Sahara Construction Team',
    category: 'Design Trends',
    tags: ['modern design', 'home trends', '2024'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
    published: true,
    featured: true,
    views: 1523,
    readTime: 5,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10')
  },
  {
    title: 'Complete Guide to Home Construction Costs',
    slug: 'home-construction-costs-guide',
    excerpt: 'A comprehensive breakdown of construction costs.',
    content: '# Complete Guide to Home Construction Costs\n\nContent here...',
    author: 'Sahara Construction Team',
    category: 'Construction Guide',
    tags: ['construction costs', 'budget planning'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    published: true,
    featured: true,
    views: 2847,
    readTime: 8,
    publishedAt: new Date('2024-01-08'),
    createdAt: new Date('2024-01-05')
  }
]

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
    const users = await generateUsers()
    const createdUsers = await User.create(users)
    console.log(`✓ Created ${createdUsers.length} users`)
    
    // Create suppliers
    console.log('Creating suppliers...')
    const createdSuppliers = await Supplier.create(suppliers)
    console.log(`✓ Created ${createdSuppliers.length} suppliers`)
    
    // Create materials
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
    
    // Create blog posts
    console.log('Creating blog posts...')
    const createdBlogPosts = await BlogPost.create(blogPosts)
    console.log(`✓ Created ${createdBlogPosts.length} blog posts`)
    
    // Create sample estimates
    console.log('Creating estimates...')
    const estimates = [
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
        additionalFeatures: ['modularKitchen', 'landscaping'],
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
            { name: 'Structure', duration: 6, startMonth: 3, endMonth: 8 }
          ]
        },
        status: 'sent',
        createdAt: new Date('2024-01-10')
      }
    ]
    const createdEstimates = await Estimate.create(estimates)
    console.log(`✓ Created ${createdEstimates.length} estimates`)
    
    // Create sample orders
    console.log('Creating material orders...')
    const orders = [
      {
        orderId: 'ORD-202401-ABC123',
        customerId: createdUsers[1]._id,
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh.kumar@example.com',
        customerPhone: '+91 9876543210',
        items: [{
          materialId: createdMaterials[0]._id,
          material: {
            name: materials[0].name,
            brand: materials[0].brand,
            unit: materials[0].pricing.unit
          },
          supplierId: createdSuppliers[0]._id,
          supplierName: suppliers[0].name,
          quantity: 100,
          unitPrice: 360,
          totalPrice: 36000,
          tax: 10080,
          status: 'delivered',
          deliveryDate: new Date('2024-01-25')
        }],
        pricing: {
          subtotal: 36000,
          tax: 10080,
          shipping: 500,
          discount: 0,
          total: 46580
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
            country: 'India'
          }
        },
        status: 'delivered',
        timeline: [
          { status: 'pending', timestamp: new Date('2024-01-20'), note: 'Order placed' },
          { status: 'delivered', timestamp: new Date('2024-01-25'), note: 'Delivered' }
        ],
        createdAt: new Date('2024-01-20')
      }
    ]
    const createdOrders = await MaterialOrder.create(orders)
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