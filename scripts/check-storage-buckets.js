#!/usr/bin/env node

/**
 * Check if storage buckets exist in Supabase
 */

const { Client } = require('pg');
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

async function checkStorageBuckets() {
  try {
    await client.connect();
    console.log('🔄 Checking storage buckets...\n');

    const result = await client.query(`
      SELECT id, name, public FROM storage.buckets ORDER BY name
    `);

    console.log('Current storage buckets:');
    if (result.rows.length === 0) {
      console.log('  ❌ No buckets found');
    } else {
      result.rows.forEach(bucket => {
        console.log(`  ✅ ${bucket.name} (public: ${bucket.public})`);
      });
    }

    // Check required buckets
    console.log('\n📋 Checking required buckets:');
    const requiredBuckets = ['website-images', 'documents'];
    const existingBuckets = new Set(result.rows.map(b => b.name));

    for (const bucket of requiredBuckets) {
      if (existingBuckets.has(bucket)) {
        console.log(`  ✅ ${bucket} - EXISTS`);
      } else {
        console.log(`  ❌ ${bucket} - MISSING`);
      }
    }

    await client.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkStorageBuckets();
