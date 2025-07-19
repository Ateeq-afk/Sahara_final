// Form validation utilities for contact and quote forms

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface ContactFormData {
  name: string
  email?: string
  phone: string
  subject?: string
  message: string
}

export interface QuoteFormData {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  budget?: string
  timeline?: string
  [key: string]: any
}

export class FormValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  private static phoneRegex = /^(\+91)?[6-9]\d{9}$/
  private static nameRegex = /^[a-zA-Z\s]+$/

  static validateName(name: string): string | null {
    if (!name || name.trim().length === 0) {
      return 'Name is required'
    }
    
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long'
    }
    
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters'
    }
    
    if (!this.nameRegex.test(name.trim())) {
      return 'Name can only contain letters and spaces'
    }
    
    return null
  }

  static validateEmail(email: string): string | null {
    if (!email || email.trim().length === 0) {
      return 'Email is required'
    }
    
    if (!this.emailRegex.test(email.trim())) {
      return 'Please enter a valid email address'
    }
    
    if (email.length > 100) {
      return 'Email must be less than 100 characters'
    }
    
    return null
  }

  static validatePhone(phone: string): string | null {
    if (!phone || phone.trim().length === 0) {
      return 'Phone number is required'
    }
    
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    
    // Check if it matches Indian phone number format
    if (!this.phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid Indian phone number (10 digits starting with 6-9)'
    }
    
    return null
  }

  static validateMessage(message: string, minLength = 5, maxLength = 2000): string | null {
    if (!message || message.trim().length === 0) {
      return 'Message is required'
    }
    
    if (message.trim().length < minLength) {
      return `Message must be at least ${minLength} characters long`
    }
    
    if (message.trim().length > maxLength) {
      return `Message must be less than ${maxLength} characters`
    }
    
    return null
  }

  static validateLocation(location: string): string | null {
    if (!location || location.trim().length === 0) {
      return 'Location is required'
    }
    
    if (location.trim().length < 2) {
      return 'Location must be at least 2 characters long'
    }
    
    if (location.trim().length > 100) {
      return 'Location must be less than 100 characters'
    }
    
    return null
  }

  static sanitizeString(str: string): string {
    if (!str) return ''
    
    return str
      .trim()
      .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
  }

  static sanitizePhone(phone: string): string {
    if (!phone) return ''
    
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '')
    
    // If it starts with +91, keep it, otherwise add +91 if it's 10 digits
    if (cleaned.startsWith('+91')) {
      return cleaned
    } else if (cleaned.length === 10) {
      return `+91${cleaned}`
    }
    
    return cleaned
  }

  static validateContactForm(data: ContactFormData): ValidationResult {
    const errors: Record<string, string> = {}

    const nameError = this.validateName(data.name)
    if (nameError) errors.name = nameError

    if (data.email) {
      const emailError = this.validateEmail(data.email)
      if (emailError) errors.email = emailError
    }

    const phoneError = this.validatePhone(data.phone)
    if (phoneError) errors.phone = phoneError

    const messageError = this.validateMessage(data.message)
    if (messageError) errors.message = messageError

    if (data.subject && data.subject.length > 200) {
      errors.subject = 'Subject must be less than 200 characters'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  static validateQuoteForm(data: QuoteFormData): ValidationResult {
    const errors: Record<string, string> = {}

    const nameError = this.validateName(data.name)
    if (nameError) errors.name = nameError

    const emailError = this.validateEmail(data.email)
    if (emailError) errors.email = emailError

    const phoneError = this.validatePhone(data.phone)
    if (phoneError) errors.phone = phoneError

    const locationError = this.validateLocation(data.location)
    if (locationError) errors.location = locationError

    if (!data.projectType) {
      errors.projectType = 'Project type is required'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  static sanitizeContactForm(data: ContactFormData): ContactFormData {
    return {
      name: this.sanitizeString(data.name),
      email: data.email ? this.sanitizeString(data.email) : undefined,
      phone: this.sanitizePhone(data.phone),
      subject: data.subject ? this.sanitizeString(data.subject) : undefined,
      message: this.sanitizeString(data.message)
    }
  }

  static sanitizeQuoteForm(data: QuoteFormData): QuoteFormData {
    return {
      ...data,
      name: this.sanitizeString(data.name),
      email: this.sanitizeString(data.email),
      phone: this.sanitizePhone(data.phone),
      location: this.sanitizeString(data.location),
      projectType: this.sanitizeString(data.projectType)
    }
  }

  // Rate limiting helper (simple in-memory implementation)
  private static submissionCounts = new Map<string, { count: number; lastReset: number }>()
  private static readonly MAX_SUBMISSIONS_PER_HOUR = 5
  private static readonly HOUR_IN_MS = 60 * 60 * 1000

  static checkRateLimit(identifier: string): boolean {
    const now = Date.now()
    const existing = this.submissionCounts.get(identifier)

    if (!existing) {
      this.submissionCounts.set(identifier, { count: 1, lastReset: now })
      return true
    }

    // Reset counter if an hour has passed
    if (now - existing.lastReset > this.HOUR_IN_MS) {
      this.submissionCounts.set(identifier, { count: 1, lastReset: now })
      return true
    }

    // Check if under limit
    if (existing.count < this.MAX_SUBMISSIONS_PER_HOUR) {
      existing.count++
      return true
    }

    return false
  }
}