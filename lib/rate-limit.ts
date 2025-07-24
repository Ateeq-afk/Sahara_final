import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// Create Redis instance (you'll need to add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to .env)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Create different rate limiters for different endpoints
export const rateLimiters = {
  // General API rate limit: 100 requests per minute
  api: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api',
      })
    : null,

  // Auth endpoints: 5 requests per minute (stricter for security)
  auth: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        analytics: true,
        prefix: 'ratelimit:auth',
      })
    : null,

  // Contact/Quote forms: 3 requests per minute
  forms: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 m'),
        analytics: true,
        prefix: 'ratelimit:forms',
      })
    : null,

  // File uploads: 10 requests per hour
  uploads: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 h'),
        analytics: true,
        prefix: 'ratelimit:uploads',
      })
    : null,
}

// Helper function to get client IP
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip')
  return ip || '127.0.0.1'
}

// Rate limit middleware
export async function rateLimit(
  req: NextRequest,
  limiter: keyof typeof rateLimiters = 'api'
): Promise<NextResponse | null> {
  // Skip rate limiting in development or if Redis is not configured
  if (process.env.NODE_ENV === 'development' || !rateLimiters[limiter]) {
    return null
  }

  const identifier = getClientIp(req)
  const rateLimiter = rateLimiters[limiter]

  if (!rateLimiter) {
    return null
  }

  const { success, pending, limit, reset, remaining } = await rateLimiter.limit(identifier)

  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Please try again later',
        retryAfter: Math.floor((reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
          'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
        },
      }
    )
  }

  return null
}

// Middleware wrapper for API routes
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limiterType: keyof typeof rateLimiters = 'api'
) {
  return async (req: NextRequest) => {
    const rateLimitResponse = await rateLimit(req, limiterType)
    if (rateLimitResponse) {
      return rateLimitResponse
    }
    return handler(req)
  }
}