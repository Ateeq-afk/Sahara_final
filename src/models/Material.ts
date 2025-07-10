import mongoose from 'mongoose'

const MaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    id: String,
    name: String,
    parentId: String,
    icon: String,
    description: String
  },
  subcategory: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
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
    type: {
      type: String,
      enum: ['product', 'technical', 'installation']
    }
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['piece', 'sqft', 'sqm', 'kg', 'ton', 'liter', 'cum'],
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    bulkPricing: [{
      minQuantity: Number,
      maxQuantity: Number,
      pricePerUnit: Number
    }],
    gst: {
      type: Number,
      default: 18
    },
    discounts: [{
      type: {
        type: String,
        enum: ['percentage', 'fixed']
      },
      value: Number,
      validFrom: Date,
      validTo: Date,
      code: String
    }]
  },
  availability: {
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    leadTime: Number,
    minOrder: {
      type: Number,
      default: 1
    },
    maxOrder: Number,
    warehouse: [String]
  },
  supplier: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true
    },
    name: String,
    logo: String,
    description: String,
    verified: Boolean,
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
    certifications: [String],
    establishedYear: Number,
    deliveryAreas: [String],
    paymentTerms: [String]
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  reviews: [{
    userId: String,
    userName: String,
    rating: Number,
    title: String,
    comment: String,
    verified: Boolean,
    helpful: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [String],
  certifications: [String],
  searchKeywords: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

MaterialSchema.index({ name: 'text', description: 'text', tags: 'text', searchKeywords: 'text' })
MaterialSchema.index({ 'category.id': 1, 'pricing.basePrice': 1 })
MaterialSchema.index({ 'supplier.id': 1 })
MaterialSchema.index({ 'ratings.average': -1 })

MaterialSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  if (this.isNew || this.isModified('name') || this.isModified('description') || this.isModified('brand')) {
    this.searchKeywords = [
      this.name,
      this.brand,
      this.category?.name,
      this.subcategory,
      ...this.tags,
      ...(this.specifications || []).map(spec => spec.value)
    ].filter(Boolean).map(keyword => keyword?.toLowerCase()).filter(Boolean) as string[]
  }
  
  next()
})

MaterialSchema.methods.calculatePrice = function(quantity: number) {
  let unitPrice = this.pricing.basePrice
  
  if (this.pricing.bulkPricing && this.pricing.bulkPricing.length > 0) {
    const applicableBulk = this.pricing.bulkPricing
      .filter((bulk: any) => quantity >= bulk.minQuantity && (!bulk.maxQuantity || quantity <= bulk.maxQuantity))
      .sort((a: any, b: any) => b.minQuantity - a.minQuantity)[0]
    
    if (applicableBulk) {
      unitPrice = applicableBulk.pricePerUnit
    }
  }
  
  const subtotal = unitPrice * quantity
  const tax = subtotal * (this.pricing.gst / 100)
  const total = subtotal + tax
  
  return {
    unitPrice,
    subtotal,
    tax,
    total
  }
}

MaterialSchema.methods.checkAvailability = function(quantity: number) {
  if (!this.availability.inStock) {
    return {
      available: false,
      message: 'Out of stock'
    }
  }
  
  if (quantity < this.availability.minOrder) {
    return {
      available: false,
      message: `Minimum order quantity is ${this.availability.minOrder} ${this.pricing.unit}`
    }
  }
  
  if (this.availability.maxOrder && quantity > this.availability.maxOrder) {
    return {
      available: false,
      message: `Maximum order quantity is ${this.availability.maxOrder} ${this.pricing.unit}`
    }
  }
  
  if (this.availability.quantity < quantity) {
    return {
      available: false,
      message: `Only ${this.availability.quantity} ${this.pricing.unit} available`
    }
  }
  
  return {
    available: true,
    leadTime: this.availability.leadTime
  }
}

const Material = (mongoose.models.Material as mongoose.Model<any>) || mongoose.model('Material', MaterialSchema);

export default Material;