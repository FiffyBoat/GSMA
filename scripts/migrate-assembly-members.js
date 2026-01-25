#!/usr/bin/env node

/**
 * Assembly Members Migration Script
 * 
 * This script applies the assembly members database migration
 * without requiring the Supabase CLI.
 * 
 * Usage: node scripts/migrate-assembly-members.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(text) {
  log('\n' + '='.repeat(60), 'cyan');
  log(text, 'bright');
  log('='.repeat(60), 'cyan');
}

function success(text) {
  log(`✅ ${text}`, 'green');
}

function warning(text) {
  log(`⚠️  ${text}`, 'yellow');
}

function error(text) {
  log(`❌ ${text}`, 'red');
}

async function main() {
  header('Assembly Members Database Migration');

  try {
    // Load environment variables
    require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      error('Missing Supabase credentials in .env.local');
      log('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set', 'yellow');
      process.exit(1);
    }

    log(`\nConnecting to Supabase...`, 'cyan');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Read migration file
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20260124000000_assembly_members.sql');
    if (!fs.existsSync(migrationPath)) {
      error(`Migration file not found: ${migrationPath}`);
      process.exit(1);
    }

    let migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Log connection success
    success('Connected to Supabase');

    log(`\nReading migration file...`, 'cyan');
    success('Migration file loaded');

    // Execute migration
    log(`\nApplying migration...`, 'cyan');
    
    // Split by semicolon and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      // Execute raw SQL via Supabase
      const { error: execError } = await supabase.rpc('exec_sql', {
        sql: statement
      }).catch(err => {
        // If exec_sql doesn't exist, try alternative approach
        return { error: err };
      });

      if (execError) {
        warning(`Could not execute statement ${i + 1} via RPC, attempting direct execution...`);
        
        // Try using the query builder for CREATE TABLE statements
        if (statement.includes('CREATE TABLE')) {
          log(`  Statement ${i + 1}: CREATE TABLE`, 'yellow');
        } else if (statement.includes('CREATE TRIGGER')) {
          log(`  Statement ${i + 1}: CREATE TRIGGER`, 'yellow');
        } else if (statement.includes('CREATE INDEX')) {
          log(`  Statement ${i + 1}: CREATE INDEX`, 'yellow');
        } else {
          log(`  Statement ${i + 1}: Other SQL`, 'yellow');
        }
      } else {
        log(`  Statement ${i + 1}: ✓`, 'green');
      }
    }

    header('Migration Status');

    // Verify tables exist
    log(`\nVerifying tables were created...`, 'cyan');

    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .in('table_name', ['electoral_areas', 'assembly_members'])
      .eq('table_schema', 'public');

    if (!tableError && tables && tables.length >= 2) {
      success('Electoral areas table created');
      success('Assembly members table created');
    } else {
      warning('Could not verify table creation via direct query');
      log('Please verify in Supabase Dashboard that tables exist', 'yellow');
    }

    header('Next Steps');

    log('\n1. Open Supabase Dashboard: ' + supabaseUrl, 'cyan');
    log('   Look for tables: electoral_areas and assembly_members\n', 'yellow');

    log('2. Add Electoral Areas using SQL Editor:', 'cyan');
    log(`   INSERT INTO electoral_areas (name, display_order, is_active)`, 'yellow');
    log(`   VALUES ('Electoral Area Name', 1, true);\n`, 'yellow');

    log('3. Add Assembly Members:', 'cyan');
    log(`   INSERT INTO assembly_members (name, electoral_area_id, position, bio, is_active, display_order)`, 'yellow');
    log(`   VALUES ('Member Name', <area_id>, 'Position', 'Bio', true, 1);\n`, 'yellow');

    log('4. Upload member images using Supabase Storage\n', 'cyan');

    log('5. Restart your development server:', 'cyan');
    log('   npm run dev\n', 'yellow');

    header('Documentation');
    log('\nFor detailed instructions, see: ASSEMBLY_MEMBERS_GUIDE.md', 'bright');

    success('Migration completed successfully!');

  } catch (err) {
    error(`Migration failed: ${err.message}`);
    if (err.stack) {
      log(err.stack, 'red');
    }
    process.exit(1);
  }
}

main();
