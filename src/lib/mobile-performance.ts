// Mobile Performance Monitoring and Optimization

// Check if device is low-end based on various factors
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check available memory (in GB)
  const deviceMemory = (navigator as any).deviceMemory
  if (deviceMemory && deviceMemory < 4) return true
  
  // Check CPU cores
  const hardwareConcurrency = navigator.hardwareConcurrency
  if (hardwareConcurrency && hardwareConcurrency < 4) return true
  
  // Check connection type
  const connection = (navigator as any).connection
  if (connection) {
    const effectiveType = connection.effectiveType
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return true
  }
  
  return false
}

// Reduce motion for users who prefer it or on low-end devices
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReducedMotion || isLowEndDevice()
}

// Get optimized image quality based on connection
export function getOptimizedImageQuality(): number {
  if (typeof window === 'undefined') return 75
  
  const connection = (navigator as any).connection
  if (!connection) return 75
  
  const effectiveType = connection.effectiveType
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 40
    case '3g':
      return 60
    case '4g':
      return 75
    default:
      return 85
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImages() {
  if (typeof window === 'undefined') return
  
  const images = document.querySelectorAll('img[data-lazy]')
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-lazy')
        if (src) {
          img.src = src
          img.removeAttribute('data-lazy')
          observer.unobserve(img)
        }
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })
  
  images.forEach(img => imageObserver.observe(img))
}

// Debounce function for scroll and resize events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Request idle callback polyfill
export const requestIdleCallback = 
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => {
        const start = Date.now()
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          } as IdleDeadline)
        }, 1)
      }

// Cancel idle callback polyfill
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : clearTimeout

// Prefetch critical resources
export function prefetchCriticalResources(urls: string[]) {
  if (typeof window === 'undefined') return
  
  requestIdleCallback(() => {
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })
  })
}

// Monitor and report performance metrics
export function reportPerformanceMetrics() {
  if (typeof window === 'undefined' || !('performance' in window)) return
  
  // Report Core Web Vitals
  try {
    const paintEntries = performance.getEntriesByType('paint')
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    
    if (fcpEntry && typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'first_contentful_paint',
        value: Math.round(fcpEntry.startTime),
        event_category: 'Web Vitals'
      })
    }
  } catch (error) {
    console.error('Error reporting performance metrics:', error)
  }
}