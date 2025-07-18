import { getResend } from '@/src/lib/resend';
import { ICampaign } from '@/src/models/Campaign';
import { ICampaignExecution } from '@/src/models/CampaignExecution';
import CampaignExecution from '@/src/models/CampaignExecution';

export async function sendCampaignEmail(
  campaign: ICampaign,
  recipient: { _id: string; email: string; name?: string },
  execution: ICampaignExecution
) {
  try {
    // Personalize content
    let subject = campaign.content.subject || 'Message from Sahara Developers';
    let body = campaign.content.body;

    if (campaign.content.personalization?.useDynamicContent) {
      // Replace personalization tokens
      subject = subject.replace(/\{\{name\}\}/g, recipient.name || 'Valued Customer');
      body = body.replace(/\{\{name\}\}/g, recipient.name || 'Valued Customer');
      body = body.replace(/\{\{email\}\}/g, recipient.email);
    }

    // Add tracking pixel
    const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns/track/open?executionId=${execution._id}" width="1" height="1" style="display:none;" />`;
    body += trackingPixel;

    // Send email
    const resend = getResend();
    if (!resend) {
      console.warn('Email service not configured');
      return;
    }
    const { data, error } = await resend.emails.send({
      from: 'Sahara Developers <noreply@saharadevelopers.com>',
      to: recipient.email,
      subject,
      html: body,
      headers: {
        'X-Campaign-ID': String(campaign._id),
        'X-Execution-ID': String(execution._id)
      }
    });

    if (error) {
      execution.status = 'failed';
      execution.error = {
        message: error.message,
        timestamp: new Date()
      };
    } else {
      execution.status = 'sent';
      execution.sentAt = new Date();
      execution.metadata = {
        emailMessageId: data?.id
      };

      // Update campaign metrics
      await campaign.updateOne({
        $inc: { 'metrics.sent': 1 }
      });
    }

    await execution.save();
  } catch (error) {
    console.error('Error sending campaign email:', error);
    
    execution.status = 'failed';
    execution.error = {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    };
    await execution.save();

    throw error;
  }
}

export async function trackEmailOpen(executionId: string) {
  try {
    const execution = await CampaignExecution.findById(executionId);
    if (!execution || execution.openedAt) return;

    execution.status = 'opened';
    execution.openedAt = new Date();
    await execution.save();

    // Update campaign metrics
    await execution.populate('campaignId');
    if (execution.campaignId) {
      await (execution.campaignId as any).updateOne({
        $inc: { 'metrics.opened': 1 }
      });
    }
  } catch (error) {
    console.error('Error tracking email open:', error);
  }
}

export async function trackEmailClick(executionId: string, url: string) {
  try {
    const execution = await CampaignExecution.findById(executionId);
    if (!execution) return;

    if (!execution.clickedAt) {
      execution.status = 'clicked';
      execution.clickedAt = new Date();
    }

    execution.clicks.push({
      url,
      clickedAt: new Date()
    });
    await execution.save();

    // Update campaign metrics
    await execution.populate('campaignId');
    if (execution.campaignId && execution.clicks.length === 1) {
      await (execution.campaignId as any).updateOne({
        $inc: { 'metrics.clicked': 1 }
      });
    }
  } catch (error) {
    console.error('Error tracking email click:', error);
  }
}