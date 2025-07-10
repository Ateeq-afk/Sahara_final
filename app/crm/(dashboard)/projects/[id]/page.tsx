'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit,
  Plus,
  Download,
  Upload,
  Truck,
  HardHat,
  Camera,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { format, differenceInDays } from 'date-fns'

interface Project {
  _id: string
  projectNumber: string
  name: string
  description: string
  type: string
  status: string
  priority: string
  customer: {
    id: any
    name: string
    email: string
    phone: string
  }
  address: {
    street: string
    area: string
    city: string
    state: string
    pincode: string
  }
  timeline: {
    startDate: string
    estimatedEndDate: string
    actualEndDate?: string
    milestones: any[]
  }
  budget: {
    estimated: number
    approved: number
    spent: number
    currency: string
  }
  team: {
    projectManager?: any
    architect?: any
    siteEngineer?: any
    members: any[]
  }
  phases: any[]
  documents: any[]
  materials: any[]
  dailyLogs: any[]
  overallProgress?: number
  budgetVariance?: number
  scheduleVariance?: number
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-800',
  approved: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  on_hold: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const { toast } = useToast()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/crm/projects/${projectId}`)
      if (!response.ok) throw new Error('Failed to fetch project')
      
      const data = await response.json()
      setProject(data.data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load project details',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link href="/crm/projects">
          <Button className="mt-4">Back to Projects</Button>
        </Link>
      </div>
    )
  }

  const progress = project.overallProgress || 0
  const daysRemaining = differenceInDays(new Date(project.timeline.estimatedEndDate), new Date())
  const daysElapsed = differenceInDays(new Date(), new Date(project.timeline.startDate))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/crm/projects">
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
              <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                {project.priority}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{project.projectNumber}</p>
          </div>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
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
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((project.budget.spent / project.budget.estimated) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(project.budget.spent)} of {formatCurrency(project.budget.estimated)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {daysRemaining > 0 ? daysRemaining : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysElapsed} days elapsed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.team.members.length + 3}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active members
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="daily-logs">Daily Logs</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
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
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p>{format(new Date(project.timeline.startDate), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Est. End Date</p>
                  <p>{format(new Date(project.timeline.estimatedEndDate), 'PPP')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{project.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{project.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{project.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Location</p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {project.address.area}, {project.address.city}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {project.phases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Phases</CardTitle>
                <CardDescription>Current progress across all phases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.phases.map((phase, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{phase.name}</span>
                      <span className="text-muted-foreground">{phase.progress || 0}%</span>
                    </div>
                    <Progress value={phase.progress || 0} />
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
              <CardDescription>Milestones and key dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p>Timeline view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
              <CardDescription>Team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.team.projectManager && (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <HardHat className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{project.team.projectManager.name}</p>
                        <p className="text-sm text-muted-foreground">Project Manager</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Project related documents and files</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              {project.documents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No documents uploaded yet</p>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Materials</CardTitle>
                <CardDescription>Construction materials tracking</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Material
              </Button>
            </CardHeader>
            <CardContent>
              {project.materials.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Truck className="h-12 w-12 mx-auto mb-4" />
                  <p>No materials added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Material list would go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily-logs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daily Logs</CardTitle>
                <CardDescription>Site progress and daily reports</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Log
              </Button>
            </CardHeader>
            <CardContent>
              {project.dailyLogs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="h-12 w-12 mx-auto mb-4" />
                  <p>No daily logs recorded yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Daily logs would go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Estimated Budget</span>
                    <span className="font-bold">{formatCurrency(project.budget.estimated)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Approved Budget</span>
                    <span className="font-bold">{formatCurrency(project.budget.approved || project.budget.estimated)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Spent</span>
                    <span className="font-bold text-orange-600">{formatCurrency(project.budget.spent)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm font-medium">Remaining</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency((project.budget.approved || project.budget.estimated) - project.budget.spent)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Project related communications and meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                <p>Communication log coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}