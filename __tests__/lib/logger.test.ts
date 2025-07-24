import pino from 'pino'
import * as Sentry from '@sentry/nextjs'
import logger, { createLogger, logError, logPerformance, logAudit, loggers } from '@/lib/logger'

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}))

// Mock pino
jest.mock('pino', () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn().mockReturnThis(),
  }
  return jest.fn(() => mockLogger)
})

describe('Logger', () => {
  const mockPino = pino as jest.MockedFunction<typeof pino>
  const mockCaptureException = Sentry.captureException as jest.MockedFunction<typeof Sentry.captureException>

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NODE_ENV = 'test'
  })

  describe('createLogger', () => {
    it('should create a child logger with module name', () => {
      const moduleLogger = createLogger('test-module')
      expect(logger.child).toHaveBeenCalledWith({ module: 'test-module' })
    })
  })

  describe('logError', () => {
    it('should log error with context', () => {
      const error = new Error('Test error')
      const context = { userId: '123', action: 'test' }

      logError(error, context)

      expect(logger.error).toHaveBeenCalledWith({
        err: error,
        ...context,
      })
    })

    it('should convert non-Error to Error', () => {
      const errorString = 'String error'
      
      logError(errorString)

      expect(logger.error).toHaveBeenCalledWith({
        err: expect.objectContaining({
          message: errorString,
        }),
      })
    })

    it('should send to Sentry in production', () => {
      process.env.NODE_ENV = 'production'
      const error = new Error('Production error')
      const context = { severity: 'high' }

      logError(error, context)

      expect(mockCaptureException).toHaveBeenCalledWith(error, {
        extra: context,
      })
    })

    it('should not send to Sentry in development', () => {
      process.env.NODE_ENV = 'development'
      const error = new Error('Dev error')

      logError(error)

      expect(mockCaptureException).not.toHaveBeenCalled()
    })
  })

  describe('logPerformance', () => {
    it('should log performance metrics', () => {
      const operation = 'database_query'
      const duration = 150
      const metadata = { query: 'SELECT * FROM users' }

      logPerformance(operation, duration, metadata)

      expect(logger.info).toHaveBeenCalledWith({
        operation,
        duration,
        performance: true,
        ...metadata,
      })
    })
  })

  describe('logAudit', () => {
    it('should log audit events', () => {
      const event = 'user_login'
      const userId = 'user123'
      const metadata = { ip: '192.168.1.1' }

      logAudit(event, userId, metadata)

      expect(logger.info).toHaveBeenCalledWith({
        audit: true,
        event,
        userId,
        timestamp: expect.any(String),
        ...metadata,
      })
    })
  })

  describe('module loggers', () => {
    it('should have pre-configured module loggers', () => {
      expect(loggers.api).toBeDefined()
      expect(loggers.auth).toBeDefined()
      expect(loggers.db).toBeDefined()
      expect(loggers.email).toBeDefined()
      expect(loggers.payment).toBeDefined()
      expect(loggers.system).toBeDefined()
    })
  })
})