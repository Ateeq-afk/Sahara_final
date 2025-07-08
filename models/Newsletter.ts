import mongoose, { Schema, Document } from 'mongoose'

export interface INewsletter extends Document {
  email: string
  name?: string
  preferences: {
    projectUpdates: boolean
    designTips: boolean
    offers: boolean
  }
  status: 'active' | 'unsubscribed'
  unsubscribedAt?: Date
  source: string
  createdAt: Date
  updatedAt: Date
}

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    trim: true
  },
  preferences: {
    projectUpdates: {
      type: Boolean,
      default: true
    },
    designTips: {
      type: Boolean,
      default: true
    },
    offers: {
      type: Boolean,
      default: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  unsubscribedAt: Date,
  source: {
    type: String,
    default: 'website-footer'
  }
}, {
  timestamps: true
})

// Indexes
NewsletterSchema.index({ email: 1 })
NewsletterSchema.index({ status: 1 })

// Method to unsubscribe
NewsletterSchema.methods.unsubscribe = function() {
  this.status = 'unsubscribed'
  this.unsubscribedAt = new Date()
  return this.save()
}

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema)