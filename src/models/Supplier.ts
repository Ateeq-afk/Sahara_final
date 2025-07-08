import mongoose from 'mongoose'

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  logo: String,
  description: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationDate: Date,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    whatsapp: String,
    address: {
      street: {
        type: String,
        required: true
      },
      area: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        default: 'India'
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    website: String
  },
  categories: [{
    type: String,
    index: true
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    validFrom: Date,
    validTo: Date,
    documentUrl: String
  }],
  establishedYear: {
    type: Number,
    required: true
  },
  deliveryAreas: [{
    area: String,
    pincode: String,
    deliveryCharge: Number,
    minOrderValue: Number,
    estimatedDays: Number
  }],
  paymentTerms: [{
    type: String,
    enum: ['cash', 'credit', 'advance', 'cod', 'online', 'cheque']
  }],
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
    registrationType: {
      type: String,
      enum: ['proprietorship', 'partnership', 'llp', 'pvtltd', 'ltd']
    }
  },
  performance: {
    totalOrders: {
      type: Number,
      default: 0
    },
    completedOrders: {
      type: Number,
      default: 0
    },
    cancelledOrders: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageDeliveryTime: {
      type: Number,
      default: 0
    },
    onTimeDeliveryRate: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    minOrderValue: Number,
    maxOrderValue: Number,
    workingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String }
    },
    holidays: [Date],
    leadTime: {
      type: Number,
      default: 2
    },
    bulkDiscounts: [{
      minQuantity: Number,
      discountPercentage: Number
    }]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  },
  suspensionReason: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: Date
})

SupplierSchema.index({ 'contact.address.city': 1, 'contact.address.pincode': 1 })
SupplierSchema.index({ categories: 1 })
SupplierSchema.index({ verified: 1, status: 1 })
SupplierSchema.index({ rating: -1 })

SupplierSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

SupplierSchema.methods.updatePerformance = async function(orderData: any) {
  if (orderData.status === 'completed') {
    this.performance.completedOrders += 1
    this.performance.totalRevenue += orderData.total
    
    if (orderData.deliveryTime) {
      const totalDeliveryTime = this.performance.averageDeliveryTime * (this.performance.completedOrders - 1)
      this.performance.averageDeliveryTime = (totalDeliveryTime + orderData.deliveryTime) / this.performance.completedOrders
    }
    
    if (orderData.wasOnTime) {
      const onTimeOrders = this.performance.onTimeDeliveryRate * (this.performance.completedOrders - 1) / 100
      this.performance.onTimeDeliveryRate = ((onTimeOrders + 1) / this.performance.completedOrders) * 100
    }
  } else if (orderData.status === 'cancelled') {
    this.performance.cancelledOrders += 1
  }
  
  this.performance.totalOrders += 1
  await this.save()
}

SupplierSchema.methods.canDeliver = function(pincode: any) {
  if (!this.deliveryAreas || this.deliveryAreas.length === 0) {
    return { canDeliver: true, charge: 0, estimatedDays: this.preferences.leadTime }
  }
  
  const deliveryArea = this.deliveryAreas.find((area: any) => area.pincode === pincode)
  
  if (deliveryArea) {
    return {
      canDeliver: true,
      charge: deliveryArea.deliveryCharge,
      minOrderValue: deliveryArea.minOrderValue,
      estimatedDays: deliveryArea.estimatedDays
    }
  }
  
  return { canDeliver: false }
}

SupplierSchema.methods.isWorkingNow = function() {
  const now = new Date()
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()]
  const currentTime = now.toTimeString().slice(0, 5)
  
  const workingHours = this.preferences.workingHours[dayOfWeek]
  
  if (!workingHours || !workingHours.open || !workingHours.close) {
    return true
  }
  
  return currentTime >= workingHours.open && currentTime <= workingHours.close
}

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema)
export default Supplier