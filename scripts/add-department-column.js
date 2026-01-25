#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function applyMigration() {
  try {
    console.log('Checking if department column exists in leadership table...');
    
    // Try to select the department column to see if it exists
    const { error: testError } = await supabase
      .from('leadership')
      .select('id, department')
      .limit(1);

    if (testError?.message?.includes('department')) {
      console.log('Department column does not exist. Please add it manually using this SQL:');
      console.log('\n--- Run in Supabase SQL Editor ---');
      console.log('ALTER TABLE leadership ADD COLUMN IF NOT EXISTS department VARCHAR(255);');
      console.log('CREATE INDEX IF NOT EXISTS idx_leadership_department ON leadership(department);');
      console.log('--- End SQL ---\n');
      process.exit(1);
    } else {
      console.log('✓ Department column already exists in leadership table');
    }
    
  } catch (error) {
    console.error('Error checking column:', error.message);
    process.exit(1);
  }
}

applyMigration();
