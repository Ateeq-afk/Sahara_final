import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Project from '@/src/models/Project'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    // Find all projects for this customer
    const projects = await (Project as any).find({ 
      'customer.id': session.user.id,
      isActive: true 
    }, 'name projectNumber documents').lean()

    // Extract all documents from all projects
    const allDocuments = []
    
    projects.forEach(project => {
      if (project.documents && project.documents.length > 0) {
        project.documents.forEach(doc => {
          allDocuments.push({
            _id: doc._id,
            name: doc.name,
            type: doc.type,
            url: doc.url,
            uploadedAt: doc.uploadedAt,
            version: doc.version,
            tags: doc.tags || [],
            project: {
              _id: project._id,
              name: project.name,
              projectNumber: project.projectNumber
            }
          })
        })
      }
    })

    // Sort documents by upload date (newest first)
    allDocuments.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json({
      documents: allDocuments,
      totalCount: allDocuments.length
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}