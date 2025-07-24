import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { loggers } from '@/lib/logger'

const logger = loggers.system

export async function GET(request: NextRequest) {
  try {
    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json({
        success: false,
        error: 'AWS credentials not configured',
        missingVars: [
          !process.env.AWS_ACCESS_KEY_ID && 'AWS_ACCESS_KEY_ID',
          !process.env.AWS_SECRET_ACCESS_KEY && 'AWS_SECRET_ACCESS_KEY',
        ].filter(Boolean),
      }, { status: 500 })
    }

    const region = process.env.AWS_REGION || 'us-east-1'
    const bucketName = process.env.AWS_S3_BUCKET_NAME || 'sahara-developers'
    
    // Initialize S3 client
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })

    // Test object details
    const testKey = `test/s3-test-${Date.now()}.txt`
    const testContent = `S3 test file created at ${new Date().toISOString()}`
    
    const results = {
      region,
      bucket: bucketName,
      testKey,
      tests: {
        upload: false,
        download: false,
        delete: false,
      },
      errors: [] as string[],
    }

    try {
      // Test 1: Upload a test file
      const uploadCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: testKey,
        Body: testContent,
        ContentType: 'text/plain',
      })
      
      await s3Client.send(uploadCommand)
      results.tests.upload = true
      
      // Test 2: Download the test file
      const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: testKey,
      })
      
      const getResponse = await s3Client.send(getCommand)
      const downloadedContent = await getResponse.Body?.transformToString()
      
      if (downloadedContent === testContent) {
        results.tests.download = true
      } else {
        results.errors.push('Downloaded content does not match uploaded content')
      }
      
      // Test 3: Delete the test file
      const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: testKey,
      })
      
      await s3Client.send(deleteCommand)
      results.tests.delete = true
      
    } catch (error: any) {
      results.errors.push(`S3 operation failed: ${error.message || error.name}`)
      logger.error({ error }, 'S3 test operation failed')
    }

    // Generate S3 URL for reference
    const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/`
    const cloudfrontUrl = process.env.CLOUDFRONT_URL
    
    return NextResponse.json({
      success: Object.values(results.tests).every(test => test),
      results,
      urls: {
        s3: s3Url,
        cloudfront: cloudfrontUrl || 'Not configured',
      },
      configuration: {
        region,
        bucket: bucketName,
        hasCloudfront: !!cloudfrontUrl,
      },
    })
    
  } catch (error: any) {
    logger.error({ error }, 'S3 health check failed')
    
    return NextResponse.json({
      success: false,
      error: error.message || 'S3 health check failed',
      errorName: error.name,
    }, { status: 500 })
  }
}