import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  User,
  Building2,
  Filter,
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

async function getMessages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/contact?limit=50`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return {
      success: false,
      data: [],
      pagination: { total: 0 }
    };
  }
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  read: 'bg-gray-100 text-gray-800',
  responded: 'bg-green-100 text-green-800',
  follow_up: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-600'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const preferredContactIcons = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageSquare
};

export default async function MessagesPage() {
  const messagesData = await getMessages();
  const { data: messages, pagination } = messagesData;

  const totalMessages = pagination?.total || 0;
  const newMessages = messages.filter((msg: any) => msg.status === 'new').length;
  const unreadMessages = messages.filter((msg: any) => msg.status === 'new' || msg.status === 'follow_up').length;
  const respondedMessages = messages.filter((msg: any) => msg.status === 'responded').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Manage contact form submissions and customer inquiries</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              All contact submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{newMessages}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Eye className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              Pending response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responded</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{respondedMessages}</div>
            <p className="text-xs text-muted-foreground">
              Success rate: {totalMessages > 0 ? Math.round((respondedMessages / totalMessages) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            Showing {messages.length} of {totalMessages} messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message: any) => {
                const PreferredIcon = preferredContactIcons[message.preferredContact as keyof typeof preferredContactIcons] || Mail;
                
                return (
                  <div key={message._id} className="border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-6">
                      {/* Message Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg text-gray-900">{message.name}</h3>
                              <Badge className={statusColors[message.status as keyof typeof statusColors] || statusColors.new}>
                                {message.status || 'new'}
                              </Badge>
                              {message.priority && (
                                <Badge className={priorityColors[message.priority as keyof typeof priorityColors]}>
                                  {message.priority}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {message.phone}
                              </div>
                              {message.company && (
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {message.company}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {message.preferredContact && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <PreferredIcon className="h-3 w-3" />
                              {message.preferredContact}
                            </div>
                          )}
                          <div className="text-right">
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      {message.subject && (
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900">Subject: {message.subject}</h4>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {message.message}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {message.status === 'new' && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Mark as Read
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm">
                            Convert to Lead
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-500 mb-4">Contact form submissions will appear here</p>
              <Button asChild>
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Go to Contact Page
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">
                {messages.filter((msg: any) => {
                  const msgDate = new Date(msg.createdAt);
                  const today = new Date();
                  return msgDate.toDateString() === today.toDateString();
                }).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Messages received today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Urgent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">
                {messages.filter((msg: any) => msg.priority === 'urgent' || msg.priority === 'high').length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">High priority messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {messages.filter((msg: any) => {
                  const msgDate = new Date(msg.createdAt);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return msgDate >= weekAgo;
                }).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">New messages this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}