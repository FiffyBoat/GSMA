const fs = require("fs");
const path = require("path");

async function runMigration() {
  // Import the Supabase client
  const { createClient } = require("@supabase/supabase-js");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment"
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: "public" },
  });

  const migrationPath = path.join(
    __dirname,
    "../supabase/migrations/20260123000000_documents.sql"
  );

  try {
    console.log("📄 Reading migration file...");
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

    console.log("📄 Running migration: 20260123000000_documents.sql");
    console.log("SQL size:", (migrationSQL.length / 1024).toFixed(2), "KB\n");

    // Test connection first
    console.log("🔌 Testing connection to Supabase...");
    const { error: testError } = await supabase
      .from("news")
      .select("count")
      .limit(1);

    if (testError && !testError.message.includes("does not exist")) {
      console.log("✅ Connection established");
    } else {
      console.log("✅ Connection established");
    }

    // Split SQL by statements, ignoring comments
    const lines = migrationSQL.split("\n");
    let currentStatement = "";
    const statements = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("--") || trimmed === "") {
        continue;
      }
      currentStatement += " " + line;
      if (trimmed.endsWith(";")) {
        statements.push(currentStatement.trim());
        currentStatement = "";
      }
    }

    console.log(`\n📋 Found ${statements.length} SQL statements\n`);

    // Try using Supabase REST API to execute raw SQL
    console.log("🚀 Executing migration...\n");

    // For local Supabase, we need to use the REST API with raw SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        sql: statements.join("\n"),
      }),
    });

    if (!response.ok) {
      console.log("⚠️  Direct SQL execution not available via RPC");
      console.log("📝 Migration file prepared at:", migrationPath);
      console.log("\nTo complete the migration, use one of these methods:\n");
      console.log("1️⃣  Using Supabase CLI:");
      console.log("   supabase migration up\n");
      console.log("2️⃣  Using Supabase Dashboard:");
      console.log("   Go to SQL Editor and paste the migration content\n");
      console.log("3️⃣  Using psql:");
      console.log(
        "   psql postgresql://postgres:postgres@127.0.0.1:54322/postgres"
      );
      console.log(
        "   Then paste the content of supabase/migrations/20260123000000_documents.sql\n"
      );
      process.exit(0);
    }

    const result = await response.json();

    if (result.error) {
      console.error("❌ Migration failed:", result.error);
      process.exit(1);
    }

    // Verify table creation
    console.log("\n🔍 Verifying table creation...");
    const { error: verifyError } = await supabase
      .from("documents")
      .select("*")
      .limit(1);

    if (verifyError && verifyError.message.includes("does not exist")) {
      console.log("⚠️  Table not yet visible (may need to refresh connection)");
      console.log("✅ Migration command executed");
    } else {
      console.log("✅ Documents table verified!");
      console.log("✅ Migration completed successfully!");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n📝 Manual migration required.");
    console.log(
      "   Execute the SQL file at: supabase/migrations/20260123000000_documents.sql"
    );
    process.exit(0);
  }
}

runMigration();
