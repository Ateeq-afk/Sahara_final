import { Migration } from './migration-runner'
import User from '@/src/models/User'
import Project from '@/src/models/Project'
import Lead from '@/src/models/Lead'
import Contact from '@/models/Contact'

export const addIndexesMigration: Migration = {
  id: '001-add-indexes',
  description: 'Add database indexes for better query performance',
  
  async up() {
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true })
    await User.collection.createIndex({ role: 1 })
    await User.collection.createIndex({ isActive: 1 })
    await User.collection.createIndex({ createdAt: -1 })
    
    // Project indexes
    await Project.collection.createIndex({ projectNumber: 1 }, { unique: true })
    await Project.collection.createIndex({ status: 1 })
    await Project.collection.createIndex({ 'customer.id': 1 })
    await Project.collection.createIndex({ createdAt: -1 })
    await Project.collection.createIndex({ 'timeline.startDate': 1, 'timeline.endDate': 1 })
    
    // Lead indexes
    await Lead.collection.createIndex({ email: 1 })
    await Lead.collection.createIndex({ phone: 1 })
    await Lead.collection.createIndex({ status: 1 })
    await Lead.collection.createIndex({ source: 1 })
    await Lead.collection.createIndex({ score: -1 })
    await Lead.collection.createIndex({ createdAt: -1 })
    
    // Contact indexes
    await Contact.collection.createIndex({ email: 1 })
    await Contact.collection.createIndex({ phone: 1 })
    await Contact.collection.createIndex({ status: 1 })
    await Contact.collection.createIndex({ createdAt: -1 })
    
    // Compound indexes for common queries
    await Project.collection.createIndex({ status: 1, priority: -1 })
    await Lead.collection.createIndex({ status: 1, score: -1 })
  },
  
  async down() {
    // Drop all non-system indexes
    const collections = [User, Project, Lead, Contact]
    
    for (const Model of collections) {
      const indexes = await Model.collection.indexes()
      
      for (const index of indexes) {
        if (index.name !== '_id_') {
          await Model.collection.dropIndex(index.name)
        }
      }
    }
  }
}