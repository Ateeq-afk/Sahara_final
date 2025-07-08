import mongoose, { Schema, Document } from 'mongoose'

export interface ILead extends Document {
  // Contact Information
  name: string
  email: string
  phone: string
  
  // Lead Details
  source: 'website' | 'referral' | 'social_media' | 'google_ads' | 'facebook_ads' | 'direct' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  // Interest
  interestedService: 'construction' | 'interior' | 'renovation' | 'consultation'
  budget: {
    min: number
    max: number
  }
  timeline: string
  
  // Communication
  notes: string[]
  lastContactDate: Date
  nextFollowUpDate: Date
  
  // Assignment
  assignedTo: string
  
  // Conversion
  convertedToQuote: boolean
  quoteId?: string
  
  // Metadata
  tags: string[]
  customFields: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>({
  // Contact Information
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  
  // Lead Details
  source: { 
    type: String, 
    enum: ['website', 'referral', 'social_media', 'google_ads', 'facebook_ads', 'direct', 'other'],
    default: 'website'
  },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost'],
    default: 'new'
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Interest
  interestedService: { 
    type: String, 
    enum: ['construction', 'interior', 'renovation', 'consultation'],
    required: true
  },
  budget: {
    min: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 0 }
  },
  timeline: { type: String, required: true },
  
  // Communication
  notes: [{ type: String }],
  lastContactDate: { type: Date },
  nextFollowUpDate: { type: Date },
  
  // Assignment
  assignedTo: { type: String, default: 'Unassigned' },
  
  // Conversion
  convertedToQuote: { type: Boolean, default: false },
  quoteId: { type: String },
  
  // Metadata
  tags: [{ type: String }],
  customFields: { type: Map, of: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Indexes for performance
LeadSchema.index({ email: 1 })
LeadSchema.index({ status: 1 })
LeadSchema.index({ priority: 1 })
LeadSchema.index({ source: 1 })
LeadSchema.index({ createdAt: -1 })
LeadSchema.index({ assignedTo: 1 })

// Update timestamp on save
LeadSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Virtual for full name
LeadSchema.virtual('displayName').get(function() {
  return this.name
})

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

export default Lead