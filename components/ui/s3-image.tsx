'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getS3Url } from '@/lib/aws/s3-upload'

interface S3ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  sizes?: string
  style?: React.CSSProperties
}

export function S3Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  quality = 85,
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  sizes,
  style,
}: S3ImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Convert relative paths to S3 URLs
  const imageUrl = getS3Url(src)
  
  const handleError = () => {
    setError(true)
    setLoading(false)
    onError?.()
  }
  
  const handleLoad = () => {
    setLoading(false)
    onLoad?.()
  }
  
  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-gray-400">Image not found</span>
      </div>
    )
  }
  
  return (
    <>
      {loading && !fill && (
        <div 
          className={`bg-gray-200 animate-pulse ${className}`}
          style={{ width, height, ...style }}
        />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        style={style}
      />
    </>
  )
}