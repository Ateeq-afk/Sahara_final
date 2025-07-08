import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Eye,
  UserPlus,
  DollarSign,
  BarChart
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    title: 'Total Leads',
    value: '2,345',
    change: '+12.5%',
    icon: Users,
    href: '/crm/leads',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Blog Posts',
    value: '48',
    change: '+3 this week',
    icon: FileText,
    href: '/crm/blog',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Messages',
    value: '124',
    change: '8 unread',
    icon: MessageSquare,
    href: '/crm/messages',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Conversion Rate',
    value: '24.8%',
    change: '+2.1%',
    icon: TrendingUp,
    href: '/crm/analytics',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'lead',
    message: 'New lead from contact form',
    name: 'Priya Sharma',
    time: '5 minutes ago',
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'blog',
    message: 'Blog post published',
    name: 'Modern Kitchen Design Trends 2024',
    time: '2 hours ago',
    icon: FileText,
  },
  {
    id: 3,
    type: 'view',
    message: 'Quote request received',
    name: 'Rahul Verma - 3BHK Interior',
    time: '3 hours ago',
    icon: DollarSign,
  },
  {
    id: 4,
    type: 'analytics',
    message: 'Weekly report available',
    name: 'Website Analytics',
    time: '1 day ago',
    icon: BarChart,
  },
];

export default function CRMDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
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
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-600">{activity.name}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
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
                  <p className="text-sm text-gray-500">Manage contacts</p>
                </button>
              </Link>
              <Link href="/crm/media">
                <button className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-5 w-5 text-gray-600 mb-2" />
                  <p className="font-medium">Media Library</p>
                  <p className="text-sm text-gray-500">Upload images</p>
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
    </div>
  );
}