import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'
import Quote from '@/models/Quote'
import Blog from '@/models/Blog'
import Contact from '@/models/Contact'
import Project from '@/src/models/Project'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Get current date ranges
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    
    // Fetch all statistics in parallel
    const [
      // Current totals
      totalLeads,
      totalQuotes,
      totalBlogs,
      totalMessages,
      totalProjects,
      
      // This month stats
      monthlyLeads,
      monthlyQuotes,
      monthlyBlogs,
      monthlyProjects,
      
      // Weekly stats
      weeklyLeads,
      
      // Conversion stats
      qualifiedLeads,
      convertedLeads,
      approvedQuotes,
      
      // Recent activity
      recentLeads,
      recentQuotes,
      recentBlogs,
      recentContacts,
      recentProjects,
      
      // Priority breakdown
      urgentLeads,
      highPriorityLeads,
      
      // Status breakdown
      newLeads,
      inProgressLeads,
      
      // Source breakdown
      leadSources,
      
      // Project stats
      activeProjects,
      completedProjects
    ] = await Promise.all([
      // Current totals
      Lead.countDocuments(),
      Quote.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Project.countDocuments({ isActive: true }),
      
      // This month stats
      Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Quote.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Blog.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Project.countDocuments({ createdAt: { $gte: startOfMonth }, isActive: true }),
      
      // Weekly stats
      Lead.countDocuments({ createdAt: { $gte: startOfWeek } }),
      
      // Conversion stats
      Lead.countDocuments({ status: { $in: ['qualified', 'proposal_sent', 'negotiation'] } }),
      Lead.countDocuments({ status: 'won' }),
      Quote.countDocuments({ status: 'approved' }),
      
      // Recent activity (last 10 items)
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email interestedService priority createdAt')
        .lean(),
      Quote.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name projectType area estimatedCost createdAt')
        .lean(),
      Blog.find({ status: 'published' })
        .sort({ publishedAt: -1 })
        .limit(3)
        .select('title views likes publishedAt')
        .lean(),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name email subject createdAt')
        .lean(),
      Project.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name projectNumber status type customer createdAt')
        .lean(),
      
      // Priority breakdown
      Lead.countDocuments({ priority: 'urgent' }),
      Lead.countDocuments({ priority: 'high' }),
      
      // Status breakdown
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: { $in: ['contacted', 'qualified', 'proposal_sent'] } }),
      
      // Source breakdown
      Lead.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      
      // Project stats
      Project.countDocuments({ status: 'in_progress', isActive: true }),
      Project.countDocuments({ status: 'completed', isActive: true })
    ])
    
    // Calculate conversion rates
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
    const quoteConversionRate = totalQuotes > 0 ? (approvedQuotes / totalQuotes) * 100 : 0
    
    // Calculate monthly growth
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
    
    const lastMonthLeads = await Lead.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    })
    
    const leadsGrowth = lastMonthLeads > 0 ? ((monthlyLeads - lastMonthLeads) / lastMonthLeads) * 100 : 0
    
    // Format recent activities
    const recentActivities = [
      ...recentLeads.map(lead => ({
        id: lead._id,
        type: 'lead',
        message: `New lead from ${lead.name}`,
        details: `Interested in ${lead.interestedService}`,
        time: lead.createdAt,
        priority: lead.priority,
        icon: 'UserPlus'
      })),
      ...recentQuotes.map(quote => ({
        id: quote._id,
        type: 'quote',
        message: `Quote request from ${quote.name}`,
        details: `${quote.projectType} - ${quote.area} sq ft`,
        time: quote.createdAt,
        priority: 'medium',
        icon: 'DollarSign'
      })),
      ...recentBlogs.map(blog => ({
        id: blog._id,
        type: 'blog',
        message: `Blog post published`,
        details: blog.title,
        time: blog.publishedAt,
        priority: 'low',
        icon: 'FileText'
      })),
      ...recentContacts.map(contact => ({
        id: contact._id,
        type: 'message',
        message: `New message from ${contact.name}`,
        details: contact.subject || 'Contact inquiry',
        time: contact.createdAt,
        priority: 'medium',
        icon: 'MessageSquare'
      })),
      ...recentProjects.map(project => ({
        id: project._id,
        type: 'project',
        message: `New project created`,
        details: `${project.name} - ${project.type}`,
        time: project.createdAt,
        priority: 'high',
        icon: 'FolderKanban'
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8)
    
    // Main dashboard stats
    const stats = [
      {
        title: 'Active Projects',
        value: activeProjects.toLocaleString(),
        change: `+${monthlyProjects} this month`,
        changeType: monthlyProjects > 0 ? 'positive' : 'neutral',
        icon: 'FolderKanban',
        href: '/crm/projects',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        description: `${completedProjects} completed`
      },
      {
        title: 'Total Leads',
        value: totalLeads.toLocaleString(),
        change: `+${leadsGrowth.toFixed(1)}%`,
        changeType: leadsGrowth >= 0 ? 'positive' : 'negative',
        icon: 'Users',
        href: '/crm/leads',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        description: `${weeklyLeads} new this week`
      },
      {
        title: 'Conversion Rate',
        value: `${conversionRate.toFixed(1)}%`,
        change: `+${(conversionRate - 20).toFixed(1)}%`,
        changeType: conversionRate > 20 ? 'positive' : 'negative',
        icon: 'TrendingUp',
        href: '/crm/analytics',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        description: `${convertedLeads} leads converted`
      },
      {
        title: 'Messages',
        value: totalMessages.toLocaleString(),
        change: '8 unread',
        changeType: 'attention',
        icon: 'MessageSquare',
        href: '/crm/messages',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        description: 'From contact forms'
      }
    ]
    
    // Quick metrics
    const quickMetrics = {
      totalLeads,
      qualifiedLeads,
      convertedLeads,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      totalQuotes,
      approvedQuotes,
      quoteConversionRate: parseFloat(quoteConversionRate.toFixed(2)),
      urgentLeads,
      newLeads,
      monthlyGrowth: parseFloat(leadsGrowth.toFixed(2)),
      totalProjects,
      activeProjects,
      completedProjects,
      monthlyProjects
    }
    
    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentActivities,
        quickMetrics,
        leadSources,
        summary: {
          totalLeads,
          totalQuotes,
          totalBlogs,
          totalMessages,
          totalProjects,
          activeProjects,
          conversionRate: parseFloat(conversionRate.toFixed(2)),
          monthlyGrowth: parseFloat(leadsGrowth.toFixed(2))
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}