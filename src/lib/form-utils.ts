import { useEffect, useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

// Auto-save form data to localStorage
export function useFormPersistence<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  storageKey: string
) {
  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        Object.keys(parsed).forEach(key => {
          if (parsed[key] !== undefined && parsed[key] !== null) {
            form.setValue(key as any, parsed[key])
          }
        })
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }
  }, [form, storageKey])

  // Save data on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(storageKey, JSON.stringify(values))
    })
    return () => subscription.unsubscribe()
  }, [form, storageKey])

  // Clear saved data
  const clearSavedData = useCallback(() => {
    localStorage.removeItem(storageKey)
  }, [storageKey])

  return { clearSavedData }
}

// Track form analytics
export function trackFormEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'form_interaction',
      ...parameters
    })
  }
}

// Phone number formatting
export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, '$1-$2')
  }
  
  return cleaned.slice(0, 10)
}

// Validate Indian phone number
export function validateIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)
}

// Debounce function for auto-save
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Check if user is about to leave
export function useExitIntent(callback: () => void) {
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        callback()
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        timeout = setTimeout(callback, 5000)
      } else {
        clearTimeout(timeout)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(timeout)
    }
  }, [callback])
}

// Format currency for Indian Rupees
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Calculate estimated project cost
export function calculateEstimate(
  serviceType: string,
  projectType: string,
  propertySize: string
): { min: number; max: number } {
  const baseRates = {
    construction: {
      residential: { min: 1500, max: 2500 },
      commercial: { min: 1800, max: 3000 },
      villa: { min: 2000, max: 3500 },
      apartment: { min: 1400, max: 2200 },
    },
    interior: {
      residential: { min: 800, max: 1500 },
      commercial: { min: 1000, max: 2000 },
      villa: { min: 1200, max: 2500 },
      apartment: { min: 700, max: 1200 },
    },
    renovation: {
      residential: { min: 600, max: 1200 },
      commercial: { min: 800, max: 1500 },
      villa: { min: 1000, max: 1800 },
      apartment: { min: 500, max: 1000 },
    },
  }

  const sizeMultiplier = {
    'under-1000': 800,
    '1000-2000': 1500,
    '2000-3000': 2500,
    'above-3000': 3500,
  }[propertySize] || 1500

  const rates = baseRates[serviceType as keyof typeof baseRates]?.[
    projectType as keyof typeof baseRates.construction
  ] || { min: 1000, max: 2000 }

  return {
    min: Math.round((rates.min * sizeMultiplier) / 100000) * 100000,
    max: Math.round((rates.max * sizeMultiplier) / 100000) * 100000,
  }
}