#!/usr/bin/env node

/**
 * Backup script for local Supabase database
 * Usage: node scripts/backup-db.js
 * 
 * Creates a backup of local Supabase database data as JSON files
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
function loadEnvFile(filePath) {
  const env = {};
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, "");
        env[key] = value;
      }
    });
  }
  return env;
}

const envLocal = loadEnvFile(path.join(__dirname, "..", ".env.local"));
Object.assign(process.env, envLocal);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
  "admin_users",
  "hero_slides",
  "news_posts",
  "leadership",
  "projects",
  "events",
  "gallery_items",
  "site_settings",
];

const backupDir = path.join(
  __dirname,
  "..",
  "backups",
  `backup-${new Date().toISOString().split("T")[0]}`
);

async function backupDatabase() {
  console.log("🔄 Starting database backup...\n");

  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`📁 Created backup directory: ${backupDir}\n`);
  }

  let successCount = 0;
  let failureCount = 0;

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select("*");

      if (error) {
        console.error(`❌ Failed to backup ${table}: ${error.message}`);
        failureCount++;
        continue;
      }

      const filePath = path.join(backupDir, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      console.log(
        `✅ Backed up ${table}: ${data?.length || 0} records → ${filePath}`
      );
      successCount++;
    } catch (err) {
      console.error(`❌ Error backing up ${table}:`, err.message);
      failureCount++;
    }
  }

  // Create backup metadata
  const metadata = {
    timestamp: new Date().toISOString(),
    supabaseUrl,
    tablesBackedUp: successCount,
    tablesFailed: failureCount,
    tables: tables,
  };

  const metadataPath = path.join(backupDir, "backup-metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`\n📊 Backup Summary:`);
  console.log(`   ✅ Successful: ${successCount}/${tables.length}`);
  console.log(`   ❌ Failed: ${failureCount}/${tables.length}`);
  console.log(`   📁 Location: ${backupDir}`);
  console.log(`   ⏰ Timestamp: ${metadata.timestamp}`);

  if (failureCount === 0) {
    console.log(`\n✨ Backup completed successfully!`);
    process.exit(0);
  } else {
    console.warn(`\n⚠️  Backup completed with ${failureCount} error(s).`);
    process.exit(1);
  }
}

backupDatabase().catch((err) => {
  console.error("❌ Backup failed:", err);
  process.exit(1);
});
