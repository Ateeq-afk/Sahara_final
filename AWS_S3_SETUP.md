# AWS S3 Setup Guide for Sahara Developers

## Step 1: Create S3 Bucket

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to S3
3. Click "Create bucket"
4. Configure:
   - Bucket name: `sahara-developers`
   - Region: `us-east-1` (or your preferred)
   - Object Ownership: ACLs disabled
   - Block Public Access: Uncheck "Block all public access"
   - Bucket Versioning: Disabled (optional)
   - Click "Create bucket"

## Step 2: Configure Bucket Permissions

1. Go to your bucket → Permissions tab
2. Scroll to "Bucket policy" → Edit
3. Paste the contents of `aws-s3-bucket-policy.json`
4. Replace `sahara-developers` with your bucket name if different
5. Save changes

## Step 3: Configure CORS

1. In Permissions tab → scroll to "Cross-origin resource sharing (CORS)"
2. Edit and paste the contents of `aws-s3-cors-config.json`
3. Add your production domain to AllowedOrigins
4. Save changes

## Step 4: Create IAM User

1. Go to IAM → Users → Create user
2. User name: `sahara-developers-s3-user`
3. Next → Attach policies directly
4. Create policy → JSON
5. Paste the contents of `aws-iam-policy.json`
6. Review and create policy
7. Name it: `sahara-developers-s3-policy`
8. Go back and attach this policy to the user
9. Create user
10. Security credentials → Create access key
11. Choose "Application running outside AWS"
12. Save the Access Key ID and Secret Access Key

## Step 5: Update Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your AWS credentials:
   ```
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_S3_BUCKET_NAME=sahara-developers
   NEXT_PUBLIC_S3_IMAGE_URL=https://sahara-developers.s3.us-east-1.amazonaws.com
   ```

## Step 6: (Optional) Set up CloudFront CDN

1. Go to CloudFront → Create distribution
2. Origin domain: Select your S3 bucket
3. Origin access: Public
4. Cache behavior: Use defaults
5. Create distribution
6. Copy the distribution domain (e.g., d1234567890.cloudfront.net)
7. Add to `.env.local`:
   ```
   CLOUDFRONT_URL=https://d1234567890.cloudfront.net
   NEXT_PUBLIC_S3_IMAGE_URL=https://d1234567890.cloudfront.net
   ```

## Step 7: Test Upload

1. Restart your Next.js dev server
2. Log in as admin
3. Go to CRM → Projects → Create New
4. Try uploading an image
5. Check if the image appears and the URL points to S3

## Folder Structure in S3

The application organizes uploads as follows:
```
sahara-developers/
├── projects/
│   ├── project-1234-abc123.webp
│   └── project-5678-def456.webp
├── avatars/
│   └── user-9012-ghi789.webp
├── documents/
│   └── contract-3456-jkl012.pdf
└── materials/
    └── material-7890-mno345.webp
```

## Security Best Practices

1. **Never commit AWS credentials** to Git
2. Use IAM roles in production (EC2/ECS)
3. Enable S3 bucket versioning for important files
4. Set up lifecycle policies to delete old files
5. Monitor S3 costs with AWS Cost Explorer
6. Enable S3 access logging for security audits

## Troubleshooting

### "Access Denied" errors
- Check IAM policy permissions
- Verify bucket policy allows GetObject
- Ensure CORS is configured correctly

### Images not loading
- Check NEXT_PUBLIC_S3_IMAGE_URL is set correctly
- Verify bucket name and region match
- Check browser console for CORS errors

### Upload failures
- Verify AWS credentials are correct
- Check IAM user has PutObject permission
- Ensure file size is within limits (default 5MB)