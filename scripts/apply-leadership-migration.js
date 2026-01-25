#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  console.error('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗');
  process.exit(1);
}

async function executeSql() {
  try {
    console.log('Executing SQL to add department column...\n');
    
    // Create a client with high timeout
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      global: { 
        headers: {
          'X-Custom-Header': 'admin'
        }
      }
    });
    
    // Execute the ALTER TABLE statement
    const { data, error } = await supabase.rpc('exec_sql', {
      statement: `
        ALTER TABLE public.leadership 
        ADD COLUMN IF NOT EXISTS department VARCHAR(255);
        
        CREATE INDEX IF NOT EXISTS idx_leadership_department 
        ON public.leadership(department);
      `
    });

    if (error) {
      console.log('RPC method not available, attempting direct execution...');
      console.log('\nPlease execute this SQL in your Supabase SQL Editor:');
      console.log('================================================');
      console.log('ALTER TABLE public.leadership ADD COLUMN IF NOT EXISTS department VARCHAR(255);');
      console.log('CREATE INDEX IF NOT EXISTS idx_leadership_department ON public.leadership(department);');
      console.log('================================================\n');
      console.log('After executing the SQL, the admin dashboard will work correctly.');
      process.exit(0);
    }

    console.log('✓ Successfully added department column to leadership table');
    console.log('✓ Created index for department field');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nManual SQL execution required:');
    console.log('================================================');
    console.log('ALTER TABLE public.leadership ADD COLUMN IF NOT EXISTS department VARCHAR(255);');
    console.log('CREATE INDEX IF NOT EXISTS idx_leadership_department ON public.leadership(department);');
    console.log('================================================\n');
    process.exit(1);
  }
}

executeSql();
