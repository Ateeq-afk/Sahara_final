import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { 
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  ArrowRight,
  Download,
  Phone
} from 'lucide-react'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'
import { format, differenceInDays } from 'date-fns'

async function getCustomerProjects(customerId: string) {
  await dbConnect()
  
  const projects = await Project.find({ 
    'customer.id': customerId,
    isActive: true 
  })
    .sort({ createdAt: -1 })
    .lean()

  return projects
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-800',
  approved: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  on_hold: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default async function CustomerProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const projects = await getCustomerProjects(session.user.id)

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
        <h1 className="text-3xl font-bold">My Projects</h1>
        <p className="text-muted-foreground mt-1">
          Track the progress of all your construction projects
        </p>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
            <Link href="/quote">
              <Button className="mt-4">Get a Quote</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => {
            const progress = project.overallProgress || 0
            const daysRemaining = differenceInDays(
              new Date(project.timeline.estimatedEndDate),
              new Date()
            )
            const budgetUsed = (project.budget.spent / project.budget.estimated) * 100

            return (
              <Card key={project._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.projectNumber} • {project.type}
                      </CardDescription>
                    </div>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Project Progress</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Completion</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm font-medium">
                          {format(new Date(project.timeline.startDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Completion</p>
                        <p className="text-sm font-medium">
                          {format(new Date(project.timeline.estimatedEndDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="text-sm font-medium">
                          {formatCurrency(project.budget.estimated)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">
                          {project.address.area}, {project.address.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {project.status === 'in_progress' && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Current Phase</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Foundation Work - 75% Complete
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                          </p>
                          <p className="text-xs text-muted-foreground">Remaining</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Link href={`/portal/projects/${project._id}`} className="flex-1">
                      <Button className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}