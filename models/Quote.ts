import mongoose, { Schema, Document } from 'mongoose'

export interface IQuote extends Document {
  // Contact Information
  name: string
  email: string
  phone: string
  
  // Project Details
  projectType: 'construction' | 'interior' | 'renovation' | 'consultation'
  propertyType: 'apartment' | 'villa' | 'commercial' | 'other'
  area: number
  location: string
  budget: {
    min: number
    max: number
  }
  
  // Timeline
  expectedStartDate: Date
  urgency: 'immediate' | '1-3months' | '3-6months' | 'planning'
  
  // Additional Details
  requirements: string
  referralSource: string
  
  // Admin Fields
  status: 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed'
  assignedTo?: string
  notes?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  
  // Methods
  getEstimatedCost(): number
}

const QuoteSchema = new Schema<IQuote>({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  
  // Project Details
  projectType: {
    type: String,
    enum: ['construction', 'interior', 'renovation', 'consultation'],
    required: [true, 'Project type is required']
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'villa', 'commercial', 'other'],
    required: [true, 'Property type is required']
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [100, 'Minimum area should be 100 sq ft']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  budget: {
    min: {
      type: Number,
      required: [true, 'Minimum budget is required'],
      min: [100000, 'Minimum budget should be ₹1,00,000']
    },
    max: {
      type: Number,
      required: [true, 'Maximum budget is required'],
      validate: {
        validator: function(this: IQuote, value: number) {
          return value >= this.budget.min
        },
        message: 'Maximum budget should be greater than minimum budget'
      }
    }
  },
  
  // Timeline
  expectedStartDate: {
    type: Date,
    required: [true, 'Expected start date is required']
  },
  urgency: {
    type: String,
    enum: ['immediate', '1-3months', '3-6months', 'planning'],
    default: '1-3months'
  },
  
  // Additional Details
  requirements: {
    type: String,
    maxlength: [2000, 'Requirements should not exceed 2000 characters']
  },
  referralSource: {
    type: String,
    default: 'website'
  },
  
  // Admin Fields
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
})

// Indexes for better query performance
QuoteSchema.index({ email: 1 })
QuoteSchema.index({ phone: 1 })
QuoteSchema.index({ status: 1 })
QuoteSchema.index({ createdAt: -1 })

// Virtual for budget range
QuoteSchema.virtual('budgetRange').get(function() {
  return `₹${this.budget.min.toLocaleString('en-IN')} - ₹${this.budget.max.toLocaleString('en-IN')}`
})

// Method to calculate estimated project cost
QuoteSchema.methods.getEstimatedCost = function() {
  const ratePerSqFt = {
    construction: { apartment: 1800, villa: 2200, commercial: 1600, other: 2000 },
    interior: { apartment: 800, villa: 1200, commercial: 700, other: 1000 },
    renovation: { apartment: 1200, villa: 1500, commercial: 1000, other: 1300 },
    consultation: { apartment: 50, villa: 50, commercial: 50, other: 50 }
  }
  
  const rate = ratePerSqFt[this.projectType]?.[this.propertyType] || 1500
  return this.area * rate
}

const Quote = (mongoose.models.Quote as mongoose.Model<IQuote>) || mongoose.model<IQuote>('Quote', QuoteSchema);

export default Quote;