import { leadSchema, leadUpdateSchema } from '@/lib/validations/lead'

describe('Lead Validation', () => {
  describe('leadSchema', () => {
    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      interestedService: 'construction' as const,
      budget: '100k_250k' as const,
      timeline: '3_6_months' as const,
    }

    it('validates a correct lead object', () => {
      const result = leadSchema.safeParse(validLead)
      expect(result.success).toBe(true)
    })

    it('rejects lead with invalid email', () => {
      const invalidLead = { ...validLead, email: 'invalid-email' }
      const result = leadSchema.safeParse(invalidLead)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address')
      }
    })

    it('rejects lead with short name', () => {
      const invalidLead = { ...validLead, name: 'J' }
      const result = leadSchema.safeParse(invalidLead)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be at least 2 characters')
      }
    })

    it('rejects lead with short phone', () => {
      const invalidLead = { ...validLead, phone: '123' }
      const result = leadSchema.safeParse(invalidLead)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Phone must be at least 10 digits')
      }
    })

    it('rejects lead with invalid service', () => {
      const invalidLead = { ...validLead, interestedService: 'invalid-service' as any }
      const result = leadSchema.safeParse(invalidLead)
      expect(result.success).toBe(false)
    })

    it('accepts lead with optional fields', () => {
      const leadWithOptionals = {
        ...validLead,
        projectType: 'Residential Construction',
        notes: 'Customer is interested in eco-friendly materials',
        source: 'website' as const,
        priority: 'high' as const,
      }
      const result = leadSchema.safeParse(leadWithOptionals)
      expect(result.success).toBe(true)
    })
  })

  describe('leadUpdateSchema', () => {
    it('validates partial lead updates', () => {
      const partialUpdate = {
        status: 'qualified' as const,
        priority: 'urgent' as const,
      }
      const result = leadUpdateSchema.safeParse(partialUpdate)
      expect(result.success).toBe(true)
    })

    it('validates empty update object', () => {
      const result = leadUpdateSchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it('rejects invalid field values in updates', () => {
      const invalidUpdate = {
        email: 'invalid-email',
      }
      const result = leadUpdateSchema.safeParse(invalidUpdate)
      expect(result.success).toBe(false)
    })
  })
})