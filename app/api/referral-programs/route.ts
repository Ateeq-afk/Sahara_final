import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth-options';
import dbConnect from '@/src/lib/mongodb';
import ReferralProgram from '@/src/models/ReferralProgram';
import { z } from 'zod';

const createProgramSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().optional(),
  eligibility: z.object({
    referrerTypes: z.array(z.enum(['Lead', 'User', 'Customer'])),
    minimumProjects: z.number().optional(),
    minimumSpend: z.number().optional(),
    requiresApproval: z.boolean().optional()
  }),
  rewards: z.object({
    referrer: z.object({
      type: z.enum(['percentage', 'fixed', 'credit', 'tiered', 'custom']),
      defaultReward: z.object({
        type: z.enum(['percentage', 'fixed', 'credit']),
        value: z.number(),
        currency: z.string().optional(),
        maxPerReferral: z.number().optional(),
        maxTotal: z.number().optional()
      }).optional(),
      tiers: z.array(z.object({
        minReferrals: z.number(),
        maxReferrals: z.number().optional(),
        reward: z.object({
          type: z.enum(['percentage', 'fixed', 'credit']),
          value: z.number(),
          currency: z.string().optional()
        })
      })).optional()
    }),
    referred: z.object({
      type: z.enum(['percentage', 'fixed', 'credit', 'custom']),
      value: z.number(),
      currency: z.string().optional(),
      description: z.string().optional(),
      validityDays: z.number().optional()
    })
  }),
  terms: z.object({
    minimumPurchase: z.number().optional(),
    validityDays: z.number().optional(),
    maxReferralsPerUser: z.number().optional(),
    qualificationCriteria: z.object({
      type: z.enum(['signup', 'first_purchase', 'minimum_spend', 'project_completion']),
      minimumSpend: z.number().optional(),
      daysToQualify: z.number().optional()
    }).optional(),
    excludedServices: z.array(z.string()).optional(),
    geographicRestrictions: z.array(z.string()).optional()
  }),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional()
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
    const active = searchParams.get('active');

    const query: any = {};
    if (status) query.status = status;
    
    if (active === 'true') {
      const now = new Date();
      query.status = 'active';
      query.startDate = { $lte: now };
      query.$or = [
        { endDate: { $exists: false } },
        { endDate: { $gte: now } }
      ];
    }

    const programs = await ReferralProgram.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
      .lean();

    return NextResponse.json({ programs });
  } catch (error) {
    console.error('Error fetching referral programs:', error);
    return NextResponse.json({ error: 'Failed to fetch referral programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const validatedData = createProgramSchema.parse(body);

    // Check for overlapping active programs
    const startDate = new Date(validatedData.startDate);
    const endDate = validatedData.endDate ? new Date(validatedData.endDate) : null;

    const overlappingProgram = await ReferralProgram.findOne({
      status: 'active',
      $or: [
        {
          startDate: { $lte: endDate || new Date('2100-01-01') },
          $or: [
            { endDate: { $exists: false } },
            { endDate: { $gte: startDate } }
          ]
        }
      ]
    });

    if (overlappingProgram) {
      return NextResponse.json({ 
        error: 'An active program already exists for this time period' 
      }, { status: 400 });
    }

    const program = await ReferralProgram.create({
      ...validatedData,
      createdBy: session.user.id,
      lastModifiedBy: session.user.id
    });

    return NextResponse.json({ program }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating referral program:', error);
    return NextResponse.json({ error: 'Failed to create referral program' }, { status: 500 });
  }
}