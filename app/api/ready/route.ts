import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { loggers } from '@/lib/logger'

const logger = loggers.system

// Readiness probe for Kubernetes/container orchestration
export async function GET() {
  try {
    // Check if all required environment variables are set
    const requiredEnvVars = [
      'MONGODB_URI',
      'NEXTAUTH_URL',
      'NEXTAUTH_SECRET',
    ]
    
    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    )
    
    if (missingEnvVars.length > 0) {
      logger.error({ missingEnvVars }, 'Missing required environment variables')
      return NextResponse.json(
        {
          ready: false,
          reason: 'Missing required environment variables',
          missing: missingEnvVars,
        },
        { status: 503 }
      )
    }
    
    // Check database connection
    try {
      await dbConnect()
    } catch (error) {
      logger.error({ error }, 'Database connection failed in readiness check')
      return NextResponse.json(
        {
          ready: false,
          reason: 'Database connection failed',
        },
        { status: 503 }
      )
    }
    
    // All checks passed
    return NextResponse.json({
      ready: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error({ error }, 'Readiness check failed')
    return NextResponse.json(
      {
        ready: false,
        reason: 'Readiness check failed',
      },
      { status: 503 }
    )
  }
}