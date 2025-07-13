import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { 
  FolderKanban, 
  FileText, 
  CreditCard, 
  MessageSquare,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'
import MaterialOrder from '@/src/models/MaterialOrder'
import { format } from 'date-fns'

async function getCustomerData(customerId: string) {
  await dbConnect()
  
  const [projects, orders, activeProject] = await Promise.all([
    (Project as any).find({ 'customer.id': customerId, isActive: true })
      .sort({ createdAt: -1 })
      .lean(),
    (MaterialOrder as any).find({ 'customer.id': customerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    (Project as any).findOne({ 
      'customer.id': customerId, 
      status: 'in_progress',
      isActive: true 
    }).lean()
  ])

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in_progress').length
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const totalInvestment = projects.reduce((sum, p) => sum + (p.budget?.estimated || 0), 0)

  return {
    projects,
    orders,
    activeProject,
    stats: {
      totalProjects,
      activeProjects,
      completedProjects,
      totalInvestment
    }
  }
}

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const customerData = await getCustomerData(session.user.id)
  const { projects, orders, activeProject, stats } = customerData

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session.user.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your projects and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProjects} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedProjects}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalInvestment)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Contracts & reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Project */}
      {activeProject && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Project</CardTitle>
                <CardDescription>{activeProject.name}</CardDescription>
              </div>
              <Link href={`/portal/projects/${activeProject._id}`}>
                <Button variant="outline" size="sm">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{activeProject.overallProgress || 0}%</span>
              </div>
              <Progress value={activeProject.overallProgress || 0} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {format(new Date(activeProject.timeline.startDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Est. Completion</p>
                <p className="font-medium">
                  {format(new Date(activeProject.timeline.estimatedEndDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium">
                  {formatCurrency(activeProject.budget.estimated)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium capitalize">
                  {activeProject.status.replace('_', ' ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest activity on your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Site visit scheduled</p>
                  <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Foundation work completed</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment reminder</p>
                  <p className="text-xs text-muted-foreground">Next milestone due in 5 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your material orders</CardDescription>
              </div>
              <Link href="/portal/orders">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No orders yet
              </p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order: any) => (
                  <div key={order._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Order #{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} items • {formatCurrency(order.pricing.total)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium capitalize">{order.status}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.createdAt), 'MMM dd')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/portal/support">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
            <Link href="/portal/documents">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Documents
              </Button>
            </Link>
            <Link href="/portal/payments">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}