'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MessageSquare, Clock, HelpCircle, FileText, Loader2, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { supportTicketSchema, type SupportTicketData } from '@/lib/form-schemas'
import { useFormValidation } from '@/hooks/use-form-validation'
import { formatDistanceToNow } from 'date-fns'

interface Ticket {
  id: string
  ticketId: string
  subject: string
  priority: string
  category: string
  status: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function SupportPage() {
  const { data: session, status } = useSession()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(true)
  
  const [formData, setFormData] = useState<SupportTicketData>({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    projectId: '',
    priority: 'medium',
    category: 'general',
    subject: '',
    description: '',
  })

  // Fetch user tickets
  const fetchTickets = async () => {
    try {
      setIsLoadingTickets(true)
      const response = await fetch('/api/portal/support')
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets')
      }
      
      const data = await response.json()
      if (data.success) {
        setTickets(data.tickets)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setIsLoadingTickets(false)
    }
  }

  // Fetch tickets on component mount
  useEffect(() => {
    if (session?.user) {
      fetchTickets()
    }
  }, [session])

  // Form submission handler
  const handleSubmit = async (data: SupportTicketData) => {
    const response = await fetch('/api/portal/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create support ticket')
    }
    
    const result = await response.json()
    
    // Refresh tickets list
    await fetchTickets()
    
    // Reset form
    setFormData({
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      projectId: '',
      priority: 'medium',
      category: 'general',
      subject: '',
      description: '',
    })
  }

  const formValidation = useFormValidation({
    schema: supportTicketSchema,
    onSubmit: handleSubmit,
    onSuccess: () => {
      console.log('Support ticket created successfully!')
    },
    resetOnSuccess: false,
  })
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  
  if (!session) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Please log in to access support.</p>
      </div>
    )
  }

  // Helper functions
  const handleInputChange = (field: keyof SupportTicketData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    formValidation.handleFieldChange(field, value)
  }
  
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    await formValidation.handleSubmit(formData)
  }

  // Status badge styling
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { variant: 'default' as const, icon: AlertCircle, color: 'text-blue-600' },
      in_progress: { variant: 'secondary' as const, icon: Clock, color: 'text-orange-600' },
      resolved: { variant: 'outline' as const, icon: CheckCircle, color: 'text-green-600' },
      closed: { variant: 'outline' as const, icon: XCircle, color: 'text-gray-600' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${config.color}`} />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    )
  }

  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { variant: 'outline' as const, color: 'text-gray-600' },
      medium: { variant: 'secondary' as const, color: 'text-blue-600' },
      high: { variant: 'destructive' as const, color: 'text-red-600' }
    }
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    
    return (
      <Badge variant={config.variant}>
        {priority.toUpperCase()}
      </Badge>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support</h1>
        <p className="text-gray-600 mt-2">Get help with your project or account</p>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-50 rounded-lg w-fit mx-auto mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-gray-600 mb-4">Speak directly with our team</p>
            <a href="tel:+919591837216" className="text-blue-600 font-medium hover:underline">
              +91 95918 37216
            </a>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-50 rounded-lg w-fit mx-auto mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Send us your questions</p>
            <a href="mailto:support@saharadevelopers.in" className="text-green-600 font-medium hover:underline">
              support@saharadevelopers.in
            </a>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-purple-50 rounded-lg w-fit mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
            <Button variant="outline" size="sm">Start Chat</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>Submit a new support request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={formValidation.hasFieldError('name') ? 'border-red-500' : ''}
                />
                {formValidation.hasFieldError('name') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('name')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={formValidation.hasFieldError('email') ? 'border-red-500' : ''}
                />
                {formValidation.hasFieldError('email') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('email')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={formValidation.hasFieldError('phone') ? 'border-red-500' : ''}
                />
                {formValidation.hasFieldError('phone') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('phone')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={formValidation.hasFieldError('subject') ? 'border-red-500' : ''}
                />
                {formValidation.hasFieldError('subject') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('subject')}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <select 
                  id="priority" 
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formValidation.hasFieldError('priority') ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {formValidation.hasFieldError('priority') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('priority')}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select 
                  id="category" 
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formValidation.hasFieldError('category') ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="general">General Question</option>
                  <option value="project">Project Related</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical Issue</option>
                </select>
                {formValidation.hasFieldError('category') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('category')}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide detailed information about your request..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={formValidation.hasFieldError('description') ? 'border-red-500' : ''}
                />
                {formValidation.hasFieldError('description') && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formValidation.getFieldError('description')}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={formValidation.isSubmitting}
              >
                {formValidation.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
            <CardDescription>Track your submitted requests</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTickets ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">#{ticket.ticketId}</span>
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                            <span>Created: {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
                            <span>Updated: {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="h-8 w-8 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600">No support tickets yet</p>
                    <p className="text-sm text-gray-600">Create a ticket above if you need help</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium mb-2">How can I track my project progress?</h4>
              <p className="text-sm text-gray-600">Visit the 'My Projects' section to see real-time updates, milestones, and progress photos.</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium mb-2">When are payments due?</h4>
              <p className="text-sm text-gray-600">Check the 'Payments' section for your complete payment schedule with due dates.</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium mb-2">How do I request changes?</h4>
              <p className="text-sm text-gray-600">Submit a support ticket with 'Project Related' category for any change requests.</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium mb-2">Can I download project documents?</h4>
              <p className="text-sm text-gray-600">Yes, all approved documents are available in the 'Documents' section for download.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}