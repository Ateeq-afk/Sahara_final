import mongoose from 'mongoose'

export interface ISupportTicket {
  _id: string
  ticketId: string
  userId: string
  userEmail: string
  userName: string
  name: string
  email: string
  phone: string
  projectId?: string
  priority: 'low' | 'medium' | 'high'
  category: 'general' | 'project' | 'billing' | 'technical'
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  assignedTo?: string
  attachments?: string[]
  responses?: {
    message: string
    author: string
    authorType: 'customer' | 'support'
    timestamp: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

const SupportTicketSchema = new mongoose.Schema<ISupportTicket>({
  ticketId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['general', 'project', 'billing', 'technical'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    required: true,
    default: 'open'
  },
  assignedTo: {
    type: String,
    required: false
  },
  attachments: [{
    type: String
  }],
  responses: [{
    message: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    authorType: {
      type: String,
      enum: ['customer', 'support'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

// Generate ticket ID before saving
SupportTicketSchema.pre('save', function(next) {
  if (!this.ticketId) {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    this.ticketId = `ST-${timestamp}-${random}`.toUpperCase()
  }
  next()
})

// Indexes for better performance
SupportTicketSchema.index({ userId: 1, status: 1 })
SupportTicketSchema.index({ userEmail: 1 })
SupportTicketSchema.index({ priority: 1, status: 1 })
SupportTicketSchema.index({ category: 1 })
SupportTicketSchema.index({ createdAt: -1 })

export default mongoose.models.SupportTicket || mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema)