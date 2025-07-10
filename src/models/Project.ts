import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  projectNumber: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', 'renovation', 'interior'],
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'approved', 'in_progress', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    email: String,
    phone: String
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  },
  address: {
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  timeline: {
    startDate: {
      type: Date,
      required: true
    },
    estimatedEndDate: {
      type: Date,
      required: true
    },
    actualEndDate: Date,
    milestones: [{
      name: String,
      description: String,
      dueDate: Date,
      completedDate: Date,
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'delayed'],
        default: 'pending'
      },
      dependencies: [String],
      assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }]
  },
  budget: {
    estimated: {
      type: Number,
      required: true
    },
    approved: Number,
    spent: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    breakdown: [{
      category: String,
      description: String,
      estimated: Number,
      actual: Number,
      variance: Number
    }]
  },
  team: {
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    architect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    siteEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: String,
      permissions: [String],
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  phases: [{
    name: String,
    description: String,
    order: Number,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    tasks: [{
      name: String,
      description: String,
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      dueDate: Date,
      completedDate: Date,
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'blocked'],
        default: 'pending'
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      },
      checklist: [{
        item: String,
        completed: Boolean
      }]
    }],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }],
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['contract', 'permit', 'drawing', 'invoice', 'report', 'other']
    },
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    version: Number,
    tags: [String]
  }],
  materials: [{
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material'
    },
    quantity: Number,
    unit: String,
    estimatedCost: Number,
    actualCost: Number,
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier'
    },
    orderedDate: Date,
    deliveredDate: Date,
    status: {
      type: String,
      enum: ['planned', 'ordered', 'delivered', 'used'],
      default: 'planned'
    }
  }],
  equipment: [{
    name: String,
    type: String,
    quantity: Number,
    rentedFrom: String,
    dailyRate: Number,
    totalCost: Number,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['reserved', 'on_site', 'returned'],
      default: 'reserved'
    }
  }],
  inspections: [{
    type: String,
    scheduledDate: Date,
    completedDate: Date,
    inspector: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'failed', 'passed'],
      default: 'scheduled'
    },
    notes: String,
    documents: [String]
  }],
  dailyLogs: [{
    date: {
      type: Date,
      required: true
    },
    weather: {
      condition: String,
      temperature: Number,
      impact: String
    },
    workCompleted: String,
    issues: String,
    manpower: {
      present: Number,
      absent: Number,
      details: String
    },
    materials: [{
      name: String,
      quantity: Number,
      unit: String
    }],
    photos: [{
      url: String,
      caption: String,
      location: String
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  risks: [{
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    probability: {
      type: String,
      enum: ['unlikely', 'possible', 'likely', 'certain'],
      default: 'possible'
    },
    impact: String,
    mitigation: String,
    status: {
      type: String,
      enum: ['identified', 'mitigated', 'occurred', 'resolved'],
      default: 'identified'
    },
    identifiedDate: Date,
    resolvedDate: Date
  }],
  changeOrders: [{
    number: String,
    description: String,
    reason: String,
    requestedBy: String,
    requestedDate: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'implemented'],
      default: 'pending'
    },
    costImpact: Number,
    scheduleImpact: Number,
    documents: [String]
  }],
  payments: [{
    type: {
      type: String,
      enum: ['advance', 'milestone', 'material', 'labor', 'final'],
      required: true
    },
    amount: Number,
    date: Date,
    method: String,
    reference: String,
    milestone: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    invoice: String
  }],
  quality: {
    standards: [String],
    checkpoints: [{
      phase: String,
      criteria: String,
      checked: Boolean,
      checkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      checkedDate: Date,
      status: {
        type: String,
        enum: ['pending', 'passed', 'failed'],
        default: 'pending'
      },
      notes: String
    }],
    defects: [{
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'major', 'critical'],
        default: 'minor'
      },
      location: String,
      identifiedDate: Date,
      identifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      resolvedDate: Date,
      resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved', 'closed'],
        default: 'open'
      },
      photos: [String]
    }]
  },
  safety: {
    incidents: [{
      date: Date,
      type: String,
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'severe', 'fatal'],
        default: 'minor'
      },
      peopleInvolved: [String],
      actionTaken: String,
      reportedTo: [String],
      preventiveMeasures: String
    }],
    trainings: [{
      topic: String,
      date: Date,
      duration: Number,
      attendees: Number,
      trainer: String,
      certificate: String
    }],
    equipment: [{
      name: String,
      lastInspection: Date,
      nextInspection: Date,
      status: {
        type: String,
        enum: ['safe', 'needs_repair', 'condemned'],
        default: 'safe'
      }
    }]
  },
  communications: [{
    type: {
      type: String,
      enum: ['email', 'meeting', 'call', 'site_visit', 'document'],
      required: true
    },
    subject: String,
    summary: String,
    participants: [String],
    date: Date,
    attachments: [String],
    actionItems: [{
      task: String,
      assignedTo: String,
      dueDate: Date,
      completed: Boolean
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  completionCertificate: {
    issued: Boolean,
    issuedDate: Date,
    number: String,
    document: String
  },
  warranty: {
    startDate: Date,
    endDate: Date,
    terms: String,
    claims: [{
      date: Date,
      issue: String,
      status: {
        type: String,
        enum: ['reported', 'in_progress', 'resolved', 'rejected'],
        default: 'reported'
      },
      resolvedDate: Date,
      cost: Number
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes for better performance
ProjectSchema.index({ 'customer.id': 1 })
ProjectSchema.index({ status: 1 })
ProjectSchema.index({ 'timeline.startDate': 1 })
ProjectSchema.index({ projectNumber: 1 })
ProjectSchema.index({ 'team.projectManager': 1 })

// Virtual for project progress
ProjectSchema.virtual('overallProgress').get(function() {
  if (!this.phases || this.phases.length === 0) return 0
  const totalProgress = this.phases.reduce((sum, phase) => sum + (phase.progress || 0), 0)
  return Math.round(totalProgress / this.phases.length)
})

// Virtual for budget variance
ProjectSchema.virtual('budgetVariance').get(function() {
  return this.budget.approved - this.budget.spent
})

// Virtual for schedule variance
ProjectSchema.virtual('scheduleVariance').get(function() {
  if (!this.timeline.estimatedEndDate) return 0
  const estimated = new Date(this.timeline.estimatedEndDate).getTime()
  const actual = this.timeline.actualEndDate ? new Date(this.timeline.actualEndDate).getTime() : Date.now()
  return Math.floor((estimated - actual) / (1000 * 60 * 60 * 24)) // Days
})

const Project = (mongoose.models.Project as mongoose.Model<any>) || mongoose.model('Project', ProjectSchema);

export default Project;