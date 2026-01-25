import { createAdminSupabaseClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

async function runMigration() {
  const supabase = await createAdminSupabaseClient();

  const migrationPath = path.join(
    process.cwd(),
    "supabase/migrations/20260123000000_documents.sql"
  );

  try {
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

    console.log("Running migration: 20260123000000_documents.sql");
    console.log("Migration SQL length:", migrationSQL.length);

    // Execute the migration
    const { error } = await supabase.rpc("exec_sql", {
      sql: migrationSQL,
    });

    if (error) {
      console.error("Migration failed:", error);
      process.exit(1);
    }

    console.log("✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running migration:", error);
    process.exit(1);
  }
}

runMigration();
