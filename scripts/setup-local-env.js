const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking local Supabase status...\n');

try {
  // Get Supabase status
  const statusOutput = execSync('npx supabase status --output json', { encoding: 'utf-8' });
  const status = JSON.parse(statusOutput);

  if (!status.API_URL) {
    console.error('❌ Supabase is not running. Please run: npm run supabase:start');
    process.exit(1);
  }

  console.log('✅ Local Supabase is running\n');
  console.log('📋 Local Supabase Credentials:');
  console.log(`   URL: ${status.API_URL}`);
  console.log(`   Anon Key: ${status.ANON_KEY.substring(0, 50)}...`);
  console.log(`   Service Role Key: ${status.SERVICE_ROLE_KEY.substring(0, 50)}...\n`);

  // Create .env.local file
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = `# Local Supabase Configuration (Auto-generated)
# Generated on: ${new Date().toISOString()}
# To use online Supabase, update these values manually

NEXT_PUBLIC_SUPABASE_URL=${status.API_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${status.ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${status.SERVICE_ROLE_KEY}
NODE_ENV=development

# Database URL (for direct PostgreSQL access if needed)
DATABASE_URL=${status.DB_URL}
`;

  // Check if .env.local exists
  if (fs.existsSync(envPath)) {
    const existingContent = fs.readFileSync(envPath, 'utf-8');
    
    // Check if it's already pointing to local
    if (existingContent.includes('127.0.0.1:54321') || existingContent.includes('localhost:54321')) {
      console.log('⚠️  .env.local already points to local Supabase');
      console.log('   Updating with latest credentials...\n');
    } else {
      console.log('⚠️  .env.local exists and points to online Supabase');
      console.log('   Backing up to .env.local.backup...\n');
      fs.writeFileSync(envPath + '.backup', existingContent);
    }
  }

  // Write new .env.local
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Successfully updated .env.local with local Supabase credentials\n');
  console.log('📝 Next steps:');
  console.log('   1. Restart your Next.js dev server (if running)');
  console.log('   2. The app will now connect to your local Supabase instance');
  console.log('   3. To switch back to online, restore .env.local.backup or update manually\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  if (error.message.includes('not running')) {
    console.error('\n💡 Please start Supabase first:');
    console.error('   npm run supabase:start\n');
  }
  process.exit(1);
}
