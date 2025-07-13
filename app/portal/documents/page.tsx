import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const documents = [
    {
      id: 1,
      name: 'Project Contract - Villa Construction',
      type: 'Contract',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      status: 'Final'
    },
    {
      id: 2,
      name: 'Building Permits',
      type: 'Legal',
      uploadDate: '2024-01-20',
      size: '1.8 MB',
      status: 'Approved'
    },
    {
      id: 3,
      name: 'Project Timeline & Milestones',
      type: 'Planning',
      uploadDate: '2024-02-01',
      size: '956 KB',
      status: 'Updated'
    }
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-2">Access all your project documents and contracts</p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg leading-tight">{doc.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {doc.type} • {doc.size}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doc.status === 'Final' ? 'bg-green-100 text-green-800' :
                    doc.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600 mb-6">Documents will appear here once your project begins</p>
            <Link href="/portal/support">
              <Button>Contact Support</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}