export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  
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
  
  triggers: {
    type: 'immediate' | 'scheduled' | 'event-based' | 'project-stage';
    schedule?: {
      startDate: Date | string;
      endDate?: Date | string;
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
  
  content: {
    subject?: string;
    previewText?: string;
    body: string;
    template?: string;
    personalization?: {
      useDynamicContent: boolean;
      fields: string[];
    };
  };
  
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
  
  variants?: CampaignVariant[];
  
  createdBy: string;
  lastModifiedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CampaignVariant {
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
}

export interface CampaignExecution {
  id: string;
  campaignId: string;
  recipientId: string;
  recipientType: 'Lead' | 'User';
  variantId?: string;
  
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'converted' | 'bounced' | 'failed' | 'unsubscribed';
  
  sentAt?: Date | string;
  deliveredAt?: Date | string;
  openedAt?: Date | string;
  clickedAt?: Date | string;
  convertedAt?: Date | string;
  bouncedAt?: Date | string;
  unsubscribedAt?: Date | string;
  
  clicks: {
    url: string;
    clickedAt: Date | string;
  }[];
  
  conversionValue?: number;
  
  error?: {
    message: string;
    code?: string;
    timestamp: Date | string;
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
  
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CampaignFormData {
  name: string;
  description?: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  targetAudience: {
    segments: string[];
    filters: Partial<Campaign['targetAudience']['filters']>;
  };
  triggers: Partial<Campaign['triggers']>;
  content: Partial<Campaign['content']>;
  variants?: Partial<CampaignVariant>[];
}

export interface CampaignAnalytics {
  campaignId: string;
  period: 'day' | 'week' | 'month' | 'all';
  metrics: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    unsubscribeRate: number;
    bounceRate: number;
    roi: number;
  };
  timeline: {
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
  }[];
  topLinks: {
    url: string;
    clicks: number;
    uniqueClicks: number;
  }[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  locationStats: {
    country: string;
    opens: number;
    clicks: number;
  }[];
}