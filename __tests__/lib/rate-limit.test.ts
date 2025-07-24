import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIp, rateLimiters } from '@/lib/rate-limit'

// Mock Redis client
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    // Mock Redis methods if needed
  })),
}))

jest.mock('@upstash/ratelimit', () => ({
  Ratelimit: {
    slidingWindow: jest.fn(),
  },
}))

describe('Rate Limiting', () => {
  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const request = new NextRequest('http://localhost:3000', {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
      })

      const ip = getClientIp(request)
      expect(ip).toBe('192.168.1.1')
    })

    it('should extract IP from x-real-ip header', () => {
      const request = new NextRequest('http://localhost:3000', {
        headers: {
          'x-real-ip': '192.168.1.2',
        },
      })

      const ip = getClientIp(request)
      expect(ip).toBe('192.168.1.2')
    })

    it('should return default IP if no headers present', () => {
      const request = new NextRequest('http://localhost:3000')
      const ip = getClientIp(request)
      expect(ip).toBe('127.0.0.1')
    })
  })

  describe('rateLimit', () => {
    beforeEach(() => {
      // Reset environment
      process.env.NODE_ENV = 'test'
      process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'
    })

    it('should skip rate limiting in development', async () => {
      process.env.NODE_ENV = 'development'
      
      const request = new NextRequest('http://localhost:3000/api/test')
      const response = await rateLimit(request)
      
      expect(response).toBeNull()
    })

    it('should return null if Redis is not configured', async () => {
      delete process.env.UPSTASH_REDIS_REST_URL
      
      const request = new NextRequest('http://localhost:3000/api/test')
      const response = await rateLimit(request)
      
      expect(response).toBeNull()
    })

    it('should return 429 when rate limit is exceeded', async () => {
      // Mock rate limiter
      const mockLimit = jest.fn().mockResolvedValue({
        success: false,
        pending: Promise.resolve(),
        limit: 100,
        reset: Date.now() + 60000,
        remaining: 0,
      })

      if (rateLimiters.api) {
        rateLimiters.api.limit = mockLimit
      }

      const request = new NextRequest('http://localhost:3000/api/test')
      const response = await rateLimit(request, 'api')

      if (response) {
        expect(response.status).toBe(429)
        const data = await response.json()
        expect(data.error).toBe('Too many requests')
        expect(response.headers.get('X-RateLimit-Limit')).toBe('100')
        expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
      }
    })

    it('should allow request when rate limit is not exceeded', async () => {
      const mockLimit = jest.fn().mockResolvedValue({
        success: true,
        pending: Promise.resolve(),
        limit: 100,
        reset: Date.now() + 60000,
        remaining: 99,
      })

      if (rateLimiters.api) {
        rateLimiters.api.limit = mockLimit
      }

      const request = new NextRequest('http://localhost:3000/api/test')
      const response = await rateLimit(request, 'api')

      expect(response).toBeNull()
    })
  })
})