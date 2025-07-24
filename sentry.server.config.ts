import * as Sentry from '@sentry/nextjs'
import { ProfilingIntegration } from '@sentry/profiling-node'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Release tracking
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    
    // Environment
    environment: process.env.NODE_ENV,
    
    // Integrations
    integrations: [
      // Add profiling
      new ProfilingIntegration(),
    ],
    
    // Before sending error to Sentry
    beforeSend(event, hint) {
      // Filter out specific errors or sensitive data
      if (event.exception) {
        const error = hint.originalException
        
        // Don't send MongoDB connection errors in development
        if (process.env.NODE_ENV === 'development' && error?.message?.includes('ECONNREFUSED')) {
          return null
        }
      }
      
      // Remove sensitive data from request
      if (event.request) {
        // Remove auth headers
        if (event.request.headers) {
          delete event.request.headers.authorization
          delete event.request.headers.cookie
        }
        
        // Remove sensitive body data
        if (event.request.data) {
          const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard']
          sensitiveFields.forEach(field => {
            if (event.request.data?.[field]) {
              event.request.data[field] = '[REDACTED]'
            }
          })
        }
      }
      
      return event
    },
    
    // Ignore specific errors
    ignoreErrors: [
      // MongoDB temporary errors
      'MongoNetworkError',
      'MongoServerError: connection',
      // Rate limit errors (handled separately)
      'Too many requests',
      'Rate limit exceeded',
    ],
  })
}