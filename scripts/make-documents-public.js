#!/usr/bin/env node

/**
 * Execute SQL to make documents bucket public
 * Uses the database connection to update the bucket configuration
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

async function makeDocumentsBucketPublic() {
  try {
    console.log("🔧 Making documents bucket public...\n");

    // Execute SQL to update bucket
    const { data, error } = await supabase.rpc("exec_sql", {
      sql: "UPDATE storage.buckets SET public = true WHERE id = 'documents'; SELECT id, name, public FROM storage.buckets WHERE id = 'documents';",
    });

    if (error && error.message.includes("does not exist")) {
      // Try alternative approach - update directly
      console.log("Attempting direct update...");
      // Note: The following query might not work if RPC doesn't exist
      // We'll use the SQL file approach instead
      console.log(
        "⚠️  Please manually run the SQL query in Supabase dashboard:"
      );
      console.log(
        "   Go to SQL Editor and run: supabase/make-documents-public.sql\n"
      );
      return;
    }

    if (error) {
      throw error;
    }

    console.log("✅ Documents bucket is now public!\n");
    console.log("📝 Your documents can now be downloaded successfully");
  } catch (error) {
    console.error("Note: Some approaches may not work depending on RPC setup");
    console.log(
      "\n📋 MANUAL STEPS to fix this:\n"
    );
    console.log(
      "1. Go to your Supabase Dashboard: https://supabase.com/dashboard"
    );
    console.log("2. Select your project");
    console.log("3. Go to Storage in the left sidebar");
    console.log("4. Find the 'documents' bucket");
    console.log("5. Click the three dots menu and select 'Edit bucket'");
    console.log("6. Toggle 'Make bucket public' to ON");
    console.log("7. Click 'Save'\n");
  }
}

makeDocumentsBucketPublic();
