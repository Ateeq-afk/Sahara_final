require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const path = require('path')

async function cleanAndSetup() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected successfully!')

    // Get all collections
    const collections = await mongoose.connection.db.collections()
    
    // Drop all collections (removes all data)
    console.log('\nCleaning database...')
    for (let collection of collections) {
      try {
        await collection.drop()
        console.log(`Dropped collection: ${collection.collectionName}`)
      } catch (error) {
        console.log(`Collection ${collection.collectionName} doesn't exist, skipping...`)
      }
    }

    // Create User schema directly
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: { type: String, enum: ['admin', 'customer'] },
      isActive: { type: Boolean, default: true },
      emailVerified: Date,
      profile: {
        firstName: String,
        lastName: String,
        phone: String,
      }
    })

    const User = mongoose.model('User', userSchema)

    // Create admin user
    console.log('\nCreating admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@sahara.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: new Date(),
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+91-9591-837216',
      }
    })

    console.log('\n✅ Setup complete!')
    console.log('\nAdmin credentials:')
    console.log('Email: admin@sahara.com')
    console.log('Password: admin123')
    
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

cleanAndSetup()