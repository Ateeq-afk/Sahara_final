import { z } from 'zod'

// Common validation patterns
const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
const emailDomain = z.string().email('Please enter a valid email address')
const phoneNumber = z.string().regex(phoneRegex, 'Please enter a valid phone number')
const requiredString = z.string().min(1, 'This field is required')
const optionalString = z.string().optional()

// Quote Form Schema
export const quoteFormSchema = z.object({
  // Service Selection
  service: requiredString,
  propertyType: requiredString,
  
  // Property Details
  size: requiredString,
  floors: requiredString,
  rooms: requiredString,
  bathrooms: requiredString,
  
  // Style and Budget
  style: requiredString,
  budget: requiredString,
  timeline: requiredString,
  
  // Personal Details
  name: requiredString,
  email: emailDomain,
  phone: phoneNumber,
  
  // Additional Requirements
  additionalRequirements: optionalString,
  
  // Location
  location: requiredString,
  
  // Special Features
  features: z.array(z.string()).optional(),
})

// Contact Form Schema
export const contactFormSchema = z.object({
  name: requiredString,
  email: emailDomain,
  phone: phoneNumber,
  subject: requiredString,
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  service: optionalString,
  budget: optionalString,
})

// Support Ticket Schema
export const supportTicketSchema = z.object({
  name: requiredString,
  email: emailDomain,
  phone: phoneNumber,
  projectId: optionalString,
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['general', 'technical', 'billing', 'project']),
  subject: requiredString,
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  attachments: z.array(z.string()).optional(),
})

// Lead Magnet Schema
export const leadMagnetSchema = z.object({
  name: requiredString,
  email: emailDomain,
  phone: phoneNumber,
  interestedService: optionalString,
  source: optionalString,
})


// WhatsApp Widget Schema
export const whatsappWidgetSchema = z.object({
  name: requiredString,
  phone: phoneNumber,
  message: optionalString,
})

// CRM Project Creation Schema
export const projectCreationSchema = z.object({
  name: requiredString,
  customerId: requiredString,
  type: z.enum(['residential', 'commercial', 'renovation', 'interior']),
  status: z.enum(['planning', 'approved', 'in_progress', 'on_hold', 'completed', 'cancelled']),
  description: z.string().min(20, 'Please provide a detailed description'),
  
  // Timeline
  startDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Please enter a valid date'),
  estimatedEndDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Please enter a valid date'),
  
  // Budget
  estimatedBudget: z.number().positive('Budget must be a positive number'),
  
  // Location
  location: z.object({
    address: requiredString,
    city: requiredString,
    state: requiredString,
    pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  
  // Team
  projectManager: optionalString,
  architect: optionalString,
  contractor: optionalString,
  
  // Additional Details
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()).optional(),
  notes: optionalString,
})

// Campaign Creation Schema
export const campaignCreationSchema = z.object({
  name: requiredString,
  type: z.enum(['email', 'sms', 'push', 'social']),
  status: z.enum(['draft', 'scheduled', 'active', 'paused', 'completed']),
  
  // Content
  subject: requiredString,
  content: z.string().min(50, 'Content must be at least 50 characters long'),
  
  // Targeting
  targetAudience: z.enum(['all', 'leads', 'customers', 'custom']),
  segmentIds: z.array(z.string()).optional(),
  
  // Scheduling
  scheduleType: z.enum(['immediate', 'scheduled', 'recurring']),
  scheduledAt: z.string().optional(),
  
  // A/B Testing
  isABTest: z.boolean().default(false),
  abTestContent: optionalString,
  
  // Tracking
  trackingEnabled: z.boolean().default(true),
  utmSource: optionalString,
  utmMedium: optionalString,
  utmCampaign: optionalString,
})

// Login Schema
export const loginSchema = z.object({
  email: emailDomain,
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  rememberMe: z.boolean().optional(),
})

// Registration Schema
export const registrationSchema = z.object({
  name: requiredString,
  email: emailDomain,
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'customer']).default('customer'),
  phone: phoneNumber,
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Profile Update Schema
export const profileUpdateSchema = z.object({
  name: requiredString,
  email: emailDomain,
  phone: phoneNumber,
  avatar: optionalString,
  bio: optionalString,
  
  // Preferences
  notifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    push: z.boolean().default(true),
  }).optional(),
  
  // Address
  address: z.object({
    street: optionalString,
    city: optionalString,
    state: optionalString,
    pincode: z.string().regex(/^\d{6}$/, 'Please enter a valid 6-digit pincode').optional(),
  }).optional(),
})

// Cost Calculator Schema
export const costCalculatorSchema = z.object({
  projectType: z.enum(['residential', 'commercial', 'renovation']),
  propertyType: z.enum(['apartment', 'villa', 'office', 'retail', 'warehouse']),
  area: z.number().positive('Area must be a positive number'),
  floors: z.number().int().positive('Number of floors must be a positive integer'),
  qualityLevel: z.enum(['basic', 'standard', 'premium', 'luxury']),
  location: requiredString,
  
  // Additional features
  features: z.array(z.enum([
    'swimming_pool',
    'garden',
    'parking',
    'elevator',
    'security',
    'gym',
    'clubhouse',
    'solar_panels',
    'rainwater_harvesting',
    'smart_home',
  ])).optional(),
  
  // Contact info for quote
  contactInfo: z.object({
    name: requiredString,
    email: emailDomain,
    phone: phoneNumber,
  }).optional(),
})

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: emailDomain,
  name: optionalString,
  interests: z.array(z.string()).optional(),
})

// Feedback Schema
export const feedbackSchema = z.object({
  name: requiredString,
  email: emailDomain,
  rating: z.number().min(1).max(5),
  category: z.enum(['website', 'service', 'support', 'product', 'other']),
  message: z.string().min(20, 'Please provide detailed feedback'),
  wouldRecommend: z.boolean().optional(),
})

// Export all schemas with their types
export type QuoteFormData = z.infer<typeof quoteFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
export type SupportTicketData = z.infer<typeof supportTicketSchema>
export type LeadMagnetData = z.infer<typeof leadMagnetSchema>
export type WhatsappWidgetData = z.infer<typeof whatsappWidgetSchema>
export type ProjectCreationData = z.infer<typeof projectCreationSchema>
export type CampaignCreationData = z.infer<typeof campaignCreationSchema>
export type LoginData = z.infer<typeof loginSchema>
export type RegistrationData = z.infer<typeof registrationSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type CostCalculatorData = z.infer<typeof costCalculatorSchema>
export type NewsletterData = z.infer<typeof newsletterSchema>
export type FeedbackData = z.infer<typeof feedbackSchema>

// Form validation helper
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: Record<string, string> } => {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach(err => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: 'Validation failed' } }
  }
}