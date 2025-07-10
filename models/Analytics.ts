import mongoose, { Schema, Document } from 'mongoose'

export interface IAnalytics extends Document {
  // Date tracking
  date: Date
  
  // Website metrics
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  
  // Lead metrics
  totalLeads: number
  qualifiedLeads: number
  convertedLeads: number
  conversionRate: number
  
  // Quote metrics
  quotesRequested: number
  quotesApproved: number
  quoteConversionRate: number
  
  // Revenue metrics
  revenue: number
  avgProjectValue: number
  
  // Traffic sources
  organicTraffic: number
  paidTraffic: number
  socialTraffic: number
  directTraffic: number
  referralTraffic: number
  
  // Device breakdown
  mobileUsers: number
  desktopUsers: number
  tabletUsers: number
  
  // Geographic data
  topCities: Array<{
    city: string
    count: number
  }>
  
  // Popular content
  topPages: Array<{
    path: string
    views: number
  }>
  
  // Marketing campaigns
  campaignData: Array<{
    name: string
    impressions: number
    clicks: number
    conversions: number
    cost: number
  }>
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

const AnalyticsSchema = new Schema<IAnalytics>({
  // Date tracking
  date: { type: Date, required: true, unique: true },
  
  // Website metrics
  pageViews: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  bounceRate: { type: Number, default: 0, min: 0, max: 100 },
  avgSessionDuration: { type: Number, default: 0 },
  
  // Lead metrics
  totalLeads: { type: Number, default: 0 },
  qualifiedLeads: { type: Number, default: 0 },
  convertedLeads: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0, min: 0, max: 100 },
  
  // Quote metrics
  quotesRequested: { type: Number, default: 0 },
  quotesApproved: { type: Number, default: 0 },
  quoteConversionRate: { type: Number, default: 0, min: 0, max: 100 },
  
  // Revenue metrics
  revenue: { type: Number, default: 0 },
  avgProjectValue: { type: Number, default: 0 },
  
  // Traffic sources
  organicTraffic: { type: Number, default: 0 },
  paidTraffic: { type: Number, default: 0 },
  socialTraffic: { type: Number, default: 0 },
  directTraffic: { type: Number, default: 0 },
  referralTraffic: { type: Number, default: 0 },
  
  // Device breakdown
  mobileUsers: { type: Number, default: 0 },
  desktopUsers: { type: Number, default: 0 },
  tabletUsers: { type: Number, default: 0 },
  
  // Geographic data
  topCities: [{
    city: { type: String, required: true },
    count: { type: Number, required: true }
  }],
  
  // Popular content
  topPages: [{
    path: { type: String, required: true },
    views: { type: Number, required: true }
  }],
  
  // Marketing campaigns
  campaignData: [{
    name: { type: String, required: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    cost: { type: Number, default: 0 }
  }],
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Indexes
AnalyticsSchema.index({ date: -1 })
AnalyticsSchema.index({ createdAt: -1 })

// Calculate conversion rate before saving
AnalyticsSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // Calculate conversion rate
  if (this.totalLeads > 0) {
    this.conversionRate = (this.convertedLeads / this.totalLeads) * 100
  }
  
  // Calculate quote conversion rate
  if (this.quotesRequested > 0) {
    this.quoteConversionRate = (this.quotesApproved / this.quotesRequested) * 100
  }
  
  next()
})

const Analytics = (mongoose.models.Analytics as mongoose.Model<IAnalytics>) || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;