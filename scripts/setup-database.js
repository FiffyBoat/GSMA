#!/usr/bin/env node

/**
 * Local Database Setup Script
 * 
 * This script helps set up your local Supabase database from scratch
 * without requiring the Supabase CLI to be installed.
 * 
 * Usage: node scripts/setup-database.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function step(num, text) {
  log(`\n📍 Step ${num}: ${text}`, 'blue');
}

// Main setup
async function main() {
  header('GSMA Ghana Website - Local Database Setup');

  try {
    // Step 1: Check prerequisites
    step(1, 'Checking Prerequisites');
    
    // Check Docker
    try {
      const dockerVersion = execSync('docker --version', { encoding: 'utf-8' });
      success(`Docker installed: ${dockerVersion.trim()}`);
    } catch {
      error('Docker is not installed or not in PATH');
      log('Please install Docker Desktop from https://www.docker.com/products/docker-desktop', 'yellow');
      process.exit(1);
    }

    // Check Node.js
    try {
      const nodeVersion = execSync('node --version', { encoding: 'utf-8' });
      const npmVersion = execSync('npm --version', { encoding: 'utf-8' });
      success(`Node.js installed: ${nodeVersion.trim()}`);
      success(`npm installed: ${npmVersion.trim()}`);
    } catch {
      error('Node.js or npm is not installed');
      process.exit(1);
    }

    // Step 2: Check if .env.local exists
    step(2, 'Checking Environment Configuration');
    
    const envPath = path.join(process.cwd(), '.env.local');
    const envExists = fs.existsSync(envPath);
    
    if (envExists) {
      success('.env.local file exists');
      log('Using existing environment variables', 'cyan');
    } else {
      warning('.env.local does not exist');
      log('You will need to create it after starting Supabase', 'yellow');
      log('See Step 4 for instructions', 'yellow');
    }

    // Step 3: Check if Supabase CLI is available
    step(3, 'Checking Supabase CLI');
    
    let supabaseCLIAvailable = false;
    try {
      execSync('supabase --version', { encoding: 'utf-8', stdio: 'pipe' });
      success('Supabase CLI is installed');
      supabaseCLIAvailable = true;
    } catch {
      warning('Supabase CLI is not installed globally');
      log('This script can help with manual setup instead', 'yellow');
    }

    // Step 4: Provide setup instructions
    header('Setup Instructions');

    if (supabaseCLIAvailable) {
      log('\nYou have Supabase CLI installed. Run these commands:\n', 'bright');
      
      log('1. Stop any existing Supabase:', 'cyan');
      log('   npm run supabase:stop\n', 'yellow');
      
      log('2. Start Supabase (saves credentials):', 'cyan');
      log('   npm run supabase:start\n', 'yellow');
      
      log('3. Create .env.local with those credentials:', 'cyan');
      log('   (Copy values from step 2 output)\n', 'yellow');
      
      log('4. Reset database:', 'cyan');
      log('   npm run supabase:reset\n', 'yellow');
      
      log('5. Verify database:', 'cyan');
      log('   npm run verify-db\n', 'yellow');
      
      log('6. Create admin user:', 'cyan');
      log('   npm run create-admin\n', 'yellow');
      
      log('7. Start development server:', 'cyan');
      log('   npm run dev\n', 'yellow');
    } else {
      log('\nSince Supabase CLI is not available, here\'s the manual setup:\n', 'bright');
      
      log('Option A: Install Supabase CLI globally', 'cyan');
      log('   npm install -g supabase\n', 'yellow');
      log('   Then follow the automatic steps above\n', 'yellow');
      
      log('Option B: Use Docker directly (advanced)', 'cyan');
      log('   See LOCAL_DATABASE_SETUP.md for detailed instructions\n', 'yellow');
      
      log('Option C: Use cloud Supabase (recommended for simplicity)', 'cyan');
      log('   Visit https://app.supabase.com and create a free account\n', 'yellow');
    }

    // Step 5: Offer to create .env.local template
    step(4, 'Environment File Template');
    
    log('\nIf you need to create .env.local manually, here\'s a template:', 'cyan');
    log('\n```env', 'yellow');
    log('# Supabase Local Connection', 'yellow');
    log('NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321', 'yellow');
    log('NEXT_PUBLIC_SUPABASE_ANON_KEY=<copy from supabase start output>', 'yellow');
    log('SUPABASE_SERVICE_ROLE_KEY=<copy from supabase start output>', 'yellow');
    log('', 'yellow');
    log('# Database', 'yellow');
    log('DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres', 'yellow');
    log('SUPABASE_JWT_SECRET=super-secret-jwt-token-change-me-in-production', 'yellow');
    log('NODE_ENV=development', 'yellow');
    log('```\n', 'yellow');

    // Step 6: Helpful links
    step(5, 'Additional Resources');
    
    log('\n📚 Documentation files:', 'cyan');
    log('   • LOCAL_DATABASE_SETUP.md - Detailed step-by-step guide', 'yellow');
    log('   • SETUP_CHECKLIST.md - Quick checklist', 'yellow');
    log('   • OFFLINE_SUPABASE.md - Supabase configuration details', 'yellow');
    log('   • DATABASE_SETUP.md - Database schema documentation\n', 'yellow');

    log('🌐 Useful URLs:', 'cyan');
    log('   • Dev server: http://localhost:3000', 'yellow');
    log('   • Admin login: http://localhost:3000/admin/login', 'yellow');
    log('   • Supabase Studio: http://localhost:54323', 'yellow');
    log('   • API health: http://localhost:3000/api/health\n', 'yellow');

    log('💬 Need help?', 'cyan');
    log('   Contact: dev@gsma.org.gh\n', 'yellow');

    header('Next Steps');
    log('\n1. Install Supabase CLI (if not already installed)', 'bright');
    log('   npm install -g supabase\n', 'yellow');
    
    log('2. Start Supabase', 'bright');
    log('   npm run supabase:start\n', 'yellow');
    
    log('3. Save the credentials to .env.local\n', 'bright');
    
    log('4. Reset the database', 'bright');
    log('   npm run supabase:reset\n', 'yellow');
    
    log('5. Verify everything works', 'bright');
    log('   npm run verify-db\n', 'yellow');
    
    success('Setup instructions complete!');

  } catch (err) {
    error(`Setup failed: ${err.message}`);
    process.exit(1);
  }
}

main();
