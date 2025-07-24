import { NextRequest, NextResponse } from 'next/server'
import { loggers, logPerformance } from './logger'

const logger = loggers.api

// Request/Response logging middleware
export async function withRequestLogging(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const start = Date.now()
  const requestId = crypto.randomUUID()
  
  // Log request
  logger.info({
    type: 'request',
    requestId,
    method: request.method,
    url: request.url,
    headers: {
      'user-agent': request.headers.get('user-agent'),
      'x-forwarded-for': request.headers.get('x-forwarded-for'),
      'content-type': request.headers.get('content-type'),
    },
    query: Object.fromEntries(request.nextUrl.searchParams),
  }, 'Incoming request')
  
  try {
    // Execute the handler
    const response = await handler()
    
    // Calculate duration
    const duration = Date.now() - start
    
    // Log response
    logger.info({
      type: 'response',
      requestId,
      statusCode: response.status,
      duration,
      headers: {
        'content-type': response.headers.get('content-type'),
        'content-length': response.headers.get('content-length'),
      },
    }, 'Outgoing response')
    
    // Log performance metrics for slow requests
    if (duration > 1000) {
      logPerformance('slow_request', duration, {
        method: request.method,
        url: request.url,
        statusCode: response.status,
      })
    }
    
    // Add request ID to response headers
    response.headers.set('x-request-id', requestId)
    
    return response
  } catch (error) {
    const duration = Date.now() - start
    
    // Log error response
    logger.error({
      type: 'response',
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      duration,
    }, 'Request failed')
    
    throw error
  }
}

// Middleware wrapper for API routes
export function withLogging(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    return withRequestLogging(req, () => handler(req))
  }
}