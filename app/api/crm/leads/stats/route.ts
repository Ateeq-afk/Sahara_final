import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }
    
    await dbConnect()
    
    // Get lead statistics
    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      leadsBySource,
      leadsByStatus,
      recentLeads,
      leadScoreDistribution
    ] = await Promise.all([
      // Total leads
      Lead.countDocuments(),
      
      // New leads (last 7 days)
      Lead.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      
      // Qualified leads
      Lead.countDocuments({ status: 'qualified' }),
      
      // Won leads
      Lead.countDocuments({ status: 'won' }),
      
      // Leads by source
      Lead.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // Leads by status
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // Recent leads
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email phone source status score createdAt')
        .lean(),
        
      // Lead score distribution
      Lead.aggregate([
        {
          $bucket: {
            groupBy: '$score',
            boundaries: [0, 20, 40, 60, 80, 100],
            default: 'Other',
            output: { count: { $sum: 1 } }
          }
        }
      ])
    ])
    
    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0
    
    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalLeads,
          newLeads,
          qualifiedLeads,
          wonLeads,
          conversionRate: conversionRate.toFixed(2)
        },
        leadsBySource: leadsBySource.map(item => ({
          source: item._id,
          count: item.count
        })),
        leadsByStatus: leadsByStatus.map(item => ({
          status: item._id,
          count: item.count
        })),
        recentLeads,
        leadScoreDistribution: leadScoreDistribution.map((item: any, index: number) => ({
          range: index === 0 ? '0-20' : 
                 index === 1 ? '20-40' :
                 index === 2 ? '40-60' :
                 index === 3 ? '60-80' : '80-100',
          count: item.count
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching lead statistics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lead statistics' },
      { status: 500 }
    )
  }
}