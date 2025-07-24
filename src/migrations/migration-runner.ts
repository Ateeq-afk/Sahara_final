import mongoose from 'mongoose'
import { loggers } from '@/lib/logger'
import dbConnect from '@/lib/mongodb'

const logger = loggers.db

export interface Migration {
  id: string
  description: string
  up: () => Promise<void>
  down: () => Promise<void>
}

// Migration tracking schema
const MigrationSchema = new mongoose.Schema({
  migrationId: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  version: String,
})

const MigrationModel = mongoose.models.Migration || mongoose.model('Migration', MigrationSchema)

export class MigrationRunner {
  private migrations: Migration[] = []

  constructor(migrations: Migration[]) {
    this.migrations = migrations.sort((a, b) => a.id.localeCompare(b.id))
  }

  async connect() {
    await dbConnect()
    logger.info('Connected to database for migrations')
  }

  async getAppliedMigrations(): Promise<string[]> {
    const applied = await MigrationModel.find().sort({ migrationId: 1 })
    return applied.map(m => m.migrationId)
  }

  async getPendingMigrations(): Promise<Migration[]> {
    const applied = await this.getAppliedMigrations()
    return this.migrations.filter(m => !applied.includes(m.id))
  }

  async runMigrations(): Promise<void> {
    await this.connect()
    
    const pending = await this.getPendingMigrations()
    
    if (pending.length === 0) {
      logger.info('No pending migrations')
      return
    }

    logger.info(`Found ${pending.length} pending migrations`)

    for (const migration of pending) {
      await this.runMigration(migration)
    }

    logger.info('All migrations completed successfully')
  }

  private async runMigration(migration: Migration): Promise<void> {
    const session = await mongoose.startSession()
    
    try {
      await session.withTransaction(async () => {
        logger.info(`Running migration: ${migration.id} - ${migration.description}`)
        
        // Run the migration
        await migration.up()
        
        // Record the migration
        await MigrationModel.create([{
          migrationId: migration.id,
          description: migration.description,
          version: process.env.npm_package_version || '1.0.0',
        }], { session })
        
        logger.info(`Migration ${migration.id} completed`)
      })
    } catch (error) {
      logger.error({ error, migrationId: migration.id }, 'Migration failed')
      throw error
    } finally {
      await session.endSession()
    }
  }

  async rollback(steps: number = 1): Promise<void> {
    await this.connect()
    
    const applied = await MigrationModel.find()
      .sort({ migrationId: -1 })
      .limit(steps)
    
    if (applied.length === 0) {
      logger.info('No migrations to rollback')
      return
    }

    const session = await mongoose.startSession()

    try {
      await session.withTransaction(async () => {
        for (const record of applied) {
          const migration = this.migrations.find(m => m.id === record.migrationId)
          
          if (!migration) {
            logger.warn(`Migration ${record.migrationId} not found in codebase`)
            continue
          }

          logger.info(`Rolling back migration: ${migration.id} - ${migration.description}`)
          
          // Run the down migration
          await migration.down()
          
          // Remove the migration record
          await MigrationModel.deleteOne({ migrationId: migration.id }, { session })
          
          logger.info(`Rollback of ${migration.id} completed`)
        }
      })
    } catch (error) {
      logger.error({ error }, 'Rollback failed')
      throw error
    } finally {
      await session.endSession()
    }
  }

  async status(): Promise<void> {
    await this.connect()
    
    const applied = await this.getAppliedMigrations()
    const pending = await this.getPendingMigrations()
    
    console.log('\nMigration Status:')
    console.log('=================')
    
    if (applied.length > 0) {
      console.log('\nApplied Migrations:')
      for (const id of applied) {
        const migration = this.migrations.find(m => m.id === id)
        console.log(`  ✓ ${id} - ${migration?.description || 'Unknown'}`)
      }
    }
    
    if (pending.length > 0) {
      console.log('\nPending Migrations:')
      for (const migration of pending) {
        console.log(`  ○ ${migration.id} - ${migration.description}`)
      }
    } else {
      console.log('\nAll migrations are up to date!')
    }
  }
}