'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye, Calendar, Loader2, AlertCircle, FolderOpen } from 'lucide-react'
import Link from 'next/link'

interface Document {
  _id: string
  name: string
  type: 'contract' | 'permit' | 'drawing' | 'invoice' | 'report' | 'other'
  url: string
  uploadedAt: string
  version: number
  tags: string[]
  project: {
    _id: string
    name: string
    projectNumber: string
  }
}

interface DocumentsResponse {
  documents: Document[]
  totalCount: number
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/portal/documents')
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents')
      }
      
      const data: DocumentsResponse = await response.json()
      setDocuments(data.documents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return '📄'
      case 'permit': return '🏛️'
      case 'drawing': return '📐'
      case 'invoice': return '💰'
      case 'report': return '📊'
      default: return '📁'
    }
  }

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-800'
      case 'permit': return 'bg-green-100 text-green-800'
      case 'drawing': return 'bg-purple-100 text-purple-800'
      case 'invoice': return 'bg-yellow-100 text-yellow-800'
      case 'report': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, '_blank')
    }
  }

  const handleView = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Documents</h1>
            <p className="text-xl text-gray-600 mt-2">Access all your project documents and contracts</p>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <p className="text-gray-600">Loading your documents...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Documents</h1>
            <p className="text-xl text-gray-600 mt-2">Access all your project documents and contracts</p>
          </div>
          
          <Card className="border-red-200 bg-red-50">
            <CardContent className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error loading documents</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <Button onClick={fetchDocuments} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-8 p-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Documents</h1>
          <p className="text-xl text-gray-600 mt-2">Access all your project documents and contracts</p>
        </div>

        {documents.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {documents.length} document{documents.length !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="grid gap-6">
              {documents.map((doc) => (
                <Card key={doc._id} className="hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-2xl">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold leading-tight text-gray-900">
                            {doc.name}
                          </CardTitle>
                          <CardDescription className="mt-1 text-gray-600">
                            {doc.project.name} • {doc.project.projectNumber}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDocumentTypeColor(doc.type)}`}>
                          {getDocumentTypeIcon(doc.type)} {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                        </span>
                        {doc.version > 1 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            v{doc.version}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleView(doc)}
                          className="flex-1 sm:flex-none"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownload(doc)}
                          className="flex-1 sm:flex-none"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No documents yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Documents will appear here once your project begins and files are uploaded by your project team.
              </p>
              <Link href="/portal/support">
                <Button size="lg">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}