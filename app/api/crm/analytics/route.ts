import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Analytics from '@/models/Analytics'
import Lead from '@/models/Lead'
import Quote from '@/models/Quote'
import Blog from '@/models/Blog'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || '30' // days
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    // Calculate date range
    let dateFilter: any = {}
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    } else {
      const daysAgo = parseInt(period)
      dateFilter = {
        createdAt: {
          $gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
        }
      }
    }
    
    // Get current statistics
    const [
      totalLeads,
      qualifiedLeads,
      convertedLeads,
      totalQuotes,
      approvedQuotes,
      totalBlogs,
      publishedBlogs,
      recentLeads,
      leadsBySource,
      leadsByStatus
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: { $in: ['qualified', 'proposal_sent', 'negotiation'] } }),
      Lead.countDocuments({ status: 'won' }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'approved' }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Lead.find(dateFilter).sort({ createdAt: -1 }).limit(10).lean(),
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ])
    
    // Calculate metrics
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
    const quoteConversionRate = totalQuotes > 0 ? (approvedQuotes / totalQuotes) * 100 : 0
    
    // Get time series data for charts
    const timeSeriesData = await Lead.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          leads: { $sum: 1 },
          qualified: {
            $sum: {
              $cond: [
                { $in: ['$status', ['qualified', 'proposal_sent', 'negotiation']] },
                1,
                0
              ]
            }
          },
          converted: {
            $sum: {
              $cond: [{ $eq: ['$status', 'won'] }, 1, 0]
            }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ])
    
    // Performance metrics
    const performanceMetrics = {
      totalLeads,
      qualifiedLeads,
      convertedLeads,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      totalQuotes,
      approvedQuotes,
      quoteConversionRate: parseFloat(quoteConversionRate.toFixed(2)),
      totalBlogs,
      publishedBlogs
    }
    
    // Growth metrics (compared to previous period)
    const previousPeriodFilter = {
      createdAt: {
        $gte: new Date(Date.now() - parseInt(period) * 2 * 24 * 60 * 60 * 1000),
        $lt: new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000)
      }
    }
    
    const [previousLeads, previousQuotes] = await Promise.all([
      Lead.countDocuments(previousPeriodFilter),
      Quote.countDocuments(previousPeriodFilter)
    ])
    
    const leadGrowth = previousLeads > 0 ? ((totalLeads - previousLeads) / previousLeads) * 100 : 0
    const quoteGrowth = previousQuotes > 0 ? ((totalQuotes - previousQuotes) / previousQuotes) * 100 : 0
    
    return NextResponse.json({
      success: true,
      data: {
        performanceMetrics,
        growth: {
          leads: parseFloat(leadGrowth.toFixed(2)),
          quotes: parseFloat(quoteGrowth.toFixed(2))
        },
        chartData: {
          timeSeries: timeSeriesData,
          leadsBySource,
          leadsByStatus
        },
        recentActivity: recentLeads.map(lead => ({
          type: 'lead',
          message: `New lead from ${lead.name}`,
          timestamp: lead.createdAt,
          priority: lead.priority
        }))
      }
    })
    
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { date } = body
    
    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Date is required' },
        { status: 400 }
      )
    }
    
    // Check if analytics for this date already exists
    const existingAnalytics = await Analytics.findOne({ date: new Date(date) })
    if (existingAnalytics) {
      return NextResponse.json(
        { success: false, message: 'Analytics for this date already exists' },
        { status: 409 }
      )
    }
    
    // Create new analytics entry
    const analytics = await Analytics.create(body)
    
    return NextResponse.json({
      success: true,
      message: 'Analytics entry created successfully',
      analytics
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating analytics:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create analytics' },
      { status: 500 }
    )
  }
}