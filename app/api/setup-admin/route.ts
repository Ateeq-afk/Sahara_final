import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/src/models/User'

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sahara.com' })
    
    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        email: 'admin@sahara.com'
      })
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@sahara.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+91-9591-837216',
      }
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      email: adminUser.email,
      role: adminUser.role
    })
    
  } catch (error: any) {
    console.error('Setup admin error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}