import pino from 'pino'
import * as Sentry from '@sentry/nextjs'

// Create logger configuration based on environment
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

// Base logger configuration
const baseConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: {
        'user-agent': req.headers['user-agent'],
        'x-forwarded-for': req.headers['x-forwarded-for'],
      },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: res.headers,
    }),
    err: pino.stdSerializers.err,
  },
  // Redact sensitive information
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.confirmPassword',
      'req.body.token',
      'req.body.secret',
      'req.body.apiKey',
      'res.headers["set-cookie"]',
      '*.password',
      '*.secret',
      '*.token',
      '*.apiKey',
      '*.authorization',
    ],
    censor: '[REDACTED]',
  },
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
}

// Development configuration with pretty printing
const developmentConfig: pino.LoggerOptions = {
  ...baseConfig,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      singleLine: false,
      errorProps: 'message,stack',
    },
  },
}

// Production configuration - structured JSON logs
const productionConfig: pino.LoggerOptions = {
  ...baseConfig,
  // Add context information
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
  },
}

// Create the logger instance
const logger = pino(isDevelopment ? developmentConfig : productionConfig)

// Create child loggers for different modules
export const createLogger = (module: string) => {
  return logger.child({ module })
}

// Export the base logger
export default logger

// Utility functions for common logging patterns
export const loggers = {
  api: createLogger('api'),
  auth: createLogger('auth'),
  db: createLogger('database'),
  email: createLogger('email'),
  payment: createLogger('payment'),
  system: createLogger('system'),
}

// Error logging helper
export function logError(error: unknown, context?: Record<string, any>) {
  const err = error instanceof Error ? error : new Error(String(error))
  
  // Log to Pino
  logger.error({
    err,
    ...context,
  })
  
  // Send to Sentry in production
  if (isProduction) {
    Sentry.captureException(err, {
      extra: context,
    })
  }
}

// Performance logging helper
export function logPerformance(operation: string, duration: number, metadata?: Record<string, any>) {
  logger.info({
    operation,
    duration,
    performance: true,
    ...metadata,
  })
}

// Audit logging helper (for important business events)
export function logAudit(event: string, userId: string, metadata?: Record<string, any>) {
  logger.info({
    audit: true,
    event,
    userId,
    timestamp: new Date().toISOString(),
    ...metadata,
  })
}