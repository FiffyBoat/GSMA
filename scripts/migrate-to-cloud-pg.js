#!/usr/bin/env node

/**
 * Migrate missing tables to cloud Supabase database
 * Uses pg library to connect directly to PostgreSQL
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Missing DATABASE_URL in .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

async function getTables() {
  try {
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    return result.rows.map(r => r.table_name);
  } catch (err) {
    console.error('❌ Error querying tables:', err.message);
    return [];
  }
}

async function executeMigration(filePath, fileName) {
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`\n⏳ Running migration: ${fileName}`);
    
    await client.query(sql);
    
    console.log(`  ✅ Migration completed: ${fileName}`);
    return true;
  } catch (err) {
    console.error(`  ❌ Error executing migration:`, err.message);
    return false;
  }
}

async function runMigrations() {
  console.log('🔄 Connecting to cloud database...\n');

  try {
    await client.connect();
    console.log('✅ Connected to cloud database\n');
  } catch (err) {
    console.error('❌ Failed to connect:', err.message);
    process.exit(1);
  }

  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  const requiredTables = {
    'admin_users': '20260120090000_init.sql',
    'hero_slides': '20260120090000_init.sql',
    'news_posts': '20260120090000_init.sql',
    'leadership': '20260120090000_init.sql',
    'site_settings': '20260120090000_init.sql',
    'projects': '20260120092000_projects_events_gallery.sql',
    'events': '20260120092000_projects_events_gallery.sql',
    'gallery_items': '20260120092000_projects_events_gallery.sql',
    'documents': '20260123000000_documents.sql',
    'electoral_areas': '20260124000000_assembly_members.sql',
    'assembly_members': '20260124000000_assembly_members.sql',
  };

  console.log('📋 Checking current tables in cloud database...\n');
  
  const existingTables = await getTables();
  const existingTableSet = new Set(existingTables);

  console.log('Current tables:');
  for (const [tableName] of Object.entries(requiredTables)) {
    const exists = existingTableSet.has(tableName);
    console.log(`  ${exists ? '✅' : '❌'} ${tableName}`);
  }

  // Determine which migrations need to be run
  const migrationsToRun = new Set();
  for (const [tableName, migrationFile] of Object.entries(requiredTables)) {
    if (!existingTableSet.has(tableName)) {
      migrationsToRun.add(migrationFile);
    }
  }

  if (migrationsToRun.size === 0) {
    console.log('\n✅ All required tables already exist in the cloud database!');
    await client.end();
    return;
  }

  console.log(`\n📦 Found ${migrationsToRun.size} migration(s) to apply:\n`);
  
  const sortedMigrations = Array.from(migrationsToRun).sort();
  
  let successCount = 0;
  let failureCount = 0;

  for (const migrationFile of sortedMigrations) {
    const filePath = path.join(migrationsDir, migrationFile);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Migration file not found: ${migrationFile}`);
      failureCount++;
      continue;
    }

    const success = await executeMigration(filePath, migrationFile);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Migration process completed!');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log('='.repeat(50));

  await client.end();
}

// Run migrations
runMigrations().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
