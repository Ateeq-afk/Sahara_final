import crypto from 'crypto'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

// CSRF token generation and validation
export class CSRF {
  private static readonly TOKEN_LENGTH = 32
  private static readonly TOKEN_KEY = 'csrf-token'
  
  // Generate a CSRF token
  static generateToken(): string {
    return crypto.randomBytes(this.TOKEN_LENGTH).toString('hex')
  }
  
  // Validate CSRF token from request
  static async validateToken(request: NextRequest): Promise<boolean> {
    // Skip CSRF check for:
    // 1. GET requests (they should be safe/idempotent)
    // 2. Requests without a session (public endpoints)
    if (request.method === 'GET') {
      return true
    }
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return true // Public endpoint, no CSRF needed
    }
    
    // Get token from header or body
    const headerToken = request.headers.get('x-csrf-token')
    const body = await request.clone().json().catch(() => ({}))
    const bodyToken = body.csrfToken
    
    const providedToken = headerToken || bodyToken
    
    if (!providedToken) {
      return false
    }
    
    // In a real implementation, you'd validate against a stored token
    // For now, we'll check if it's a valid format
    return providedToken.length === this.TOKEN_LENGTH * 2 && /^[a-f0-9]+$/i.test(providedToken)
  }
  
  // Middleware to check CSRF token
  static async middleware(request: NextRequest): Promise<Response | null> {
    const isValid = await this.validateToken(request)
    
    if (!isValid) {
      return new Response(
        JSON.stringify({
          error: 'Invalid CSRF token',
          message: 'Your request could not be verified. Please refresh the page and try again.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
    
    return null
  }
}