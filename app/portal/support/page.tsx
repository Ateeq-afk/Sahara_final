import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MessageSquare, Clock, HelpCircle, FileText } from 'lucide-react'
import Link from 'next/link'

export default async function SupportPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const tickets = [
    {
      id: 'SUP-001',
      subject: 'Question about material delivery schedule',
      status: 'Open',
      created: '2024-01-28',
      lastUpdate: '2024-01-29',
      priority: 'Medium'
    },
    {
      id: 'SUP-002',
      subject: 'Request for additional electrical points',
      status: 'In Progress',
      created: '2024-01-25',
      lastUpdate: '2024-01-30',
      priority: 'High'
    }
  ]

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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select 
                id="priority" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Question</option>
                <option value="project">Project Related</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical Issue</option>
                <option value="materials">Materials</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Please provide detailed information about your request..."
                rows={4}
              />
            </div>
            
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Existing Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
            <CardDescription>Track your submitted requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">#{ticket.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                            ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                          <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No support tickets yet</p>
                  <p className="text-sm text-gray-400">Create a ticket above if you need help</p>
                </div>
              )}
            </div>
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