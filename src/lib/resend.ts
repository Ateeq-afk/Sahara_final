import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export function getResend() {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Email functionality will be disabled.');
      return null;
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export const resend = getResend();

export const EMAIL_CONFIG = {
  from: 'Sahara Developers <noreply@saharadevelopers.in>',
  replyTo: 'info@saharadevelopers.in',
  adminEmail: process.env.ADMIN_EMAIL || 'info@saharadevelopers.in',
  notificationEmails: (process.env.NOTIFICATION_EMAILS || 'info@saharadevelopers.in').split(','),
};