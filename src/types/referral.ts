export interface Referral {
  id: string;
  referrerId: string;
  referrerType: 'Lead' | 'User' | 'Customer';
  
  referredEmail: string;
  referredId?: string;
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
    clickedAt?: Date | string;
    signedUpAt?: Date | string;
    qualifiedAt?: Date | string;
    convertedAt?: Date | string;
  };
  
  rewards: {
    referrerReward?: ReferralReward & { status: 'pending' | 'approved' | 'paid' | 'cancelled'; paidAt?: Date | string };
    referredReward?: ReferralReward & { status: 'pending' | 'approved' | 'applied' | 'cancelled'; appliedAt?: Date | string };
  };
  
  conversionDetails?: {
    projectId?: string;
    estimateId?: string;
    amount?: number;
    currency?: string;
    convertedAt?: Date | string;
  };
  
  expiresAt?: Date | string;
  notes?: string;
  
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ReferralReward {
  type: 'percentage' | 'fixed' | 'credit' | 'custom';
  value: number;
  currency?: string;
  description?: string;
}

export interface ReferralProgram {
  id: string;
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
        reward: ReferralReward;
      }[];
      defaultReward?: ReferralReward & {
        maxPerReferral?: number;
        maxTotal?: number;
      };
      milestone?: {
        referralsRequired: number;
        bonusReward: ReferralReward;
      }[];
    };
    referred: ReferralReward & {
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
    cookieDuration: number;
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
  
  startDate: Date | string;
  endDate?: Date | string;
  createdBy: string;
  lastModifiedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ReferralFormData {
  referredEmail: string;
  campaign?: {
    name: string;
    description?: string;
  };
  message?: string;
}

export interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  successfulReferrals: number;
  totalEarned: number;
  pendingRewards: number;
  referralRate: number;
  topReferrers: {
    id: string;
    name: string;
    email: string;
    referralCount: number;
    totalEarned: number;
  }[];
  recentActivity: {
    id: string;
    referrerName: string;
    referredEmail: string;
    status: Referral['status'];
    date: Date | string;
  }[];
}

export interface ReferralDashboard {
  myReferrals: Referral[];
  myStats: {
    totalReferrals: number;
    successfulReferrals: number;
    totalEarned: number;
    pendingRewards: number;
    nextMilestone?: {
      referralsNeeded: number;
      reward: ReferralReward;
    };
  };
  referralLink: string;
  referralCode: string;
  activeProgram?: ReferralProgram;
}