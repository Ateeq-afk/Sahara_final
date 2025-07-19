import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export function getResend() {
  if (!resendInstance) {
    console.log('=== Resend Configuration ===');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.substring(0, 3) || 'N/A');
    
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Email functionality will be disabled.');
      console.warn('Please add RESEND_API_KEY to your .env.local file');
      return null;
    }
    
    console.log('Creating new Resend instance...');
    resendInstance = new Resend(process.env.RESEND_API_KEY);
    console.log('Resend instance created successfully');
  }
  return resendInstance;
}

export const resend = getResend();

export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'Sahara Developers <noreply@example.com>',
  replyTo: process.env.EMAIL_REPLY_TO || process.env.ADMIN_EMAIL || 'admin@example.com',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
  notificationEmails: (process.env.NOTIFICATION_EMAILS || process.env.ADMIN_EMAIL || 'admin@example.com').split(','),
};