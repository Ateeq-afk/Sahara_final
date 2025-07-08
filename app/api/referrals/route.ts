import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth-options';
import dbConnect from '@/src/lib/mongodb';
import Referral from '@/src/models/Referral';
import ReferralProgram from '@/src/models/ReferralProgram';
import Lead from '@/src/models/Lead';
import { z } from 'zod';
import { sendReferralInvitation } from '@/lib/email/referral-sender';

const createReferralSchema = z.object({
  referredEmail: z.string().email('Valid email required'),
  campaign: z.object({
    name: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  message: z.string().optional()
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const referrerId = searchParams.get('referrerId') || session.user.id;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query: any = {};
    
    // If not admin, only show own referrals
    if (session.user.role !== 'admin') {
      query.referrerId = session.user.id;
    } else if (referrerId) {
      query.referrerId = referrerId;
    }
    
    if (status) query.status = status;

    const [referrals, total] = await Promise.all([
      Referral.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Referral.countDocuments(query)
    ]);

    return NextResponse.json({
      referrals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const validatedData = createReferralSchema.parse(body);

    // Check if there's an active referral program
    const activeProgram = await ReferralProgram.findOne({
      status: 'active',
      startDate: { $lte: new Date() },
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gte: new Date() } }
      ]
    });

    if (!activeProgram) {
      return NextResponse.json({ 
        error: 'No active referral program available' 
      }, { status: 400 });
    }

    // Check if user is eligible
    const referrerData = await Lead.findById(session.user.id);
    if (!referrerData) {
      return NextResponse.json({ 
        error: 'Referrer not found' 
      }, { status: 404 });
    }

    // Check if referral already exists
    const existingReferral = await Referral.findOne({
      referrerId: session.user.id,
      referredEmail: validatedData.referredEmail,
      status: { $ne: 'cancelled' }
    });

    if (existingReferral) {
      return NextResponse.json({ 
        error: 'Referral already exists for this email' 
      }, { status: 400 });
    }

    // Check max referrals per user
    if (activeProgram.terms.maxReferralsPerUser) {
      const userReferralCount = await Referral.countDocuments({
        referrerId: session.user.id,
        status: { $ne: 'cancelled' }
      });

      if (userReferralCount >= activeProgram.terms.maxReferralsPerUser) {
        return NextResponse.json({ 
          error: 'Maximum referral limit reached' 
        }, { status: 400 });
      }
    }

    // Create referral
    const referral = await Referral.create({
      referrerId: session.user.id,
      referrerType: 'Lead',
      referredEmail: validatedData.referredEmail,
      campaign: validatedData.campaign,
      rewards: {
        referrerReward: activeProgram.rewards.referrer.defaultReward,
        referredReward: activeProgram.rewards.referred
      },
      expiresAt: activeProgram.terms.validityDays 
        ? new Date(Date.now() + activeProgram.terms.validityDays * 24 * 60 * 60 * 1000)
        : undefined
    });

    // Send referral invitation email
    await sendReferralInvitation(referral, referrerData, validatedData.message);

    return NextResponse.json({ referral }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating referral:', error);
    return NextResponse.json({ error: 'Failed to create referral' }, { status: 500 });
  }
}