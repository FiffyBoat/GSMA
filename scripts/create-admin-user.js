// Script to create an admin user with a hashed password
// Usage: node scripts/create-admin-user.js <email> <password> <name>

const bcrypt = require('bcryptjs');

const email = process.argv[2] || 'admin@gsma.gov.gh';
const password = process.argv[3] || 'admin123';
const name = process.argv[4] || 'Administrator';

const hash = bcrypt.hashSync(password, 10);

console.log('\n=== Admin User Creation ===\n');
console.log('Email:', email);
console.log('Name:', name);
console.log('\nSQL INSERT statement:\n');
console.log(`INSERT INTO admin_users (email, password_hash, name) VALUES ('${email}', '${hash}', '${name}');`);
console.log('\nOr use this hash directly in your database:\n');
console.log('Password Hash:', hash);
console.log('\n');
