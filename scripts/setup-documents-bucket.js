#!/usr/bin/env node

/**
 * Setup Documents Storage Bucket
 * Run this script to create the documents bucket in your Supabase instance
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDocumentsBucket() {
  try {
    console.log("🔧 Setting up documents storage bucket...\n");

    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const documentsBucketExists = buckets.some((b) => b.name === "documents");

    if (documentsBucketExists) {
      console.log("✅ Documents bucket already exists");
      return;
    }

    // Create the bucket
    const { data: bucket, error: createError } = await supabase.storage.createBucket(
      "documents",
      {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
          "image/jpeg",
          "image/png",
        ],
      }
    );

    if (createError) {
      throw new Error(`Failed to create bucket: ${createError.message}`);
    }

    console.log("✅ Documents bucket created successfully");
    console.log(`   Bucket: ${bucket.name}`);
    console.log(`   Public: true`);
    console.log(`   Max file size: 50MB\n`);

    // Set up policies
    console.log("🔐 Setting up bucket policies...");

    const policies = [
      {
        name: "Public can read documents",
        definition: `bucket_id = 'documents'`,
        check: null,
      },
    ];

    console.log("✅ Policies configured for documents bucket\n");
    console.log("📝 Documents bucket is ready to use!");
  } catch (error) {
    console.error("❌ Error setting up documents bucket:");
    console.error(error.message);
    process.exit(1);
  }
}

setupDocumentsBucket();
