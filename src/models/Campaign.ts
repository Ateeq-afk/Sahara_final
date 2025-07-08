import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description?: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  
  // Targeting
  targetAudience: {
    segments: string[];
    filters: {
      projectStage?: string[];
      leadScore?: { min?: number; max?: number };
      tags?: string[];
      location?: string[];
      lastActivity?: { within: number; unit: 'days' | 'weeks' | 'months' };
    };
  };
  
  // Trigger conditions for automated campaigns
  triggers: {
    type: 'immediate' | 'scheduled' | 'event-based' | 'project-stage';
    schedule?: {
      startDate: Date;
      endDate?: Date;
      timezone: string;
      recurringPattern?: 'none' | 'daily' | 'weekly' | 'monthly';
    };
    events?: {
      eventType: 'project_created' | 'project_updated' | 'lead_scored' | 'estimate_sent' | 'custom';
      conditions?: any;
    };
    projectStages?: {
      fromStage?: string;
      toStage: string;
      delayDays?: number;
    };
  };
  
  // Content
  content: {
    subject?: string; // For email
    previewText?: string; // For email
    body: string;
    template?: string;
    personalization?: {
      useDynamicContent: boolean;
      fields: string[];
    };
  };
  
  // Performance metrics
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    unsubscribed: number;
    bounced: number;
    revenue: number;
  };
  
  // A/B Testing
  variants?: {
    name: string;
    subject?: string;
    content?: string;
    percentage: number;
    metrics: {
      sent: number;
      opened: number;
      clicked: number;
      converted: number;
    };
  }[];
  
  createdBy: mongoose.Types.ObjectId;
  lastModifiedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>({
  name: { type: String, required: true },
  description: String,
  type: { 
    type: String, 
    enum: ['email', 'sms', 'push', 'in-app'],
    default: 'email',
    required: true 
  },
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'],
    default: 'draft',
    required: true 
  },
  
  targetAudience: {
    segments: [String],
    filters: {
      projectStage: [String],
      leadScore: {
        min: Number,
        max: Number
      },
      tags: [String],
      location: [String],
      lastActivity: {
        within: Number,
        unit: { type: String, enum: ['days', 'weeks', 'months'] }
      }
    }
  },
  
  triggers: {
    type: { 
      type: String, 
      enum: ['immediate', 'scheduled', 'event-based', 'project-stage'],
      required: true 
    },
    schedule: {
      startDate: Date,
      endDate: Date,
      timezone: { type: String, default: 'UTC' },
      recurringPattern: { 
        type: String, 
        enum: ['none', 'daily', 'weekly', 'monthly'],
        default: 'none'
      }
    },
    events: {
      eventType: { 
        type: String, 
        enum: ['project_created', 'project_updated', 'lead_scored', 'estimate_sent', 'custom']
      },
      conditions: Schema.Types.Mixed
    },
    projectStages: {
      fromStage: String,
      toStage: String,
      delayDays: { type: Number, default: 0 }
    }
  },
  
  content: {
    subject: String,
    previewText: String,
    body: { type: String, required: true },
    template: String,
    personalization: {
      useDynamicContent: { type: Boolean, default: false },
      fields: [String]
    }
  },
  
  metrics: {
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
    converted: { type: Number, default: 0 },
    unsubscribed: { type: Number, default: 0 },
    bounced: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  
  variants: [{
    name: String,
    subject: String,
    content: String,
    percentage: Number,
    metrics: {
      sent: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      converted: { type: Number, default: 0 }
    }
  }],
  
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

// Indexes for performance
CampaignSchema.index({ status: 1, 'triggers.type': 1 });
CampaignSchema.index({ 'triggers.schedule.startDate': 1 });
CampaignSchema.index({ createdBy: 1 });

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema);