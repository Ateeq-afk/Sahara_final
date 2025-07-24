import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws/s3-upload'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'images'
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined
    const format = (formData.get('format') as 'webp' | 'avif' | 'jpeg' | 'png') || 'webp'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const originalName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')
    const key = `${originalName}-${timestamp}-${randomString}`

    const url = await uploadToS3(file, key, {
      folder,
      resize: width || height ? { width, height, quality: 85 } : undefined,
      format,
    })

    return NextResponse.json({ url, key: `${folder}/${key}.${format}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}