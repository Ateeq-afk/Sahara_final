# Seeding Mock Data for Sahara Construction

This guide explains how to populate your database with comprehensive mock data for development and testing.

## Prerequisites

1. **MongoDB Setup**: You need a MongoDB instance running. You can use:
   - MongoDB Atlas (Cloud) - Recommended
   - Local MongoDB installation
   - Docker MongoDB container

2. **Environment Configuration**: Update your `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/sahara_construction?retryWrites=true&w=majority
   ```

## Available Seed Scripts

### 1. Seed Everything (Recommended)
```bash
npm run seed:all
```

This comprehensive script will create:
- **4 Users** (1 admin + 3 customers)
- **2 Suppliers** (verified with full details)
- **5 Materials** (cement, steel, bricks, tiles, paint)
- **2 Leads** (different stages)
- **2 Estimates** (sent and accepted)
- **2 Blog Posts** (published articles)
- **1 Material Order** (completed)

### 2. Seed Only Admin User
```bash
npm run seed:admin
```
Creates a single admin user with credentials:
- Email: `admin@sahara.com`
- Password: `admin123`

### 3. Seed Only Materials (Extended)
```bash
npm run seed:materials
```
Creates a more extensive materials catalog with:
- 15+ materials across all categories
- Multiple suppliers
- Detailed specifications
- Reviews and ratings

## Sample Login Credentials

After running `npm run seed:all`, you can login with:

### Admin Account
- Email: `admin@sahara.com`
- Password: `admin123`

### Customer Accounts
- Email: `rajesh.kumar@example.com`
- Password: `customer123`
- Email: `priya.sharma@example.com`
- Password: `customer123`

## Data Overview

### Users
- Admin user with full access
- Customer users with order history
- All users are pre-verified

### Suppliers
1. **BuildMart Supplies**
   - Categories: Cement, Steel, Bricks, Sand
   - Verified supplier with ISO certification
   - Delivers to: Whitefield, Marathahalli, Koramangala

2. **Premium Construction Hub**
   - Categories: Tiles, Paint, Electrical, Plumbing
   - Premium materials supplier
   - Delivers to: Indiranagar, HSR Layout

### Materials
- **Cement**: UltraTech PPC, ACC Gold
- **Steel**: TATA TMT Bars Fe 500
- **Bricks**: Red Clay Bricks
- **Tiles**: Kajaria Vitrified Tiles
- **Paint**: Asian Paints Apex Ultima

Each material includes:
- Detailed specifications
- Pricing with bulk discounts
- Stock availability
- Ratings and reviews
- Multiple images

### Leads
- New leads pending contact
- Contacted leads with notes
- Qualified leads ready for proposals
- Converted leads with deal values

### Estimates
- Complete cost breakdowns
- Market comparisons
- Timeline phases
- Smart suggestions

### Blog Posts
- "10 Modern Home Design Trends for 2024"
- "Complete Guide to Home Construction Costs"
- SEO-optimized with tags and categories

### Material Orders
- Completed orders with delivery tracking
- Payment records
- Invoice generation

## Marketplace Features

After seeding, you can:
1. Browse materials at `/marketplace`
2. Filter by category, price, brand
3. Compare up to 5 materials
4. View detailed specifications
5. Check supplier information
6. See delivery areas and costs

## Troubleshooting

### MongoDB Connection Error
If you see `ECONNREFUSED ::1:27017`:
1. Ensure MongoDB is running
2. Check your `MONGODB_URI` in `.env.local`
3. For local MongoDB, use: `mongodb://localhost:27017/sahara_construction`

### Duplicate Key Errors
If you get duplicate key errors:
1. The database already has data
2. Clear the database first or use a different database name

### Missing Dependencies
If modules are not found:
```bash
npm install
```

## Next Steps

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. Login with the admin credentials

4. Explore:
   - `/marketplace` - Browse materials
   - `/crm` - Admin dashboard
   - `/blog` - Published articles
   - `/quote` - Get estimates

## Custom Seeding

To modify the seed data, edit:
- `/scripts/seed-all.js` - Main seed script
- Add more materials, suppliers, or other data as needed

## Production Warning

⚠️ **Never run seed scripts on production databases!** These scripts will clear existing data.

---

For any issues or questions, please check the main project documentation or create an issue in the repository.