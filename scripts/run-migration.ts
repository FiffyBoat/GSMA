import { createAdminSupabaseClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

async function runMigration() {
  const supabase = await createAdminSupabaseClient();

  const migrationPath = path.join(
    process.cwd(),
    "supabase/migrations/20260201_update_department_order.sql"
  );

  try {
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

    console.log("Running migration: 20260201_update_department_order.sql");
    console.log("Migration SQL length:", migrationSQL.length);

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(";")
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        console.log("Executing:", statement.substring(0, 100) + "...");
        const { error } = await supabase.rpc("exec_sql", {
          sql: statement + ";",
        });

        if (error) {
          console.error("Statement failed:", error);
          console.error("Statement was:", statement);
          // Continue with other statements
        } else {
          console.log("✅ Statement executed successfully");
        }
      }
    }

    console.log("✅ Migration completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error running migration:", error);
    process.exit(1);
  }
}

runMigration();
