import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, LineChart, PieChart, TrendingUp, Users, DollarSign, Target, Activity } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = {
    totalLeads: 156,
    conversionRate: 23.5,
    totalRevenue: 2850000,
    activeProjects: 8,
    completedProjects: 24,
    customerSatisfaction: 4.8
  }

  const leadsBySource = [
    { source: 'Website', count: 45, percentage: 28.8 },
    { source: 'Referrals', count: 38, percentage: 24.4 },
    { source: 'Social Media', count: 32, percentage: 20.5 },
    { source: 'Direct Contact', count: 25, percentage: 16.0 },
    { source: 'Google Ads', count: 16, percentage: 10.3 }
  ]

  const monthlyData = [
    { month: 'Jan', leads: 18, conversions: 4, revenue: 180000 },
    { month: 'Feb', leads: 22, conversions: 6, revenue: 240000 },
    { month: 'Mar', leads: 19, conversions: 5, revenue: 220000 },
    { month: 'Apr', leads: 25, conversions: 7, revenue: 320000 },
    { month: 'May', leads: 28, conversions: 8, revenue: 380000 },
    { month: 'Jun', leads: 24, conversions: 6, revenue: 290000 }
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.totalLeads}</div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+2.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{(metrics.totalRevenue / 100000).toFixed(1)}L</div>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.activeProjects}</div>
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 mt-1">Currently ongoing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.completedProjects}</div>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.customerSatisfaction}/5</div>
              <div className="text-yellow-500">★</div>
            </div>
            <p className="text-xs text-green-600 mt-1">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Lead Sources
            </CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsBySource.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{source.count}</span>
                    <span className="text-sm font-medium">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28.8%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Leads and conversions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{month.month}</div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{month.leads}</div>
                      <div className="text-gray-500">Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{month.conversions}</div>
                      <div className="text-gray-500">Conversions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">₹{(month.revenue / 100000).toFixed(1)}L</div>
                      <div className="text-gray-500">Revenue</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Project Status Distribution
          </CardTitle>
          <CardDescription>Current status of all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm font-medium text-blue-800">Planning</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm font-medium text-orange-800">In Progress</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <div className="text-sm font-medium text-yellow-800">Finishing</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-sm font-medium text-green-800">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Services */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Services</CardTitle>
          <CardDescription>Most popular services by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Villa Construction</div>
                <div className="text-sm text-gray-600">12 projects completed</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">₹18.5L</div>
                <div className="text-sm text-gray-500">Avg. value</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Interior Design</div>
                <div className="text-sm text-gray-600">18 projects completed</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">₹8.2L</div>
                <div className="text-sm text-gray-500">Avg. value</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Home Renovation</div>
                <div className="text-sm text-gray-600">22 projects completed</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">₹6.8L</div>
                <div className="text-sm text-gray-500">Avg. value</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}