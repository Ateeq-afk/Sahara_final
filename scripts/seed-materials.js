import mongoose from 'mongoose'
import Material from '../src/models/Material.js'
import Supplier from '../src/models/Supplier.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/construction'

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
    tags: ['blocks', 'aac', 'lightweight', 'eco-friendly'],
    certifications: ['ISI', 'Green Building']
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
    tags: ['tiles', 'vitrified', 'flooring', 'kajaria'],
    certifications: ['ISI', 'CE']
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
    tags: ['flooring', 'laminate', 'wooden', 'oak'],
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
    tags: ['paint', 'exterior', 'emulsion', 'asian-paints'],
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
    tags: ['paint', 'interior', 'silk', 'berger'],
    certifications: ['Low VOC', 'Anti-bacterial']
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