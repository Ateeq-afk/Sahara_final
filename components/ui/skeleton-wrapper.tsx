"use client"

import { ReactNode } from 'react'

interface SkeletonWrapperProps {
  isLoading: boolean
  skeleton: ReactNode
  children: ReactNode
  count?: number
}

export function SkeletonWrapper({ 
  isLoading, 
  skeleton, 
  children, 
  count = 1 
}: SkeletonWrapperProps) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>{skeleton}</div>
        ))}
      </>
    )
  }
  
  return <>{children}</>
}