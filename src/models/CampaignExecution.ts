import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaignExecution extends Document {
  campaignId: mongoose.Types.ObjectId;
  recipientId: mongoose.Types.ObjectId;
  recipientType: 'Lead' | 'User';
  variantId?: string;
  
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'converted' | 'bounced' | 'failed' | 'unsubscribed';
  
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  convertedAt?: Date;
  bouncedAt?: Date;
  unsubscribedAt?: Date;
  
  clicks: {
    url: string;
    clickedAt: Date;
  }[];
  
  conversionValue?: number;
  
  error?: {
    message: string;
    code?: string;
    timestamp: Date;
  };
  
  metadata?: {
    emailMessageId?: string;
    smsMessageId?: string;
    deviceToken?: string;
    ipAddress?: string;
    userAgent?: string;
    location?: {
      country?: string;
      region?: string;
      city?: string;
    };
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const CampaignExecutionSchema = new Schema<ICampaignExecution>({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  recipientId: { type: Schema.Types.ObjectId, required: true },
  recipientType: { type: String, enum: ['Lead', 'User'], required: true },
  variantId: String,
  
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'opened', 'clicked', 'converted', 'bounced', 'failed', 'unsubscribed'],
    default: 'pending',
    required: true
  },
  
  sentAt: Date,
  deliveredAt: Date,
  openedAt: Date,
  clickedAt: Date,
  convertedAt: Date,
  bouncedAt: Date,
  unsubscribedAt: Date,
  
  clicks: [{
    url: String,
    clickedAt: Date
  }],
  
  conversionValue: Number,
  
  error: {
    message: String,
    code: String,
    timestamp: Date
  },
  
  metadata: {
    emailMessageId: String,
    smsMessageId: String,
    deviceToken: String,
    ipAddress: String,
    userAgent: String,
    location: {
      country: String,
      region: String,
      city: String
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
CampaignExecutionSchema.index({ campaignId: 1, status: 1 });
CampaignExecutionSchema.index({ recipientId: 1, recipientType: 1 });
CampaignExecutionSchema.index({ sentAt: 1 });
CampaignExecutionSchema.index({ status: 1, createdAt: 1 });

// Compound index for finding unique executions
CampaignExecutionSchema.index({ campaignId: 1, recipientId: 1, variantId: 1 }, { unique: true });

const CampaignExecution = (mongoose.models.CampaignExecution as mongoose.Model<ICampaignExecution>) || mongoose.model<ICampaignExecution>('CampaignExecution', CampaignExecutionSchema);

export default CampaignExecution;