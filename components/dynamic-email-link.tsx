"use client"

import React from 'react'

interface DynamicEmailLinkProps {
  prefix?: string
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function DynamicEmailLink({ 
  prefix = 'contact', 
  className = '', 
  children,
  onClick 
}: DynamicEmailLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick(e)
    } else {
      window.location.href = `mailto:${prefix}@${window.location.hostname.replace('www.', '')}`
    }
  }

  return (
    <a href="#" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}