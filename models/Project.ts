import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  // Basic Info
  projectId: string
  name: string
  client: {
    name: string
    email: string
    phone: string
  }
  
  // Project Details
  type: 'construction' | 'interior' | 'renovation'
  category: 'residential' | 'commercial'
  location: {
    address: string
    area: string
    city: string
    pincode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  
  // Specifications
  area: number
  floors?: number
  units?: number
  
  // Timeline
  startDate: Date
  expectedEndDate: Date
  actualEndDate?: Date
  
  // Budget
  estimatedBudget: number
  actualCost?: number
  
  // Status
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled'
  phase: string
  completionPercentage: number
  
  // Team
  projectManager: string
  architect?: string
  team: string[]
  
  // Media
  images: {
    url: string
    caption?: string
    phase: string
    uploadedAt: Date
  }[]
  documents: {
    name: string
    url: string
    type: string
    uploadedAt: Date
  }[]
  
  // Showcase
  featured: boolean
  showcase: boolean
  testimonial?: string
  
  // Metadata
  tags: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>({
  projectId: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return `PRJ-${Date.now().toString(36).toUpperCase()}`
    }
  },
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  client: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  
  // Project Details
  type: {
    type: String,
    enum: ['construction', 'interior', 'renovation'],
    required: true
  },
  category: {
    type: String,
    enum: ['residential', 'commercial'],
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: 'Bangalore'
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  
  // Specifications
  area: {
    type: Number,
    required: true,
    min: 100
  },
  floors: Number,
  units: Number,
  
  // Timeline
  startDate: {
    type: Date,
    required: true
  },
  expectedEndDate: {
    type: Date,
    required: true
  },
  actualEndDate: Date,
  
  // Budget
  estimatedBudget: {
    type: Number,
    required: true,
    min: 0
  },
  actualCost: {
    type: Number,
    min: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold', 'cancelled'],
    default: 'planning'
  },
  phase: {
    type: String,
    default: 'Initial Planning'
  },
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Team
  projectManager: {
    type: String,
    required: true
  },
  architect: String,
  team: [String],
  
  // Media
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    phase: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  documents: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Showcase
  featured: {
    type: Boolean,
    default: false
  },
  showcase: {
    type: Boolean,
    default: false
  },
  testimonial: String,
  
  // Metadata
  tags: [String],
  notes: String
}, {
  timestamps: true
})

// Indexes
ProjectSchema.index({ projectId: 1 })
ProjectSchema.index({ 'client.email': 1 })
ProjectSchema.index({ status: 1 })
ProjectSchema.index({ featured: 1 })
ProjectSchema.index({ showcase: 1 })
ProjectSchema.index({ createdAt: -1 })

// Virtual for duration
ProjectSchema.virtual('duration').get(function() {
  const end = this.actualEndDate || this.expectedEndDate
  const duration = Math.ceil((end.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24))
  return duration
})

// Method to update completion percentage
ProjectSchema.methods.updateProgress = function(percentage: number, phase?: string) {
  this.completionPercentage = Math.min(100, Math.max(0, percentage))
  if (phase) {
    this.phase = phase
  }
  if (this.completionPercentage === 100 && this.status === 'in-progress') {
    this.status = 'completed'
    this.actualEndDate = new Date()
  }
  return this.save()
}

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)