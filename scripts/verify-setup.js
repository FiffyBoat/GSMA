// Script to verify database setup
// This checks if all required tables exist and have the correct structure

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Simple env file parser
function loadEnvFile(filePath) {
  const env = {};
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        env[key] = value;
      }
    });
  }
  return env;
}

// Load .env.local
const envLocal = loadEnvFile(path.join(__dirname, '..', '.env.local'));
Object.assign(process.env, envLocal);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const requiredTables = [
  'admin_users',
  'hero_slides',
  'news_posts',
  'leadership',
  'site_settings',
  'electoral_areas',
  'assembly_members'
];

async function verifySetup() {
  console.log('🔍 Verifying database setup...\n');

  let allGood = true;

  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.error(`❌ Table "${table}": ${error.message}`);
        allGood = false;
      } else {
        console.log(`✅ Table "${table}" exists`);
      }
    } catch (err) {
      console.error(`❌ Table "${table}": ${err.message}`);
      allGood = false;
    }
  }

  // Check for admin user
  console.log('\n🔍 Checking admin users...');
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email, name')
      .limit(1);

    if (error) {
      console.error(`❌ Error checking admin users: ${error.message}`);
      allGood = false;
    } else if (!data || data.length === 0) {
      console.warn('⚠️  No admin users found. Create one using:');
      console.warn('   node scripts/create-admin-user.js admin@gsma.gov.gh yourpassword "Admin Name"');
    } else {
      console.log(`✅ Found admin user: ${data[0].email} (${data[0].name})`);
    }
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    allGood = false;
  }

  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ Database setup verification complete!');
    console.log('You can now start the development server with: npm run dev');
  } else {
    console.log('❌ Some issues were found. Please review the errors above.');
    console.log('Make sure you have:');
    console.log('1. Created a Supabase project');
    console.log('2. Run the schema.sql file in Supabase SQL Editor');
    console.log('3. Set up your .env.local file with correct credentials');
    process.exit(1);
  }
}

verifySetup().catch(console.error);
