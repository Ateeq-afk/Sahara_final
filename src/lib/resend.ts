import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_CONFIG = {
  from: 'Sahara Developers <noreply@sahara-developers.com>',
  replyTo: 'info@sahara-developers.com',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@sahara-developers.com',
  notificationEmails: (process.env.NOTIFICATION_EMAILS || 'admin@sahara-developers.com').split(','),
};