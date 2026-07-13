#!/usr/bin/env node

/**
 * Fix Documents Bucket Public Access
 * Make the documents bucket public so files can be downloaded
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

async function fixBucketAccess() {
  try {
    console.log("🔧 Fixing documents bucket public access...\n");

    // Update bucket to public
    const { data, error } = await supabase.storage.updateBucket("documents", {
      public: true,
    });

    if (error) {
      throw new Error(`Failed to update bucket: ${error.message}`);
    }

    console.log("✅ Documents bucket is now public\n");
    console.log("📝 Files can now be downloaded via their public URLs");
  } catch (error) {
    console.error("❌ Error fixing bucket access:");
    console.error(error.message);
    process.exit(1);
  }
}

fixBucketAccess();
