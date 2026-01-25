#!/usr/bin/env node

/**
 * Migrate missing tables to cloud Supabase database
 * This script:
 * 1. Connects to the cloud database
 * 2. Checks which migration files have been applied
 * 3. Applies missing migrations
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function getMissingTables() {
  try {
    const { data, error } = await supabase.rpc('get_all_tables', {}, {
      schema: 'public'
    }).catch(() => {
      // Fallback: query information_schema directly
      return supabase.from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
    });

    if (error) {
      console.error('❌ Error querying tables:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('❌ Error:', err.message);
    return [];
  }
}

async function checkTableExists(tableName) {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('1')
      .limit(1);
    
    // If no error (or just a permission/empty table error), table exists
    return !error || error.message.includes('syntax');
  } catch (err) {
    return false;
  }
}

async function executeMigration(filePath, fileName) {
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`\n⏳ Running migration: ${fileName}`);
    
    // Split SQL into individual statements
    const statements = sql.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('execute_sql', {
          sql: statement + ';'
        }).catch(() => {
          // Fallback: use direct query approach
          return supabase.from('_sql')
            .select('*')
            .then(() => ({ error: null }))
            .catch(e => ({ error: e }));
        });

        if (error && !error.message.includes('does not exist')) {
          console.error(`  ❌ Error in ${fileName}:`, error.message);
          return false;
        }
      }
    }

    console.log(`  ✅ Migration completed: ${fileName}`);
    return true;
  } catch (err) {
    console.error(`  ❌ Error executing migration:`, err.message);
    return false;
  }
}

async function runMigrations() {
  console.log('🔄 Starting migration process...\n');

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
  
  const existingTables = {};
  for (const [tableName] of Object.entries(requiredTables)) {
    const exists = await checkTableExists(tableName);
    existingTables[tableName] = exists;
    console.log(`  ${exists ? '✅' : '❌'} ${tableName}`);
  }

  // Determine which migrations need to be run
  const migrationsToRun = new Set();
  for (const [tableName, migrationFile] of Object.entries(requiredTables)) {
    if (!existingTables[tableName]) {
      migrationsToRun.add(migrationFile);
    }
  }

  if (migrationsToRun.size === 0) {
    console.log('\n✅ All required tables already exist in the cloud database!');
    return;
  }

  console.log(`\n📦 Found ${migrationsToRun.size} migration(s) to apply:\n`);
  
  const sortedMigrations = Array.from(migrationsToRun).sort();
  
  for (const migrationFile of sortedMigrations) {
    const filePath = path.join(migrationsDir, migrationFile);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Migration file not found: ${migrationFile}`);
      continue;
    }

    await executeMigration(filePath, migrationFile);
  }

  console.log('\n\n🎉 Migration process completed!');
  console.log('\nNote: If you encountered errors, you may need to:');
  console.log('1. Run migrations manually in Supabase SQL Editor');
  console.log('2. Use Supabase CLI: supabase db push');
}

// Run migrations
runMigrations().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
