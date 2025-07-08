import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    const mailOptions = {
      from: from || process.env.SMTP_FROM || 'noreply@saharadevelopers.com',
      to,
      subject,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Template for quote notification
export function createQuoteNotificationEmail({
  name,
  phone,
  email,
  serviceType,
  source,
  timestamp,
  priority = 'normal'
}: {
  name: string
  phone: string
  email?: string
  serviceType: string
  source: string
  timestamp: string
  priority?: 'normal' | 'high' | 'urgent'
}) {
  const priorityColors = {
    normal: '#28a745',
    high: '#ffc107',
    urgent: '#dc3545'
  }

  const priorityLabels = {
    normal: 'Normal',
    high: 'High Priority',
    urgent: 'URGENT'
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: ${priorityColors[priority]}; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">
          ${priority === 'urgent' ? '🚨 ' : ''}${priorityLabels[priority]} Lead
        </h2>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
        <h3 style="margin-top: 0; color: #333;">New Quote Request</h3>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:+91${phone}" style="color: #007bff; text-decoration: none;">+91 ${phone}</a>
              </td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Source:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${source}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Time:</td>
              <td style="padding: 10px;">${new Date(timestamp).toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short'
              })}</td>
            </tr>
          </table>
        </div>
        
        ${priority === 'urgent' || priority === 'high' ? `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeaa7; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #856404;">
            ⚡ ${priority === 'urgent' ? 'URGENT ACTION REQUIRED' : 'HIGH PRIORITY'}: 
            ${priority === 'urgent' ? 'Call within 30 minutes' : 'Call within 2 hours'} for best conversion rate!
          </p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="tel:+91${phone}" style="display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
            📞 Call Now: +91 ${phone}
          </a>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6c757d;">
            <strong>Best Practices:</strong>
          </p>
          <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px; color: #6c757d;">
            <li>Call within 2 hours for maximum conversion</li>
            <li>Mention their specific service interest (${serviceType})</li>
            <li>Offer free site visit if in Bangalore</li>
            <li>Schedule follow-up if no immediate answer</li>
          </ul>
        </div>
      </div>
    </div>
  `
}