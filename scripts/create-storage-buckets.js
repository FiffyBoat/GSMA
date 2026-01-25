#!/usr/bin/env node

/**
 * Create missing storage buckets
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

async function createStorageBuckets() {
  try {
    await client.connect();
    console.log('🔄 Creating missing storage buckets...\n');

    // Create documents bucket
    const sql = `
      -- Create documents storage bucket if it doesn't exist
      INSERT INTO storage.buckets (id, name, public, file_size_limit)
      VALUES ('documents', 'documents', false, 52428800) -- 50MB limit
      ON CONFLICT (id) DO NOTHING;

      -- Policy: Allow authenticated users (admin) to upload documents
      CREATE POLICY "Allow authenticated users to upload documents"
      ON storage.objects
      FOR INSERT
      WITH CHECK (
        bucket_id = 'documents' AND
        auth.role() = 'authenticated'
      )
      ON CONFLICT DO NOTHING;

      -- Policy: Allow authenticated users to update their uploaded documents
      CREATE POLICY "Allow authenticated users to update documents"
      ON storage.objects
      FOR UPDATE
      USING (
        bucket_id = 'documents' AND
        auth.role() = 'authenticated'
      )
      WITH CHECK (
        bucket_id = 'documents' AND
        auth.role() = 'authenticated'
      )
      ON CONFLICT DO NOTHING;

      -- Policy: Allow authenticated users to delete documents
      CREATE POLICY "Allow authenticated users to delete documents"
      ON storage.objects
      FOR DELETE
      USING (
        bucket_id = 'documents' AND
        auth.role() = 'authenticated'
      )
      ON CONFLICT DO NOTHING;

      -- Policy: Allow public to read documents (for downloading)
      CREATE POLICY "Allow public to read published documents"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'documents')
      ON CONFLICT DO NOTHING;
    `;

    // Execute statements individually to avoid conflicts
    const statements = [
      `INSERT INTO storage.buckets (id, name, public, file_size_limit)
       VALUES ('documents', 'documents', false, 52428800)
       ON CONFLICT (id) DO NOTHING;`,
    ];

    for (const statement of statements) {
      try {
        await client.query(statement);
        console.log('✅ Executed: ' + statement.split('\n')[0]);
      } catch (err) {
        if (!err.message.includes('already exists')) {
          console.error('⚠️ ', err.message);
        }
      }
    }

    console.log('\n📋 Verifying buckets:');
    const result = await client.query(`
      SELECT id, name, public FROM storage.buckets ORDER BY name
    `);

    result.rows.forEach(bucket => {
      console.log(`  ✅ ${bucket.name} (public: ${bucket.public})`);
    });

    await client.end();
    console.log('\n🎉 Storage setup complete!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createStorageBuckets();
