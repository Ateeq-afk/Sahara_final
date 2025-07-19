import { getResend } from '@/src/lib/resend';
import { IReferral } from '@/src/models/Referral';

export async function sendReferralInvitation(
  referral: IReferral,
  referrer: { name?: string; email: string },
  customMessage?: string
) {
  try {
    const subject = `${referrer.name || 'A friend'} thinks you'll love Sahara Developers`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
            <h1 style="color: #dc2626; margin-bottom: 20px;">You've Been Referred!</h1>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              ${referrer.name || 'Your friend'} thinks you'd be interested in Sahara Developers' premium construction and renovation services.
            </p>

            ${customMessage ? `
              <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                <p style="font-style: italic; margin: 0;">"${customMessage}"</p>
                <p style="text-align: right; margin: 10px 0 0 0;">- ${referrer.name || 'Your friend'}</p>
              </div>
            ` : ''}

            <div style="background-color: #fee2e2; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="color: #dc2626; margin-top: 0;">Your Exclusive Benefit:</h3>
              <p style="font-size: 18px; margin: 0;">
                ${referral.rewards.referredReward?.type === 'percentage' 
                  ? `${referral.rewards.referredReward.value}% off your first project`
                  : referral.rewards.referredReward?.type === 'fixed'
                  ? `$${referral.rewards.referredReward.value} off your first project`
                  : 'Special discount on your first project'}
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${referral.referralLink}" 
                 style="display: inline-block; background-color: #dc2626; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                Claim Your Offer
              </a>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              Or use code: <strong>${referral.referralCode}</strong>
            </p>

            ${referral.expiresAt ? `
              <p style="font-size: 12px; color: #999; margin-top: 20px;">
                This offer expires on ${new Date(referral.expiresAt).toLocaleDateString()}
              </p>
            ` : ''}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; text-align: center;">
            <p>Sahara Developers - Building Dreams, Creating Homes</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #dc2626; text-decoration: none;">Visit our website</a> |
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe" style="color: #dc2626; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const resend = getResend();
    if (!resend) {
      console.warn('Email service not configured');
      return;
    }
    const { error } = await resend.emails.send({
      from: 'Sahara Developers <referrals@saharadevelopers.in>',
      to: referral.referredEmail,
      subject,
      html,
      headers: {
        'X-Referral-ID': String(referral._id),
        'X-Referral-Code': referral.referralCode
      }
    });

    if (error) {
      console.error('Error sending referral invitation:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in sendReferralInvitation:', error);
    throw error;
  }
}

export async function sendReferralRewardNotification(
  referral: IReferral,
  referrer: { name?: string; email: string },
  type: 'qualified' | 'converted'
) {
  try {
    const subject = type === 'qualified' 
      ? 'Your referral has signed up!' 
      : 'Congratulations! You\'ve earned a referral reward';
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
            <h1 style="color: #10b981; margin-bottom: 20px;">${subject}</h1>
            
            ${type === 'qualified' ? `
              <p style="font-size: 16px; margin-bottom: 20px;">
                Great news! Your referral has signed up using your referral link.
                You're one step closer to earning your reward.
              </p>
            ` : `
              <p style="font-size: 16px; margin-bottom: 20px;">
                Amazing news! Your referral has completed their first project with us.
                You've earned your referral reward!
              </p>

              <div style="background-color: #d1fae5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="color: #10b981; margin-top: 0;">Your Reward:</h3>
                <p style="font-size: 18px; margin: 0;">
                  ${referral.rewards.referrerReward?.type === 'percentage' 
                    ? `${referral.rewards.referrerReward.value}% commission`
                    : referral.rewards.referrerReward?.type === 'fixed'
                    ? `$${referral.rewards.referrerReward.value}`
                    : 'Referral reward'}
                </p>
              </div>
            `}

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/crm/referrals" 
                 style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                View Your Referrals
              </a>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666; text-align: center;">
            <p>Sahara Developers - Building Dreams, Creating Homes</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #dc2626; text-decoration: none;">Visit our website</a> |
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe" style="color: #dc2626; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const resend = getResend();
    if (!resend) {
      console.warn('Email service not configured');
      return;
    }
    const { error } = await resend.emails.send({
      from: 'Sahara Developers <referrals@saharadevelopers.in>',
      to: referrer.email,
      subject,
      html
    });

    if (error) {
      console.error('Error sending referral reward notification:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in sendReferralRewardNotification:', error);
    throw error;
  }
}