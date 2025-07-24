import { loggers } from './logger'

const logger = loggers.system

interface EnvConfig {
  required: string[]
  optional: string[]
}

const envConfig: EnvConfig = {
  required: [
    'MONGODB_URI',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'RESEND_API_KEY',
  ],
  optional: [
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET_NAME',
    'CLOUDFRONT_URL',
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'SENTRY_DSN',
    'HUBSPOT_API_KEY',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'ADMIN_EMAIL',
    'NOTIFICATION_EMAILS',
    'NEXT_PUBLIC_SITE_URL',
  ]
}

export function validateEnv(): void {
  const missingRequired: string[] = []
  const configuredOptional: string[] = []
  
  // Check required environment variables
  for (const envVar of envConfig.required) {
    if (!process.env[envVar]) {
      missingRequired.push(envVar)
    }
  }
  
  // Check optional environment variables
  for (const envVar of envConfig.optional) {
    if (process.env[envVar]) {
      configuredOptional.push(envVar)
    }
  }
  
  // Log validation results
  if (missingRequired.length > 0) {
    logger.error({
      missingRequired,
      message: 'Missing required environment variables'
    })
    throw new Error(`Missing required environment variables: ${missingRequired.join(', ')}`)
  }
  
  // Validate specific formats
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    throw new Error('MONGODB_URI must be a valid MongoDB connection string')
  }
  
  if (process.env.NEXTAUTH_URL) {
    try {
      new URL(process.env.NEXTAUTH_URL)
    } catch {
      throw new Error('NEXTAUTH_URL must be a valid URL')
    }
  }
  
  if (process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY is required when AWS_ACCESS_KEY_ID is set')
  }
  
  if (process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_TOKEN is required when UPSTASH_REDIS_REST_URL is set')
  }
  
  // Log successful validation
  logger.info({
    required: envConfig.required.length,
    optional: configuredOptional.length,
    configured: [...envConfig.required, ...configuredOptional],
    message: 'Environment variables validated successfully'
  })
}

// Validate on module load in production
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}