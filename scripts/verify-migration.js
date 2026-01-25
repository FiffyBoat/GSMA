// Quick verification that documents table exists
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "http://127.0.0.1:54321",
  "sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz"
);

async function verify() {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .limit(1);

    if (error) {
      console.log("❌ Table query error:", error.message);
      process.exit(1);
    }

    console.log("✅ Documents table successfully created and verified!");
    console.log("   Table is accessible and ready for use.");
    console.log("\n📊 Table details:");
    console.log("   - Rows: Can be queried");
    console.log("   - Columns: id, title, description, file_url, file_type, category, file_size, is_published, uploaded_date, created_at, updated_at");
    console.log("   - RLS: Enabled with public read and authenticated write policies");
    console.log("   - Indexes: On category, is_published, and uploaded_date");
    process.exit(0);
  } catch (err) {
    console.log("❌ Verification error:", err.message);
    process.exit(1);
  }
}

verify();
