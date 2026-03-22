#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Check if we have command line args
const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('\n=== Admin User Management ===\n');
  console.log('Choose an action:');
  console.log('1. Create a new admin user');
  console.log('2. Reset admin password');
  console.log('3. List all admin users');
  console.log('4. Exit\n');

  const choice = await question('Enter your choice (1-4): ');

  if (choice === '1') {
    await createAdminUser();
  } else if (choice === '2') {
    await resetAdminPassword();
  } else if (choice === '3') {
    await listAdminUsers();
  } else if (choice === '4') {
    console.log('Goodbye!');
    rl.close();
    process.exit(0);
  } else {
    console.log('Invalid choice. Please try again.\n');
    rl.close();
    process.exit(1);
  }
}

async function createAdminUser() {
  const email = await question('Enter admin email: ');
  const password = await question('Enter password: ');
  const confirmPassword = await question('Confirm password: ');
  const name = await question('Enter admin name: ');
  const role = (await question('Enter role (super_admin/content_admin/editor) [editor]: ')) || 'editor';

  if (password !== confirmPassword) {
    console.log('❌ Passwords do not match!');
    rl.close();
    process.exit(1);
  }

  if (password.length < 8) {
    console.log('❌ Password must be at least 8 characters long!');
    rl.close();
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 10);

  console.log('\n=== SQL INSERT Statement ===\n');
  console.log(`INSERT INTO admin_users (email, password_hash, name, role) VALUES ('${email.toLowerCase()}', '${hash}', '${name}', '${role}');\n`);

  console.log('=== Instructions ===\n');
  console.log('1. Go to Supabase Dashboard: https://supabase.com');
  console.log('2. Select your project: orchids-remix-of-gsma-ghana-official-website-main');
  console.log('3. Go to SQL Editor');
  console.log('4. Create a new query');
  console.log('5. Copy and paste the SQL INSERT statement above');
  console.log('6. Click RUN');
  console.log('\nOR\n');
  console.log('Use the password hash to update an existing user:\n');
  console.log(`UPDATE admin_users SET password_hash = '${hash}' WHERE email = '${email.toLowerCase()}';\n`);

  rl.close();
}

async function resetAdminPassword() {
  const email = await question('Enter admin email to reset: ');
  const newPassword = await question('Enter new password: ');
  const confirmPassword = await question('Confirm new password: ');

  if (newPassword !== confirmPassword) {
    console.log('❌ Passwords do not match!');
    rl.close();
    process.exit(1);
  }

  if (newPassword.length < 8) {
    console.log('❌ Password must be at least 8 characters long!');
    rl.close();
    process.exit(1);
  }

  const hash = bcrypt.hashSync(newPassword, 10);

  console.log('\n=== SQL UPDATE Statement ===\n');
  console.log(`UPDATE admin_users SET password_hash = '${hash}' WHERE email = '${email.toLowerCase()}';\n`);

  console.log('=== Instructions ===\n');
  console.log('1. Go to Supabase Dashboard: https://supabase.com');
  console.log('2. Select your project: orchids-remix-of-gsma-ghana-official-website-main');
  console.log('3. Go to SQL Editor');
  console.log('4. Create a new query');
  console.log('5. Copy and paste the SQL UPDATE statement above');
  console.log('6. Click RUN');
  console.log(`\n✅ Password for ${email} has been updated!\n`);

  rl.close();
}

async function listAdminUsers() {
  console.log('\n=== SQL Query to List Admin Users ===\n');
  console.log('SELECT id, email, name, role, created_at FROM admin_users ORDER BY created_at DESC;\n');

  console.log('=== Instructions ===\n');
  console.log('1. Go to Supabase Dashboard: https://supabase.com');
  console.log('2. Select your project: orchids-remix-of-gsma-ghana-official-website-main');
  console.log('3. Go to SQL Editor');
  console.log('4. Create a new query');
  console.log('5. Copy and paste the SQL query above');
  console.log('6. Click RUN to see all admin users\n');

  rl.close();
}

main().catch(console.error);
