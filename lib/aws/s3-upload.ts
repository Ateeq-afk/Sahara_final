import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client, S3_BUCKET_NAME, CLOUDFRONT_URL } from './s3-config'
import sharp from 'sharp'

interface UploadOptions {
  folder?: string
  resize?: {
    width?: number
    height?: number
    quality?: number
  }
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

export async function uploadToS3(
  file: File | Buffer,
  key: string,
  options: UploadOptions = {}
): Promise<string> {
  try {
    const { folder = 'images', resize, format = 'webp' } = options
    
    let buffer: Buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    // Process image with sharp if resize options provided
    if (resize || format) {
      let sharpInstance = sharp(buffer)
      
      if (resize) {
        sharpInstance = sharpInstance.resize(resize.width, resize.height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      }
      
      // Convert to specified format
      switch (format) {
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality: resize?.quality || 85 })
          break
        case 'avif':
          sharpInstance = sharpInstance.avif({ quality: resize?.quality || 80 })
          break
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({ quality: resize?.quality || 85 })
          break
        case 'png':
          sharpInstance = sharpInstance.png({ quality: resize?.quality || 90 })
          break
      }
      
      buffer = await sharpInstance.toBuffer()
    }

    const fullKey = `${folder}/${key}.${format}`
    
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fullKey,
      Body: buffer,
      ContentType: `image/${format}`,
      CacheControl: 'public, max-age=31536000',
    })

    await s3Client.send(command)
    
    // Return CloudFront URL if available, otherwise S3 URL
    return `${CLOUDFRONT_URL}/${fullKey}`
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw error
  }
}

export async function deleteFromS3(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    })
    
    await s3Client.send(command)
  } catch (error) {
    console.error('Error deleting from S3:', error)
    throw error
  }
}

export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })
  
  return getSignedUrl(s3Client, command, { expiresIn })
}

export function getS3Url(key: string): string {
  if (key.startsWith('http')) {
    return key
  }
  return `${CLOUDFRONT_URL}/${key}`
}