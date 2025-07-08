import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  UserPlus,
  DollarSign,
  BarChart,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

async function getDashboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/crm/dashboard`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return fallback data
    return {
      stats: [
        {
          title: 'Total Leads',
          value: '0',
          change: '+0%',
          changeType: 'neutral',
          icon: 'Users',
          href: '/crm/leads',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          description: 'No leads yet'
        }
      ],
      recentActivities: [],
      quickMetrics: {
        totalLeads: 0,
        totalQuotes: 0,
        totalBlogs: 0,
        totalMessages: 0
      }
    };
  }
}

const iconMap = {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  UserPlus,
  DollarSign,
  BarChart
};

const activityIconMap = {
  lead: UserPlus,
  quote: DollarSign,
  blog: FileText,
  message: MessageSquare
};

export default async function CRMDashboard() {
  const dashboardData = await getDashboardData();
  const { stats, recentActivities, quickMetrics } = dashboardData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users;
          
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    stat.changeType === 'attention' ? 'text-orange-600' :
                    'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                  {stat.description && (
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => {
                  const IconComponent = activityIconMap[activity.type as keyof typeof activityIconMap] || Clock;
                  
                  return (
                    <div key={activity.id || index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.priority === 'urgent' ? 'bg-red-100' :
                        activity.priority === 'high' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          activity.priority === 'urgent' ? 'text-red-600' :
                          activity.priority === 'high' ? 'text-orange-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activities</p>
                  <p className="text-sm text-gray-400">Activities will appear here as they happen</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/crm/blog/new">
                <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="font-medium">New Blog Post</p>
                  <p className="text-sm text-gray-500">Create content</p>
                </button>
              </Link>
              <Link href="/crm/leads">
                <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="font-medium">View Leads</p>
                  <p className="text-sm text-gray-500">Manage contacts ({quickMetrics.totalLeads})</p>
                </button>
              </Link>
              <Link href="/crm/quotes">
                <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                  <DollarSign className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="font-medium">Quotes</p>
                  <p className="text-sm text-gray-500">Manage quotes ({quickMetrics.totalQuotes})</p>
                </button>
              </Link>
              <Link href="/crm/analytics">
                <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-gray-500">View reports</p>
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Metrics</CardTitle>
          <CardDescription>Overview of key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{quickMetrics.totalLeads}</div>
              <div className="text-sm text-gray-500">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{quickMetrics.totalQuotes}</div>
              <div className="text-sm text-gray-500">Quotes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{quickMetrics.totalBlogs}</div>
              <div className="text-sm text-gray-500">Blog Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{quickMetrics.totalMessages}</div>
              <div className="text-sm text-gray-500">Messages</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}