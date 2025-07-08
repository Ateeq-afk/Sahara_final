import mongoose, { Schema, Document } from 'mongoose';

export interface IReferralProgram extends Document {
  name: string;
  description?: string;
  status: 'active' | 'paused' | 'ended';
  
  eligibility: {
    referrerTypes: ('Lead' | 'User' | 'Customer')[];
    minimumProjects?: number;
    minimumSpend?: number;
    requiresApproval?: boolean;
  };
  
  rewards: {
    referrer: {
      type: 'percentage' | 'fixed' | 'credit' | 'tiered' | 'custom';
      tiers?: {
        minReferrals: number;
        maxReferrals?: number;
        reward: {
          type: 'percentage' | 'fixed' | 'credit';
          value: number;
          currency?: string;
        };
      }[];
      defaultReward?: {
        type: 'percentage' | 'fixed' | 'credit';
        value: number;
        currency?: string;
        maxPerReferral?: number;
        maxTotal?: number;
      };
      milestone?: {
        referralsRequired: number;
        bonusReward: {
          type: 'percentage' | 'fixed' | 'credit';
          value: number;
          currency?: string;
        };
      }[];
    };
    referred: {
      type: 'percentage' | 'fixed' | 'credit' | 'custom';
      value: number;
      currency?: string;
      description?: string;
      validityDays?: number;
    };
  };
  
  terms: {
    minimumPurchase?: number;
    validityDays?: number;
    maxReferralsPerUser?: number;
    qualificationCriteria?: {
      type: 'signup' | 'first_purchase' | 'minimum_spend' | 'project_completion';
      minimumSpend?: number;
      daysToQualify?: number;
    };
    excludedServices?: string[];
    geographicRestrictions?: string[];
  };
  
  tracking: {
    cookieDuration: number; // in days
    attributionModel: 'first_touch' | 'last_touch' | 'linear';
  };
  
  communication: {
    referrerEmailTemplate?: string;
    referredEmailTemplate?: string;
    reminderSchedule?: {
      daysAfterReferral: number;
      maxReminders: number;
    };
  };
  
  metrics: {
    totalReferrals: number;
    successfulReferrals: number;
    totalRevenueGenerated: number;
    totalRewardsPaid: number;
    conversionRate: number;
    averageOrderValue: number;
  };
  
  startDate: Date;
  endDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  lastModifiedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReferralProgramSchema = new Schema<IReferralProgram>({
  name: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['active', 'paused', 'ended'],
    default: 'active',
    required: true
  },
  
  eligibility: {
    referrerTypes: [{
      type: String,
      enum: ['Lead', 'User', 'Customer']
    }],
    minimumProjects: Number,
    minimumSpend: Number,
    requiresApproval: { type: Boolean, default: false }
  },
  
  rewards: {
    referrer: {
      type: {
        type: String,
        enum: ['percentage', 'fixed', 'credit', 'tiered', 'custom'],
        required: true
      },
      tiers: [{
        minReferrals: Number,
        maxReferrals: Number,
        reward: {
          type: { type: String, enum: ['percentage', 'fixed', 'credit'] },
          value: Number,
          currency: String
        }
      }],
      defaultReward: {
        type: { type: String, enum: ['percentage', 'fixed', 'credit'] },
        value: Number,
        currency: String,
        maxPerReferral: Number,
        maxTotal: Number
      },
      milestone: [{
        referralsRequired: Number,
        bonusReward: {
          type: { type: String, enum: ['percentage', 'fixed', 'credit'] },
          value: Number,
          currency: String
        }
      }]
    },
    referred: {
      type: { 
        type: String, 
        enum: ['percentage', 'fixed', 'credit', 'custom'],
        required: true
      },
      value: Number,
      currency: String,
      description: String,
      validityDays: Number
    }
  },
  
  terms: {
    minimumPurchase: Number,
    validityDays: Number,
    maxReferralsPerUser: Number,
    qualificationCriteria: {
      type: { 
        type: String, 
        enum: ['signup', 'first_purchase', 'minimum_spend', 'project_completion']
      },
      minimumSpend: Number,
      daysToQualify: Number
    },
    excludedServices: [String],
    geographicRestrictions: [String]
  },
  
  tracking: {
    cookieDuration: { type: Number, default: 30 },
    attributionModel: { 
      type: String, 
      enum: ['first_touch', 'last_touch', 'linear'],
      default: 'first_touch'
    }
  },
  
  communication: {
    referrerEmailTemplate: String,
    referredEmailTemplate: String,
    reminderSchedule: {
      daysAfterReferral: Number,
      maxReminders: Number
    }
  },
  
  metrics: {
    totalReferrals: { type: Number, default: 0 },
    successfulReferrals: { type: Number, default: 0 },
    totalRevenueGenerated: { type: Number, default: 0 },
    totalRewardsPaid: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 }
  },
  
  startDate: { type: Date, required: true },
  endDate: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

// Indexes for performance
ReferralProgramSchema.index({ status: 1, startDate: 1, endDate: 1 });
ReferralProgramSchema.index({ createdBy: 1 });

// Method to check if program is currently active
ReferralProgramSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'active' && 
         this.startDate <= now && 
         (!this.endDate || this.endDate >= now);
};

export default mongoose.models.ReferralProgram || mongoose.model<IReferralProgram>('ReferralProgram', ReferralProgramSchema);