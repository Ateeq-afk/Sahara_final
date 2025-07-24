import { S3Client } from '@aws-sdk/client-s3'

const region = process.env.AWS_REGION || 'us-east-1'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'sahara-developers'
export const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL || `https://${S3_BUCKET_NAME}.s3.${region}.amazonaws.com`