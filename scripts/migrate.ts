#!/usr/bin/env tsx

import { MigrationRunner } from '@/src/migrations/migration-runner'
import { addIndexesMigration } from '@/src/migrations/001-add-indexes'
import { loggers } from '@/lib/logger'

const logger = loggers.system

// Import all migrations here
const migrations = [
  addIndexesMigration,
  // Add new migrations here
]

async function main() {
  const command = process.argv[2]
  const runner = new MigrationRunner(migrations)

  try {
    switch (command) {
      case 'up':
      case 'migrate':
        logger.info('Running migrations...')
        await runner.runMigrations()
        break
        
      case 'down':
      case 'rollback':
        const steps = parseInt(process.argv[3] || '1')
        logger.info(`Rolling back ${steps} migration(s)...`)
        await runner.rollback(steps)
        break
        
      case 'status':
        await runner.status()
        break
        
      default:
        console.log(`
Database Migration Tool

Usage:
  npm run migrate:up          Run all pending migrations
  npm run migrate:down [n]    Rollback n migrations (default: 1)
  npm run migrate:status      Show migration status

Commands:
  up, migrate      Run all pending migrations
  down, rollback   Rollback migrations
  status           Show current migration status
        `)
        process.exit(1)
    }
    
    process.exit(0)
  } catch (error) {
    logger.error({ error }, 'Migration failed')
    process.exit(1)
  }
}

main().catch(console.error)