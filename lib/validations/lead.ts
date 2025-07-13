import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  interestedService: z.enum([
    'construction',
    'remodeling',
    'consulting',
    'project_management',
    'design_build',
    'maintenance'
  ]),
  budget: z.enum(['below_50k', '50k_100k', '100k_250k', '250k_500k', 'above_500k']),
  timeline: z.enum(['immediate', '1_3_months', '3_6_months', '6_12_months', 'above_12_months']),
  projectType: z.string().optional(),
  projectAddress: z.string().optional(),
  notes: z.string().optional(),
  source: z.enum(['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'walk_in', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost']).optional()
})

export const leadUpdateSchema = leadSchema.partial()

export type LeadInput = z.infer<typeof leadSchema>
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>