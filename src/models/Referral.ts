import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  referrerType: 'Lead' | 'User' | 'Customer';
  
  referredEmail: string;
  referredId?: mongoose.Types.ObjectId;
  referredType?: 'Lead' | 'User' | 'Customer';
  
  status: 'pending' | 'clicked' | 'signed_up' | 'qualified' | 'converted' | 'expired' | 'cancelled';
  
  referralCode: string;
  referralLink: string;
  
  campaign?: {
    name: string;
    description?: string;
  };
  
  metadata: {
    source?: string;
    medium?: string;
    campaign?: string;
    landingPage?: string;
    ipAddress?: string;
    userAgent?: string;
  };
  
  milestones: {
    clickedAt?: Date;
    signedUpAt?: Date;
    qualifiedAt?: Date;
    convertedAt?: Date;
  };
  
  rewards: {
    referrerReward?: {
      type: 'percentage' | 'fixed' | 'credit' | 'custom';
      value: number;
      currency?: string;
      description?: string;
      status: 'pending' | 'approved' | 'paid' | 'cancelled';
      paidAt?: Date;
    };
    referredReward?: {
      type: 'percentage' | 'fixed' | 'credit' | 'custom';
      value: number;
      currency?: string;
      description?: string;
      status: 'pending' | 'approved' | 'applied' | 'cancelled';
      appliedAt?: Date;
    };
  };
  
  conversionDetails?: {
    projectId?: mongoose.Types.ObjectId;
    estimateId?: mongoose.Types.ObjectId;
    amount?: number;
    currency?: string;
    convertedAt?: Date;
  };
  
  expiresAt?: Date;
  notes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrerId: { type: Schema.Types.ObjectId, required: true },
  referrerType: { type: String, enum: ['Lead', 'User', 'Customer'], required: true },
  
  referredEmail: { type: String, required: true, lowercase: true },
  referredId: { type: Schema.Types.ObjectId },
  referredType: { type: String, enum: ['Lead', 'User', 'Customer'] },
  
  status: {
    type: String,
    enum: ['pending', 'clicked', 'signed_up', 'qualified', 'converted', 'expired', 'cancelled'],
    default: 'pending',
    required: true
  },
  
  referralCode: { 
    type: String, 
    required: true, 
    unique: true,
    index: true
  },
  referralLink: { type: String, required: true },
  
  campaign: {
    name: String,
    description: String
  },
  
  metadata: {
    source: String,
    medium: String,
    campaign: String,
    landingPage: String,
    ipAddress: String,
    userAgent: String
  },
  
  milestones: {
    clickedAt: Date,
    signedUpAt: Date,
    qualifiedAt: Date,
    convertedAt: Date
  },
  
  rewards: {
    referrerReward: {
      type: { type: String, enum: ['percentage', 'fixed', 'credit', 'custom'] },
      value: Number,
      currency: String,
      description: String,
      status: { 
        type: String, 
        enum: ['pending', 'approved', 'paid', 'cancelled'],
        default: 'pending'
      },
      paidAt: Date
    },
    referredReward: {
      type: { type: String, enum: ['percentage', 'fixed', 'credit', 'custom'] },
      value: Number,
      currency: String,
      description: String,
      status: { 
        type: String, 
        enum: ['pending', 'approved', 'applied', 'cancelled'],
        default: 'pending'
      },
      appliedAt: Date
    }
  },
  
  conversionDetails: {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    estimateId: { type: Schema.Types.ObjectId, ref: 'Estimate' },
    amount: Number,
    currency: String,
    convertedAt: Date
  },
  
  expiresAt: Date,
  notes: String
}, {
  timestamps: true
});

// Indexes for performance
ReferralSchema.index({ referrerId: 1, status: 1 });
ReferralSchema.index({ referredEmail: 1 });
ReferralSchema.index({ referredId: 1 });
ReferralSchema.index({ status: 1, createdAt: -1 });
ReferralSchema.index({ 'rewards.referrerReward.status': 1 });
ReferralSchema.index({ expiresAt: 1 });

// Generate unique referral code
ReferralSchema.pre('save', async function(next) {
  if (!this.referralCode) {
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    
    let code = generateCode();
    let exists = await mongoose.models.Referral.findOne({ referralCode: code });
    
    while (exists) {
      code = generateCode();
      exists = await mongoose.models.Referral.findOne({ referralCode: code });
    }
    
    this.referralCode = code;
  }
  
  if (!this.referralLink && this.referralCode) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    this.referralLink = `${baseUrl}/ref/${this.referralCode}`;
  }
  
  next();
});

const Referral = (mongoose.models.Referral as mongoose.Model<IReferral>) || mongoose.model<IReferral>('Referral', ReferralSchema);

export default Referral;