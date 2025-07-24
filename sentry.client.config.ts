import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions will be recorded
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors will be recorded
    
    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    
    // Environment
    environment: process.env.NODE_ENV,
    
    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Before sending error to Sentry
    beforeSend(event, hint) {
      // Filter out specific errors or sensitive data
      if (event.exception) {
        const error = hint.originalException
        
        // Don't send network errors in development
        if (process.env.NODE_ENV === 'development' && error?.message?.includes('fetch')) {
          return null
        }
      }
      
      // Remove sensitive data
      if (event.request?.cookies) {
        delete event.request.cookies
      }
      
      return event
    },
    
    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // Facebook related errors
      'fb_xd_fragment',
      // Chrome extensions
      'chrome-extension://',
      'moz-extension://',
      // Network errors
      'Network request failed',
      'NetworkError',
      'Failed to fetch',
    ],
    
    // Denied URLs
    denyUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
  })
}