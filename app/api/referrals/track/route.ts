import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Referral from '@/src/models/Referral';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { referralCode, event, metadata } = body;

    if (!referralCode || !event) {
      return NextResponse.json({ 
        error: 'Referral code and event are required' 
      }, { status: 400 });
    }

    const referral = await Referral.findOne({ referralCode });
    if (!referral) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    // Check if referral has expired
    if (referral.expiresAt && new Date(referral.expiresAt) < new Date()) {
      referral.status = 'expired';
      await referral.save();
      return NextResponse.json({ error: 'Referral has expired' }, { status: 400 });
    }

    // Update referral based on event
    switch (event) {
      case 'clicked':
        if (!referral.milestones.clickedAt) {
          referral.milestones.clickedAt = new Date();
          referral.status = 'clicked';
          if (metadata) {
            referral.metadata = { ...referral.metadata, ...metadata };
          }
        }
        break;

      case 'signed_up':
        if (!referral.milestones.signedUpAt) {
          referral.milestones.signedUpAt = new Date();
          referral.status = 'signed_up';
          if (metadata?.referredId) {
            referral.referredId = metadata.referredId;
            referral.referredType = metadata.referredType || 'Lead';
          }
        }
        break;

      case 'qualified':
        if (!referral.milestones.qualifiedAt) {
          referral.milestones.qualifiedAt = new Date();
          referral.status = 'qualified';
        }
        break;

      case 'converted':
        if (!referral.milestones.convertedAt) {
          referral.milestones.convertedAt = new Date();
          referral.status = 'converted';
          if (metadata?.conversionDetails) {
            referral.conversionDetails = metadata.conversionDetails;
          }
        }
        break;

      default:
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }

    await referral.save();

    return NextResponse.json({ 
      message: 'Referral tracked successfully',
      referral: {
        id: referral._id,
        status: referral.status,
        milestones: referral.milestones
      }
    });
  } catch (error) {
    console.error('Error tracking referral:', error);
    return NextResponse.json({ error: 'Failed to track referral' }, { status: 500 });
  }
}