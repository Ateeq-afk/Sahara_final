import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/src/lib/mongodb';
import Campaign from '@/src/models/Campaign';
import Lead from '@/src/models/Lead';
import { z } from 'zod';

const createCampaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  description: z.string().optional(),
  type: z.enum(['email', 'sms', 'push', 'in-app']),
  targetAudience: z.object({
    segments: z.array(z.string()),
    filters: z.object({
      projectStage: z.array(z.string()).optional(),
      leadScore: z.object({
        min: z.number().optional(),
        max: z.number().optional()
      }).optional(),
      tags: z.array(z.string()).optional(),
      location: z.array(z.string()).optional(),
      lastActivity: z.object({
        within: z.number(),
        unit: z.enum(['days', 'weeks', 'months'])
      }).optional()
    })
  }),
  triggers: z.object({
    type: z.enum(['immediate', 'scheduled', 'event-based', 'project-stage']),
    schedule: z.object({
      startDate: z.string().or(z.date()),
      endDate: z.string().or(z.date()).optional(),
      timezone: z.string(),
      recurringPattern: z.enum(['none', 'daily', 'weekly', 'monthly']).optional()
    }).optional(),
    events: z.object({
      eventType: z.enum(['project_created', 'project_updated', 'lead_scored', 'estimate_sent', 'custom']),
      conditions: z.any().optional()
    }).optional(),
    projectStages: z.object({
      fromStage: z.string().optional(),
      toStage: z.string(),
      delayDays: z.number().optional()
    }).optional()
  }),
  content: z.object({
    subject: z.string().optional(),
    previewText: z.string().optional(),
    body: z.string().min(1, 'Campaign content is required'),
    template: z.string().optional(),
    personalization: z.object({
      useDynamicContent: z.boolean(),
      fields: z.array(z.string())
    }).optional()
  })
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
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const [campaigns, total] = await Promise.all([
      Campaign.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email')
        .lean(),
      Campaign.countDocuments(query)
    ]);

    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
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
    const validatedData = createCampaignSchema.parse(body);

    const campaign = await Campaign.create({
      ...validatedData,
      createdBy: session.user.id,
      lastModifiedBy: session.user.id
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}