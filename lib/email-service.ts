import { resend, EMAIL_CONFIG } from '@/src/lib/resend'
import { ContactFormEmail } from '@/src/emails/contact-form-email'
import { QuoteRequestEmail } from '@/src/emails/quote-request-email'
import { render } from '@react-email/render'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  source?: string
}

export interface QuoteFormData {
  name: string
  email: string
  phone: string
  projectType: string
  propertyType?: string
  area?: number
  location: string
  budget: {
    min: number
    max: number
  }
  timeline: string
  requirements?: string
  estimatedCost?: number
}

export class EmailService {
  private static formatPhoneNumber(phone?: string): string {
    if (!phone) return ''
    // Clean and format phone number
    const cleaned = phone.replace(/[^\d]/g, '')
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }
    return phone
  }

  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  static async sendContactFormNotification(formData: ContactFormData): Promise<boolean> {
    if (!resend) {
      console.warn('Email service not configured. Contact form notification not sent.')
      return false
    }

    try {
      const emailHtml = await render(ContactFormEmail({
        name: formData.name,
        email: formData.email,
        phone: this.formatPhoneNumber(formData.phone),
        message: formData.message,
        submittedAt: new Date().toISOString()
      }))

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.notificationEmails,
        replyTo: formData.email,
        subject: `New Contact Form: ${formData.subject || formData.name}`,
        html: emailHtml
      })

      console.log('Contact form notification sent successfully')
      return true
    } catch (error) {
      console.error('Failed to send contact form notification:', error)
      return false
    }
  }

  static async sendContactConfirmation(formData: ContactFormData): Promise<boolean> {
    if (!resend) {
      console.warn('Email service not configured. Contact confirmation not sent.')
      return false
    }

    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: formData.email,
        subject: 'Thank you for contacting Sahara Developers',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Thank You for Reaching Out!</h1>
              <p style="color: #666; font-size: 16px;">We've received your message and will get back to you soon.</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">Your Message Details:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
              ${formData.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${this.formatPhoneNumber(formData.phone)}</p>` : ''}
              <p style="margin: 15px 0 5px 0;"><strong>Message:</strong></p>
              <p style="color: #555; line-height: 1.5;">${formData.message}</p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
              <p style="color: #666; margin-bottom: 15px;">Our team typically responds within 30 minutes during business hours.</p>
              <p style="color: #666; margin-bottom: 15px;">For urgent inquiries, please call us at <a href="tel:+919591837216" style="color: #2563eb;">+91 95918 37216</a></p>
              <p style="color: #888; font-size: 14px;">Sahara Developers - Building Dreams, Creating Spaces</p>
            </div>
          </div>
        `
      })

      console.log('Contact confirmation sent successfully')
      return true
    } catch (error) {
      console.error('Failed to send contact confirmation:', error)
      return false
    }
  }

  static async sendQuoteRequestNotification(formData: QuoteFormData): Promise<boolean> {
    if (!resend) {
      console.warn('Email service not configured. Quote request notification not sent.')
      return false
    }

    try {
      const emailHtml = await render(QuoteRequestEmail({
        name: formData.name,
        email: formData.email,
        phone: this.formatPhoneNumber(formData.phone),
        projectType: formData.projectType,
        budget: `${this.formatCurrency(formData.budget.min)} - ${this.formatCurrency(formData.budget.max)}`,
        timeline: formData.timeline,
        location: formData.location,
        requirements: formData.requirements || '',
        referralSource: 'Website Quote Form',
        submittedAt: new Date().toISOString()
      }))

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.notificationEmails,
        replyTo: formData.email,
        subject: `New Quote Request: ${formData.projectType} - ${formData.name}`,
        html: emailHtml
      })

      console.log('Quote request notification sent successfully')
      return true
    } catch (error) {
      console.error('Failed to send quote request notification:', error)
      return false
    }
  }

  static async sendQuoteConfirmation(formData: QuoteFormData): Promise<boolean> {
    if (!resend) {
      console.warn('Email service not configured. Quote confirmation not sent.')
      return false
    }

    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: formData.email,
        subject: 'Quote Request Received - Sahara Developers',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Quote Request Received!</h1>
              <p style="color: #666; font-size: 16px;">Thank you for choosing Sahara Developers. Our team will prepare your detailed quote.</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">Project Details:</h3>
              <p style="margin: 5px 0;"><strong>Project Type:</strong> ${formData.projectType}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${formData.location}</p>
              ${formData.area ? `<p style="margin: 5px 0;"><strong>Area:</strong> ${formData.area} sq ft</p>` : ''}
              <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${this.formatCurrency(formData.budget.min)} - ${this.formatCurrency(formData.budget.max)}</p>
              <p style="margin: 5px 0;"><strong>Timeline:</strong> ${formData.timeline}</p>
              ${formData.estimatedCost ? `<p style="margin: 5px 0;"><strong>Estimated Cost:</strong> ${this.formatCurrency(formData.estimatedCost)}</p>` : ''}
            </div>
            
            <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #0277bd; margin-bottom: 15px;">What Happens Next?</h3>
              <ol style="color: #333; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our project manager will review your requirements (within 2-4 hours)</li>
                <li style="margin-bottom: 8px;">We'll schedule a consultation call to understand your vision</li>
                <li style="margin-bottom: 8px;">Site visit and measurements (if required)</li>
                <li style="margin-bottom: 8px;">Detailed quote with timeline and specifications</li>
              </ol>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
              <p style="color: #666; margin-bottom: 15px;">Expected response time: <strong>2-4 hours</strong></p>
              <p style="color: #666; margin-bottom: 15px;">For immediate assistance, call us at <a href="tel:+919591837216" style="color: #2563eb;">+91 95918 37216</a></p>
              <p style="color: #888; font-size: 14px;">Sahara Developers - Building Dreams, Creating Spaces</p>
            </div>
          </div>
        `
      })

      console.log('Quote confirmation sent successfully')
      return true
    } catch (error) {
      console.error('Failed to send quote confirmation:', error)
      return false
    }
  }

  // Utility method to send both notification and confirmation emails
  static async sendContactEmails(formData: ContactFormData): Promise<{ notificationSent: boolean; confirmationSent: boolean }> {
    const [notificationSent, confirmationSent] = await Promise.all([
      this.sendContactFormNotification(formData),
      this.sendContactConfirmation(formData)
    ])

    return { notificationSent, confirmationSent }
  }

  static async sendQuoteEmails(formData: QuoteFormData): Promise<{ notificationSent: boolean; confirmationSent: boolean }> {
    const [notificationSent, confirmationSent] = await Promise.all([
      this.sendQuoteRequestNotification(formData),
      this.sendQuoteConfirmation(formData)
    ])

    return { notificationSent, confirmationSent }
  }
}