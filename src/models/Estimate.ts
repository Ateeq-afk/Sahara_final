import mongoose from 'mongoose'

const EstimateSchema = new mongoose.Schema({
  // Customer Information
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  
  // Project Details
  projectType: {
    type: String,
    enum: ['construction', 'interior', 'renovation'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'industrial'],
    required: true
  },
  
  // Location Details
  location: {
    area: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: 'Bangalore'
    }
  },
  
  // Project Specifications
  specifications: {
    plotSize: {
      type: Number,
      required: true
    },
    builtUpArea: {
      type: Number,
      required: true
    },
    floors: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    carParking: {
      type: Number,
      default: 0
    }
  },
  
  // Quality and Finishes
  quality: {
    structure: {
      type: String,
      enum: ['economy', 'standard', 'premium', 'luxury'],
      required: true
    },
    finishes: {
      type: String,
      enum: ['economy', 'standard', 'premium', 'luxury'],
      required: true
    },
    fittings: {
      type: String,
      enum: ['economy', 'standard', 'premium', 'luxury'],
      required: true
    }
  },
  
  // Additional Features
  additionalFeatures: [{
    type: String,
    enum: [
      'swimmingPool',
      'homeAutomation',
      'solarPower',
      'landscaping',
      'elevatorLift',
      'modularKitchen',
      'homeTheater',
      'gym',
      'terraceDeck',
      'interiorDesign'
    ]
  }],
  
  // Cost Breakdown
  costBreakdown: {
    baseCost: {
      type: Number,
      required: true
    },
    structureCost: {
      type: Number,
      required: true
    },
    finishesCost: {
      type: Number,
      required: true
    },
    fittingsCost: {
      type: Number,
      required: true
    },
    additionalFeaturesCost: {
      type: Number,
      default: 0
    },
    taxesAndFees: {
      type: Number,
      required: true
    },
    totalCost: {
      type: Number,
      required: true
    },
    costPerSqFt: {
      type: Number,
      required: true
    }
  },
  
  // Market Comparison
  marketComparison: {
    areaAverage: {
      type: Number,
      required: true
    },
    cityAverage: {
      type: Number,
      required: true
    },
    percentageDifference: {
      type: Number,
      required: true
    }
  },
  
  // Timeline
  timeline: {
    estimatedDuration: {
      type: Number, // in months
      required: true
    },
    phases: [{
      name: String,
      duration: Number,
      startMonth: Number,
      endMonth: Number
    }]
  },
  
  // Smart Suggestions
  suggestions: [{
    category: String,
    suggestion: String,
    potentialSaving: Number
  }],
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'],
    default: 'draft'
  },
  
  // Validity
  validUntil: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  },
  
  // Tracking
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  viewedAt: Date,
  acceptedAt: Date,
  rejectedAt: Date,
  
  // Notes
  customerNotes: String,
  internalNotes: String
})

EstimateSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Estimate = (mongoose.models.Estimate as mongoose.Model<any>) || mongoose.model('Estimate', EstimateSchema);

export default Estimate;