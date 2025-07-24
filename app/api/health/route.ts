import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { loggers } from '@/lib/logger'

const logger = loggers.system

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
    }
    
    // Check if this is a detailed health check
    const detailed = request.nextUrl.searchParams.get('detailed') === 'true'
    
    if (detailed) {
      // Check database connection
      let dbStatus = 'disconnected'
      try {
        await dbConnect()
        dbStatus = 'connected'
      } catch (error) {
        dbStatus = 'error'
        logger.error({ error }, 'Database health check failed')
      }
      
      // Check Redis/Upstash connection (if configured)
      let cacheStatus = 'not_configured'
      if (process.env.UPSTASH_REDIS_REST_URL) {
        try {
          const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ping`, {
            headers: {
              Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            },
          })
          cacheStatus = response.ok ? 'connected' : 'error'
        } catch (error) {
          cacheStatus = 'error'
          logger.error({ error }, 'Redis health check failed')
        }
      }
      
      // Check AWS S3 connection
      let s3Status = 'not_configured'
      if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        try {
          const { S3Client, HeadBucketCommand } = await import('@aws-sdk/client-s3')
          const s3Client = new S3Client({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          })
          
          const command = new HeadBucketCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME || 'sahara-developers',
          })
          
          await s3Client.send(command)
          s3Status = 'connected'
        } catch (error: any) {
          if (error.name === 'NotFound') {
            s3Status = 'bucket_not_found'
          } else if (error.name === 'Forbidden') {
            s3Status = 'access_denied'
          } else {
            s3Status = 'error'
          }
          logger.error({ error, errorName: error.name }, 'S3 health check failed')
        }
      }
      
      // Memory usage
      const memoryUsage = process.memoryUsage()
      
      return NextResponse.json({
        ...health,
        checks: {
          database: dbStatus,
          cache: cacheStatus,
          s3: s3Status,
        },
        metrics: {
          memory: {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
          },
          responseTime: `${Date.now() - startTime}ms`,
        },
      })
    }
    
    // Simple health check response
    return NextResponse.json(health)
  } catch (error) {
    logger.error({ error }, 'Health check failed')
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    )
  }
}