import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth-options';
import dbConnect from '@/lib/mongodb';
import Campaign from '@/src/models/Campaign';
import CampaignExecution from '@/src/models/CampaignExecution';
import Lead from '@/src/models/Lead';
import { sendCampaignEmail } from '@/lib/email/campaign-sender';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const campaign = await Campaign.findById(params.id);
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'active' && campaign.status !== 'scheduled') {
      return NextResponse.json({ 
        error: 'Campaign must be active or scheduled to execute' 
      }, { status: 400 });
    }

    // Get target audience based on filters
    const leadQuery: any = {};
    
    if (campaign.targetAudience.filters.leadScore) {
      leadQuery.score = {};
      if (campaign.targetAudience.filters.leadScore.min) {
        leadQuery.score.$gte = campaign.targetAudience.filters.leadScore.min;
      }
      if (campaign.targetAudience.filters.leadScore.max) {
        leadQuery.score.$lte = campaign.targetAudience.filters.leadScore.max;
      }
    }

    if (campaign.targetAudience.filters.tags?.length) {
      leadQuery.tags = { $in: campaign.targetAudience.filters.tags };
    }

    if (campaign.targetAudience.filters.location?.length) {
      leadQuery.location = { $in: campaign.targetAudience.filters.location };
    }

    const leads = await Lead.find(leadQuery).select('_id email name');

    // Create executions for each lead
    const executions: any[] = [];
    for (const lead of leads) {
      // Check if execution already exists
      const existingExecution = await CampaignExecution.findOne({
        campaignId: campaign._id,
        recipientId: lead._id
      });

      if (!existingExecution) {
        const execution = await CampaignExecution.create({
          campaignId: campaign._id,
          recipientId: lead._id,
          recipientType: 'Lead',
          status: 'pending'
        });
        executions.push(execution);
      }
    }

    // Update campaign status if needed
    if (campaign.status === 'scheduled') {
      campaign.status = 'active';
      await campaign.save();
    }

    // Start sending emails asynchronously
    process.nextTick(async () => {
      for (const execution of executions) {
        try {
          const lead = leads.find(l => l._id.toString() === execution.recipientId.toString());
          if (lead) {
            await sendCampaignEmail(campaign, lead, execution);
          }
        } catch (error) {
          console.error('Error sending campaign email:', error);
        }
      }
    });

    return NextResponse.json({ 
      message: 'Campaign execution started',
      executionsCreated: executions.length,
      totalRecipients: leads.length
    });
  } catch (error) {
    console.error('Error executing campaign:', error);
    return NextResponse.json({ error: 'Failed to execute campaign' }, { status: 500 });
  }
}