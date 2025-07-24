# AWS S3 Setup Guide - Mumbai Region (ap-south-1)

Your S3 bucket `sahara-developers` is created! Now complete these steps:

## Step 1: Configure Bucket Permissions ⚠️ IMPORTANT

1. **Click on your bucket name** `sahara-developers` in the S3 console
2. Go to **Permissions** tab
3. Scroll to **Block public access** section
4. Click **Edit**
5. **Uncheck** "Block all public access"
6. Type `confirm` in the confirmation box
7. Click **Save changes**

## Step 2: Add Bucket Policy

1. Still in **Permissions** tab
2. Scroll to **Bucket policy** section
3. Click **Edit**
4. Copy and paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::sahara-developers/*"
    }
  ]
}
```

5. Click **Save changes**

## Step 3: Configure CORS

1. In **Permissions** tab
2. Scroll to **Cross-origin resource sharing (CORS)**
3. Click **Edit**
4. Paste this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://sahara-developers.vercel.app",
      "https://sahara-developers.com",
      "*"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

5. Click **Save changes**

## Step 4: Create IAM User for Access Keys 🔑

1. Go to **IAM Console**: https://console.aws.amazon.com/iam/
2. Click **Users** in left sidebar
3. Click **Create user** button
4. Enter username: `sahara-developers-s3`
5. Click **Next**

## Step 5: Attach Permissions

1. Select **Attach policies directly**
2. Click **Create policy**
3. Click **JSON** tab
4. Replace with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::sahara-developers/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::sahara-developers"
    }
  ]
}
```

5. Click **Next**
6. Name: `SaharaDevelopersS3Policy`
7. Click **Create policy**
8. Go back to user creation tab
9. Search and select `SaharaDevelopersS3Policy`
10. Click **Next** → **Create user**

## Step 6: Generate Access Keys 🗝️

1. Click on the newly created user `sahara-developers-s3`
2. Go to **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Select **Application running outside AWS**
6. Click **Next**
7. Add description: "Sahara Developers Next.js App"
8. Click **Create access key**

## Step 7: SAVE YOUR KEYS! ⚠️

You'll see:
- **Access key ID**: Something like `AKIAIOSFODNN7EXAMPLE`
- **Secret access key**: Something like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

**⚠️ COPY THESE NOW - You won't see the secret key again!**

## Step 8: Update Your Local Environment

1. Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your real values:

```env
# AWS S3 Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=YOUR_ACTUAL_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_ACTUAL_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME=sahara-developers

# Public S3 URL for images
NEXT_PUBLIC_S3_IMAGE_URL=https://sahara-developers.s3.ap-south-1.amazonaws.com
```

## Step 9: Restart and Test

1. Stop your dev server (Ctrl+C)
2. Start it again:
```bash
npm run dev
```

3. Login as admin and go to: http://localhost:3001/test-upload
4. Try uploading an image!

## Troubleshooting

### "Access Denied" Error
- Make sure you unchecked "Block all public access"
- Verify bucket policy is saved correctly
- Check IAM user has the right permissions

### Image Not Displaying
- Check if the URL in browser shows: `https://sahara-developers.s3.ap-south-1.amazonaws.com/...`
- Verify CORS is configured
- Check browser console for errors

### Upload Failing
- Verify your access keys are correct in `.env.local`
- Make sure there are no extra spaces in the keys
- Check that the IAM policy includes `PutObject` permission

## Success Checklist ✅

- [ ] Bucket public access enabled
- [ ] Bucket policy added
- [ ] CORS configured
- [ ] IAM user created
- [ ] Access keys generated and saved
- [ ] `.env.local` updated with real credentials
- [ ] Test upload working

Once all these are checked, your S3 integration is complete! 🎉