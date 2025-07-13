'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface S3ImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallback?: string
  loading?: 'lazy' | 'eager'
}

export default function S3Image({ 
  src, 
  alt, 
  fallback = '/images/placeholder.svg',
  loading = 'lazy',
  className = '',
  ...props 
}: S3ImageProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Construct full S3 URL if src is a relative path
  const getImageUrl = (imagePath: string) => {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // If it's a local path, return as is
    if (imagePath.startsWith('/')) {
      return imagePath
    }
    
    // Construct S3 URL from environment variable
    const s3BaseUrl = process.env.NEXT_PUBLIC_S3_IMAGE_URL
    if (s3BaseUrl) {
      return `${s3BaseUrl.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`
    }
    
    // Fallback to local path
    return `/${imagePath.replace(/^\//, '')}`
  }

  const imageUrl = error ? fallback : getImageUrl(src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  )
}