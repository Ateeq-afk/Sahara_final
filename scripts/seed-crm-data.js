const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sahara_crm';

// Define schemas
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  status: String,
  priority: String,
  interestedService: String,
  budget: {
    min: Number,
    max: Number
  },
  timeline: String,
  notes: [String],
  lastContactDate: Date,
  nextFollowUpDate: Date,
  assignedTo: String,
  convertedToQuote: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
});

const quoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  propertyType: String,
  area: Number,
  location: String,
  budget: {
    min: Number,
    max: Number
  },
  expectedStartDate: Date,
  timeline: String,
  status: String,
  priority: String,
  requirements: String,
  estimatedCost: Number,
  actualCost: Number,
  source: String,
  createdAt: Date,
  updatedAt: Date
});

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  status: String,
  publishedAt: Date,
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  featuredImage: String,
  categories: [String],
  tags: [String],
  readingTime: Number,
  author: String,
  views: Number,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  source: String,
  status: String,
  priority: String,
  assignedTo: String,
  createdAt: Date,
  updatedAt: Date
});

// Models
const Lead = mongoose.model('Lead', leadSchema);
const Quote = mongoose.model('Quote', quoteSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Sample data
const sampleLeads = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543210',
    source: 'website',
    status: 'new',
    priority: 'high',
    interestedService: 'interior',
    budget: { min: 500000, max: 800000 },
    timeline: '3-4 months',
    notes: ['Initial inquiry about 3BHK interior design'],
    assignedTo: 'Raj Kumar',
    convertedToQuote: false,
    tags: ['interior', '3bhk', 'bangalore'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    name: 'Rajesh Patel',
    email: 'rajesh.patel@gmail.com',
    phone: '+91 9876543211',
    source: 'google_ads',
    status: 'contacted',
    priority: 'medium',
    interestedService: 'construction',
    budget: { min: 1500000, max: 2500000 },
    timeline: '6-8 months',
    notes: ['Interested in villa construction in Whitefield', 'Budget confirmed'],
    lastContactDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextFollowUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    assignedTo: 'Arjun Singh',
    convertedToQuote: true,
    tags: ['construction', 'villa', 'whitefield'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    name: 'Anita Reddy',
    email: 'anita.reddy@company.com',
    phone: '+91 9876543212',
    source: 'referral',
    status: 'qualified',
    priority: 'urgent',
    interestedService: 'renovation',
    budget: { min: 300000, max: 600000 },
    timeline: '2-3 months',
    notes: ['Referred by existing client', 'Kitchen and bathroom renovation'],
    lastContactDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    nextFollowUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    assignedTo: 'Priya Nair',
    convertedToQuote: false,
    tags: ['renovation', 'kitchen', 'bathroom'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    name: 'Suresh Kumar',
    email: 'suresh.kumar@tech.com',
    phone: '+91 9876543213',
    source: 'facebook_ads',
    status: 'won',
    priority: 'high',
    interestedService: 'interior',
    budget: { min: 800000, max: 1200000 },
    timeline: '4-5 months',
    notes: ['Project completed successfully', 'Very satisfied client'],
    lastContactDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    assignedTo: 'Raj Kumar',
    convertedToQuote: true,
    tags: ['interior', 'completed', 'satisfied'],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Meera Iyer',
    email: 'meera.iyer@startup.io',
    phone: '+91 9876543214',
    source: 'website',
    status: 'proposal_sent',
    priority: 'medium',
    interestedService: 'construction',
    budget: { min: 2000000, max: 3500000 },
    timeline: '8-10 months',
    notes: ['Commercial space construction', 'Proposal sent via email'],
    lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextFollowUpDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    assignedTo: 'Arjun Singh',
    convertedToQuote: true,
    tags: ['construction', 'commercial', 'proposal'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const sampleQuotes = [
  {
    name: 'Rajesh Patel',
    email: 'rajesh.patel@gmail.com',
    phone: '+91 9876543211',
    projectType: 'construction',
    propertyType: 'villa',
    area: 2500,
    location: 'Whitefield, Bangalore',
    budget: { min: 1500000, max: 2500000 },
    expectedStartDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    timeline: '6-8 months',
    status: 'pending',
    priority: 'high',
    requirements: 'Modern villa with 4 bedrooms, contemporary design, swimming pool',
    estimatedCost: 2200000,
    source: 'google_ads',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Suresh Kumar',
    email: 'suresh.kumar@tech.com',
    phone: '+91 9876543213',
    projectType: 'interior',
    propertyType: 'apartment',
    area: 1200,
    location: 'Koramangala, Bangalore',
    budget: { min: 800000, max: 1200000 },
    expectedStartDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    timeline: '4-5 months',
    status: 'approved',
    priority: 'medium',
    requirements: 'Complete interior design for 3BHK, modular kitchen, false ceiling',
    estimatedCost: 950000,
    actualCost: 985000,
    source: 'facebook_ads',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Meera Iyer',
    email: 'meera.iyer@startup.io',
    phone: '+91 9876543214',
    projectType: 'construction',
    propertyType: 'commercial',
    area: 5000,
    location: 'Electronic City, Bangalore',
    budget: { min: 2000000, max: 3500000 },
    expectedStartDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    timeline: '8-10 months',
    status: 'under_review',
    priority: 'high',
    requirements: 'Office space construction, modern architecture, green building features',
    estimatedCost: 2800000,
    source: 'website',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const sampleBlogs = [
  {
    title: 'Modern Kitchen Design Trends 2024',
    slug: 'modern-kitchen-design-trends-2024',
    content: 'Discover the latest trends in modern kitchen design for 2024. From minimalist aesthetics to smart appliances, we explore what makes kitchens both functional and beautiful...',
    excerpt: 'Explore the hottest kitchen design trends that will dominate 2024, featuring smart storage solutions and contemporary aesthetics.',
    status: 'published',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    metaTitle: 'Modern Kitchen Design Trends 2024 | Sahara Developers',
    metaDescription: 'Discover the latest kitchen design trends for 2024. Expert insights from Bangalore\'s premier interior designers.',
    keywords: ['kitchen design', 'interior trends', 'modern kitchen', '2024 trends'],
    featuredImage: '/blog/kitchen-trends-2024.jpg',
    categories: ['Interior Design', 'Kitchen'],
    tags: ['trends', 'modern', 'kitchen', '2024'],
    readingTime: 8,
    author: 'Priya Nair',
    views: 1250,
    likes: 89,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Sustainable Construction Practices in Bangalore',
    slug: 'sustainable-construction-practices-bangalore',
    content: 'Learn about eco-friendly construction methods that are gaining popularity in Bangalore. From green materials to energy-efficient designs...',
    excerpt: 'Explore sustainable construction practices that benefit both the environment and your wallet in Bangalore\'s growing real estate market.',
    status: 'published',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    metaTitle: 'Sustainable Construction in Bangalore | Green Building',
    metaDescription: 'Discover eco-friendly construction practices in Bangalore. Learn about green building materials and sustainable design.',
    keywords: ['sustainable construction', 'green building', 'bangalore construction', 'eco-friendly'],
    featuredImage: '/blog/sustainable-construction.jpg',
    categories: ['Construction', 'Sustainability'],
    tags: ['sustainable', 'green', 'eco-friendly', 'bangalore'],
    readingTime: 12,
    author: 'Arjun Singh',
    views: 892,
    likes: 67,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: '5 Tips for Budget-Friendly Home Renovation',
    slug: 'budget-friendly-home-renovation-tips',
    content: 'Renovating your home doesn\'t have to break the bank. Here are 5 proven strategies to maximize your renovation budget...',
    excerpt: 'Transform your home without overspending. Discover 5 practical tips for budget-friendly renovations that deliver maximum impact.',
    status: 'draft',
    metaTitle: 'Budget Home Renovation Tips | Affordable Renovation Ideas',
    metaDescription: 'Save money on your home renovation with these 5 expert tips. Affordable renovation ideas for every budget.',
    keywords: ['budget renovation', 'affordable renovation', 'home improvement', 'renovation tips'],
    categories: ['Renovation', 'Budget Tips'],
    tags: ['budget', 'renovation', 'tips', 'affordable'],
    readingTime: 6,
    author: 'Raj Kumar',
    views: 0,
    likes: 0,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const sampleContacts = [
  {
    name: 'Kavya Srinivas',
    email: 'kavya.srinivas@email.com',
    phone: '+91 9876543215',
    subject: 'Interior Design Inquiry',
    message: 'Hi, I am looking for interior design services for my 2BHK apartment in Indiranagar. Can you please share your portfolio and pricing?',
    source: 'website',
    status: 'new',
    priority: 'medium',
    assignedTo: 'Unassigned',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    name: 'Vikram Gupta',
    email: 'vikram.gupta@business.com',
    phone: '+91 9876543216',
    subject: 'Commercial Construction',
    message: 'We need a contractor for our new office building project. Please contact us to discuss the requirements.',
    source: 'referral',
    status: 'responded',
    priority: 'high',
    assignedTo: 'Arjun Singh',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Lead.deleteMany({}),
      Quote.deleteMany({}),
      Blog.deleteMany({}),
      Contact.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const [leads, quotes, blogs, contacts] = await Promise.all([
      Lead.insertMany(sampleLeads),
      Quote.insertMany(sampleQuotes),
      Blog.insertMany(sampleBlogs),
      Contact.insertMany(sampleContacts)
    ]);

    console.log('✅ Sample data inserted successfully!');
    console.log(`📊 Created:`);
    console.log(`   - ${leads.length} leads`);
    console.log(`   - ${quotes.length} quotes`);
    console.log(`   - ${blogs.length} blog posts`);
    console.log(`   - ${contacts.length} contact messages`);
    
    console.log('\n🎯 CRM Dashboard is now ready with real data!');
    console.log('   Visit: http://localhost:3000/crm');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedData();