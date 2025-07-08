import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  source: string
  status: 'new' | 'read' | 'responded' | 'closed'
  respondedAt?: Date
  responseNotes?: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>({
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
    validate: {
      validator: function(v: string) {
        // Remove all non-numeric characters for validation
        const cleaned = v.replace(/[^\d]/g, '');
        // Accept 10-digit Indian numbers or 12-digit with +91
        return /^([6-9]\d{9}|91[6-9]\d{9})$/.test(cleaned);
      },
      message: 'Please enter a valid phone number'
    },
    set: function(v: string) {
      // Clean and normalize phone number
      return v.replace(/[^\d+]/g, '');
    }
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject should not exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message should not exceed 2000 characters']
  },
  source: {
    type: String,
    default: 'contact-form'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'closed'],
    default: 'new'
  },
  respondedAt: {
    type: Date
  },
  responseNotes: {
    type: String
  }
}, {
  timestamps: true
})

// Indexes
ContactSchema.index({ email: 1 })
ContactSchema.index({ status: 1 })
ContactSchema.index({ createdAt: -1 })

// Method to mark as read
ContactSchema.methods.markAsRead = function() {
  if (this.status === 'new') {
    this.status = 'read'
    return this.save()
  }
  return Promise.resolve(this)
}

// Method to mark as responded
ContactSchema.methods.markAsResponded = function(notes?: string) {
  this.status = 'responded'
  this.respondedAt = new Date()
  if (notes) {
    this.responseNotes = notes
  }
  return this.save()
}

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)