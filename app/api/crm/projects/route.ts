import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'
import User from '@/src/models/User'
import Lead from '@/src/models/Lead'

// GET all projects
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get('status')
    const customerId = searchParams.get('customerId')
    const projectManager = searchParams.get('projectManager')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build query
    const query: any = {}
    if (status) query.status = status
    if (customerId) query['customer.id'] = customerId
    if (projectManager) query['team.projectManager'] = projectManager

    const skip = (page - 1) * limit

    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate('customer.id', 'name email phone')
        .populate('lead', 'name projectType')
        .populate('team.projectManager', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query)
    ])

    return NextResponse.json({
      success: true,
      data: {
        projects,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create new project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const data = await req.json()

    // Generate project number
    const lastProject = await Project.findOne().sort({ createdAt: -1 })
    const projectCount = lastProject ? parseInt(lastProject.projectNumber.slice(4)) + 1 : 1
    const projectNumber = `PRJ-${projectCount.toString().padStart(5, '0')}`

    // Validate customer
    const customer = await User.findById(data.customerId)
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Create project
    const project = new Project({
      ...data,
      projectNumber,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      },
      'team.projectManager': session.user.id,
      createdBy: session.user.id
    })

    await project.save()

    // Update lead if connected
    if (data.leadId) {
      await Lead.findByIdAndUpdate(data.leadId, {
        status: 'won',
        project: project._id,
        convertedAt: new Date()
      })
    }

    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}