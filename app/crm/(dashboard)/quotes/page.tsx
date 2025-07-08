import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  User,
  Building2,
  Filter,
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

async function getQuotes() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/quotes?limit=50`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return {
      success: false,
      quotes: [],
      pagination: { count: 0 }
    };
  }
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-purple-100 text-purple-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const projectTypeIcons = {
  construction: Building2,
  interior: FileText,
  renovation: TrendingUp,
  consultation: User
};

export default async function QuotesPage() {
  const quotesData = await getQuotes();
  const { quotes, pagination } = quotesData;

  const totalQuotes = pagination?.count || 0;
  const pendingQuotes = quotes.filter((quote: any) => quote.status === 'pending').length;
  const approvedQuotes = quotes.filter((quote: any) => quote.status === 'approved').length;
  const totalValue = quotes.reduce((sum: number, quote: any) => sum + (quote.estimatedCost || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600 mt-2">Manage project quotes and proposals</p>
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
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              All quote requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Conversion: {totalQuotes > 0 ? Math.round((approvedQuotes / totalQuotes) * 100) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹{(totalValue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">
              Pipeline value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>
            Showing {quotes.length} of {totalQuotes} quotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quotes.length > 0 ? (
            <div className="space-y-4">
              {quotes.map((quote: any) => {
                const ProjectIcon = projectTypeIcons[quote.projectType as keyof typeof projectTypeIcons] || Building2;
                
                return (
                  <div key={quote._id} className="border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-6">
                      {/* Quote Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center">
                            <ProjectIcon className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg text-gray-900">{quote.name}</h3>
                              <Badge className={statusColors[quote.status as keyof typeof statusColors] || statusColors.pending}>
                                {quote.status || 'pending'}
                              </Badge>
                              {quote.priority && (
                                <Badge className={priorityColors[quote.priority as keyof typeof priorityColors]}>
                                  {quote.priority}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {quote.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {quote.phone}
                              </div>
                              {quote.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {quote.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{quote.estimatedCost ? (quote.estimatedCost / 100000).toFixed(1) + 'L' : 'TBD'}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(quote.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-500">Project Type</p>
                          <p className="font-medium capitalize">{quote.projectType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Property Type</p>
                          <p className="font-medium capitalize">{quote.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Area</p>
                          <p className="font-medium">{quote.area} sq ft</p>
                        </div>
                        {quote.budget && (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Budget Range</p>
                              <p className="font-medium">
                                ₹{(quote.budget.min / 100000).toFixed(1)}L - ₹{(quote.budget.max / 100000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Timeline</p>
                              <p className="font-medium">{quote.timeline}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Expected Start</p>
                              <p className="font-medium">
                                {quote.expectedStartDate ? new Date(quote.expectedStartDate).toLocaleDateString() : 'TBD'}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Requirements */}
                      {quote.requirements && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Requirements</p>
                          <div className="bg-white border rounded-lg p-3">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {quote.requirements}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {quote.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Send Quote
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call Client
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm">
                            Generate Proposal
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
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
              <p className="text-gray-500 mb-4">Quote requests will appear here</p>
              <Button asChild>
                <Link href="/quote">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Go to Quote Page
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">
                {quotes.filter((quote: any) => {
                  const quoteDate = new Date(quote.createdAt);
                  const thisMonth = new Date();
                  return quoteDate.getMonth() === thisMonth.getMonth() && 
                         quoteDate.getFullYear() === thisMonth.getFullYear();
                }).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Quotes this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">High Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {quotes.filter((quote: any) => quote.estimatedCost && quote.estimatedCost > 1000000).length}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Above ₹10L quotes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg. Quote Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <span className="text-2xl font-bold">
                ₹{quotes.length > 0 ? (totalValue / quotes.length / 100000).toFixed(1) + 'L' : '0L'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Average project value</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}