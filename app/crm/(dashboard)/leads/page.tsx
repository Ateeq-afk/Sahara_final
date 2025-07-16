import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  AlertCircle,
  UserPlus,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

async function getLeads() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/crm/leads?limit=20`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return {
      success: false,
      leads: [],
      pagination: { count: 0 },
      statusSummary: {}
    };
  }
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  proposal_sent: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-orange-100 text-orange-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-red-100 text-red-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

export default async function LeadsPage() {
  const leadsData = await getLeads();
  const { leads, pagination, statusSummary } = leadsData;

  const totalLeads = pagination?.count || 0;
  const newLeads = statusSummary?.new || 0;
  const qualifiedLeads = statusSummary?.qualified || 0;
  const wonLeads = statusSummary?.won || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2">Manage and track your sales leads</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="w-full sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              All time leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeads}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">
              Ready for proposals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wonLeads}</div>
            <p className="text-xs text-muted-foreground">
              Success rate: {totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>
            Showing {leads.length} of {totalLeads} leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <div className="space-y-4 overflow-x-auto">
              {leads.map((lead: any) => (
                <div key={lead._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-medium truncate">{lead.name}</h3>
                        <Badge className={priorityColors[lead.priority as keyof typeof priorityColors]}>
                          {lead.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1 truncate">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="truncate">
                          Interested in: <span className="font-medium">{lead.interestedService}</span>
                        </div>
                        {lead.budget && (
                          <div className="truncate">
                            Budget: ₹{lead.budget.min?.toLocaleString()} - ₹{lead.budget.max?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                    <div className="flex flex-col sm:text-right">
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="truncate">{formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first lead</p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Follow-ups Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">
                {leads.filter((lead: any) => 
                  lead.nextFollowUpDate && 
                  new Date(lead.nextFollowUpDate).toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Leads requiring follow-up today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">
                {leads.filter((lead: any) => lead.priority === 'urgent' || lead.priority === 'high').length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">High priority leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {leads.filter((lead: any) => {
                  const leadDate = new Date(lead.createdAt);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return leadDate >= weekAgo;
                }).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">New leads this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}