'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  Building2,
  Home,
  Wrench,
  Palette
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

interface Project {
  _id: string
  projectNumber: string
  name: string
  type: string
  status: string
  priority: string
  customer: {
    name: string
    email: string
  }
  timeline: {
    startDate: string
    estimatedEndDate: string
  }
  budget: {
    estimated: number
    spent: number
  }
  overallProgress?: number
  team?: {
    projectManager?: {
      name: string
    }
  }
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

const typeIcons = {
  residential: Home,
  commercial: Building2,
  renovation: Wrench,
  interior: Palette
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [statusFilter])

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      
      const response = await fetch(`/api/crm/projects?${params}`)
      if (!response.ok) throw new Error('Failed to fetch projects')
      
      const data = await response.json()
      setProjects(data.data.projects)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 20) return 'bg-orange-500'
    return 'bg-red-500'
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all construction projects
          </p>
        </div>
        <Link href="/crm/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="on_hold">On Hold</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const Icon = typeIcons[project.type as keyof typeof typeIcons] || Building2
              const progress = project.overallProgress || 0
              const budgetSpent = (project.budget.spent / project.budget.estimated) * 100

              return (
                <Link key={project._id} href={`/crm/projects/${project._id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            {project.name}
                          </CardTitle>
                          <CardDescription>{project.projectNumber}</CardDescription>
                        </div>
                        <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                          {project.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className={statusColors[project.status as keyof typeof statusColors]}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {project.customer.name}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getProgressColor(progress)}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(project.timeline.startDate), 'MMM dd')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(project.timeline.estimatedEndDate), 'MMM dd')}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Budget Used</span>
                          <span>{budgetSpent.toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>{formatCurrency(project.budget.spent)}</span>
                          <span className="text-muted-foreground">
                            of {formatCurrency(project.budget.estimated)}
                          </span>
                        </div>
                      </div>

                      {project.team?.projectManager && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{project.team.projectManager.name}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="p-12">
              <div className="text-center space-y-3">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-sm text-muted-foreground">
                  {statusFilter === 'all' 
                    ? 'Create your first project to get started'
                    : `No projects with status "${statusFilter.replace('_', ' ')}"`
                  }
                </p>
                {statusFilter === 'all' && (
                  <Link href="/crm/projects/new">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}