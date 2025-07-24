# Claude Development Guide

## Project Overview
Sahara Developers - A comprehensive construction company platform with CRM, project management, and customer portal.

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run typecheck` - Run type checking
- `npm run seed:all` - Seed database with sample data

## Project Structure
- `/app` - Next.js 14 app directory
  - `/crm` - CRM dashboard for admins
  - `/portal` - Customer portal
  - `/api` - API routes
- `/src/models` - Mongoose models
- `/components` - React components
- `/lib` - Utility functions and configs

## Key Features Implemented

### 1. Authentication System (NextAuth)
- Secure login with bcrypt password hashing
- Role-based access control (admin/customer)
- Protected routes with middleware
- Session management

### 2. CRM System
- **Dashboard**: Real-time statistics and activity tracking
- **Lead Management**: Lead scoring, status tracking, source analysis
- **Project Management**: 
  - Comprehensive project tracking
  - Timeline and milestone management
  - Budget tracking and variance analysis
  - Team management
  - Document management
  - Daily logs and progress tracking
- **Campaign Management**: Email/SMS campaigns with A/B testing
- **Referral System**: Track and reward customer referrals

### 3. Customer Portal
- **Dashboard**: Project overview and quick actions
- **Project Tracking**: Real-time progress updates
- **Document Access**: Contracts, reports, and project documents
- **Payment Tracking**: Payment schedules and history
- **Support System**: Direct communication with project team

### 4. Database Models
- User (with roles)
- Project (comprehensive construction project management)
- Lead (with scoring and activities)
- Material & MaterialOrder
- Supplier
- Campaign & CampaignExecution
- Referral & ReferralProgram
- Estimate, Quote, Contact, Blog

## Environment Variables
```env
# Required
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
RESEND_API_KEY=re_xxxx

# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=sahara-developers
CLOUDFRONT_URL=https://d1234567890.cloudfront.net # Optional CDN

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXX
SENTRY_DSN=https://xxx
HUBSPOT_API_KEY=xxx
```

## Login Credentials
- Admin: admin@sahara.com / admin123
- Customer: rajesh.kumar@example.com / customer123

## API Endpoints
- `/api/auth/[...nextauth]` - Authentication
- `/api/crm/dashboard` - CRM dashboard data
- `/api/crm/projects` - Project CRUD
- `/api/crm/leads` - Lead management
- `/api/users` - User management
- `/api/campaigns` - Campaign management
- `/api/referrals` - Referral tracking

## Recent Updates
- Implemented NextAuth authentication
- Created comprehensive Project Management system
- Built Customer Portal with project tracking
- Added role-based access control
- Enhanced CRM dashboard with project statistics
- Created detailed project views for both CRM and portal
- Integrated AWS S3 for image storage with CloudFront CDN
- Added optimized image handling with S3Image component

## Next Steps
- Invoice and Payment tracking system
- Document Management with file uploads
- Task automation and workflows
- Advanced analytics dashboard
- SMS/WhatsApp integration
- Field management features

## Security Notes
- All CRM routes require admin authentication
- Customer portal allows customer and admin access
- Passwords are hashed with bcryptjs
- Session-based authentication with JWT
- Middleware protects sensitive routes

## Development Tips
- Always run `npm run seed:all` after database changes
- Use `npm run dev` on port 3001 if 3000 is occupied
- Check `/middleware.ts` for protected routes
- MongoDB Atlas connection required
- Resend API key needed for email functionality