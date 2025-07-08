'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  lowQualitySrc?: string
  aspectRatio?: number
}

export default function LazyImage({
  src,
  alt,
  className,
  lowQualitySrc,
  aspectRatio,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  if (error) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center",
          className
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Low quality placeholder */}
      {lowQualitySrc && !isLoaded && (
        <div className="absolute inset-0">
          <Image
            src={lowQualitySrc}
            alt={alt}
            fill
            className="object-cover blur-xl scale-110"
            priority
            {...props}
          />
        </div>
      )}

      {/* Skeleton loader */}
      {!isLoaded && !lowQualitySrc && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          quality={85}
          {...props}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            props.fill ? "" : className
          )}
        />
      </motion.div>
    </div>
  )
}