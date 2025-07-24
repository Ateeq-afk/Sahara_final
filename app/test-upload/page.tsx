'use client'

import { useState } from 'react'
import Image from 'next/image'
import S3Image from '@/components/common/S3Image'

export default function TestUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'test-uploads')
    formData.append('width', '800')
    formData.append('height', '600')
    formData.append('format', 'webp')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      setUploadedUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">S3 Upload Test</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <label className="block">
            <span className="text-lg font-medium mb-2 block">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50"
            />
          </label>
          
          {uploading && (
            <p className="mt-2 text-sm text-gray-600">Uploading...</p>
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Result Section */}
        {uploadedUrl && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Upload Successful!</h3>
              <p className="text-sm text-gray-600 break-all">
                URL: {uploadedUrl}
              </p>
            </div>

            {/* Display with S3Image component */}
            <div>
              <h3 className="font-medium mb-2">Using S3Image Component:</h3>
              <S3Image
                src={uploadedUrl}
                alt="Uploaded test image"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Display with regular Image component */}
            <div>
              <h3 className="font-medium mb-2">Using Next.js Image Component:</h3>
              <Image
                src={uploadedUrl}
                alt="Uploaded test image"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Environment Status */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Environment Status:</h3>
          <ul className="text-sm space-y-1">
            <li>AWS Region: {process.env.NEXT_PUBLIC_AWS_REGION || 'Not set'}</li>
            <li>S3 Bucket: {process.env.NEXT_PUBLIC_S3_BUCKET_NAME || 'Not set'}</li>
            <li>S3 URL: {process.env.NEXT_PUBLIC_S3_IMAGE_URL || 'Not set'}</li>
            <li>CloudFront: {process.env.NEXT_PUBLIC_CLOUDFRONT_URL || 'Not configured'}</li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Note:</h3>
          <p className="text-sm">
            This page requires admin authentication. Make sure you're logged in as admin.
            If upload fails, check your AWS credentials in .env.local
          </p>
        </div>
      </div>
    </div>
  )
}