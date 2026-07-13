#!/usr/bin/env node

/**
 * Verify Supabase Documents Bucket
 * Check if the documents bucket exists and has the correct configuration
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

async function verifySetup() {
  try {
    console.log("🔍 Verifying Supabase documents setup...\n");

    // Check buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    console.log("📦 Available buckets:");
    buckets.forEach((b) => {
      console.log(`   - ${b.name} (public: ${b.public})`);
    });

    const documentsBucket = buckets.find((b) => b.name === "documents");

    if (!documentsBucket) {
      console.error("\n❌ Documents bucket not found!");
      process.exit(1);
    }

    console.log("\n✅ Documents bucket exists\n");

    // Check documents table
    const { data: documents, error: dbError } = await supabase
      .from("documents")
      .select("id, title, file_url, file_type")
      .limit(5);

    if (dbError) {
      throw new Error(`Failed to query documents: ${dbError.message}`);
    }

    if (documents && documents.length > 0) {
      console.log("📄 Sample documents:");
      documents.forEach((doc) => {
        console.log(`   - ${doc.title}`);
        console.log(`     File Type: ${doc.file_type}`);
        console.log(`     URL: ${doc.file_url}`);
        console.log();
      });
    } else {
      console.log("📄 No documents found in database (this is normal if empty)\n");
    }

    console.log("✅ Setup verification complete!");
  } catch (error) {
    console.error("❌ Error verifying setup:");
    console.error(error.message);
    process.exit(1);
  }
}

verifySetup();
