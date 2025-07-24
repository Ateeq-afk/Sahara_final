import { useEffect, useState } from 'react'

export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string>('')

  useEffect(() => {
    // Generate a CSRF token on client side
    // In production, this should be fetched from the server
    const generateToken = () => {
      const array = new Uint8Array(32)
      crypto.getRandomValues(array)
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
    }

    const token = generateToken()
    setCSRFToken(token)

    // Store in session storage for consistency across requests
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrf-token', token)
    }
  }, [])

  // Helper function to add CSRF token to fetch requests
  const fetchWithCSRF = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers)
    headers.set('x-csrf-token', csrfToken)

    return fetch(url, {
      ...options,
      headers,
    })
  }

  return { csrfToken, fetchWithCSRF }
}