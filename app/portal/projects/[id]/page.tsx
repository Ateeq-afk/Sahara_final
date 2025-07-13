import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Download,
  Phone,
  MessageSquare,
  FileText,
  Camera,
  AlertCircle,
  CheckCircle,
  HardHat
} from 'lucide-react'
import Link from 'next/link'
import { format, differenceInDays } from 'date-fns'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'

async function getProject(projectId: string, customerId: string) {
  await dbConnect()
  
  const project = await (Project as any).findOne({
    _id: projectId,
    'customer.id': customerId,
    isActive: true
  })
    .populate('team.projectManager', 'name email phone')
    .lean()

  return project
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-800',
  approved: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  on_hold: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default async function CustomerProjectDetailPage({
  params
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const project = await getProject(params.id, session.user.id)
  if (!project) {
    notFound()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const progress = project.overallProgress || 0
  const daysRemaining = differenceInDays(new Date(project.timeline.estimatedEndDate), new Date())
  const daysElapsed = differenceInDays(new Date(), new Date(project.timeline.startDate))
  const budgetUsed = (project.budget.spent / project.budget.estimated) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/portal/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{project.projectNumber}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Team
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress}%</div>
            <Progress value={progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetUsed.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(project.budget.spent)} used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {daysRemaining > 0 ? daysRemaining : 0} days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysElapsed} days elapsed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Foundation</div>
            <p className="text-xs text-muted-foreground mt-1">
              Due in 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="capitalize">{project.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p>{project.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {project.address.street && `${project.address.street}, `}
                    {project.address.area}, {project.address.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p>{formatCurrency(project.budget.estimated)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.team?.projectManager && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <HardHat className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{project.team.projectManager.name}</p>
                        <p className="text-sm text-muted-foreground">Project Manager</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <p className="text-sm text-muted-foreground text-center py-4">
                  Contact your project manager for any queries
                </p>
              </CardContent>
            </Card>
          </div>

          {project.phases && project.phases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Phases</CardTitle>
                <CardDescription>Track progress of each construction phase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.phases.map((phase, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{phase.name}</p>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                      <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'}>
                        {phase.status}
                      </Badge>
                    </div>
                    <Progress value={phase.progress || 0} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Key milestones and dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Project Started</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(project.timeline.startDate), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Expected Completion</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(project.timeline.estimatedEndDate), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>Important documents and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              {project.documents && project.documents.length > 0 ? (
                <div className="space-y-2">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No documents available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Progress Photos</CardTitle>
              <CardDescription>Visual updates from your construction site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-4" />
                <p>No photos uploaded yet</p>
                <p className="text-sm mt-2">Photos will appear here as work progresses</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>Track your payment milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Advance Payment</p>
                    <p className="text-sm text-muted-foreground">10% of total budget</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(project.budget.estimated * 0.1)}</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Foundation Completion</p>
                    <p className="text-sm text-muted-foreground">20% of total budget</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(project.budget.estimated * 0.2)}</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}