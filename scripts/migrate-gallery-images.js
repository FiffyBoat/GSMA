#!/usr/bin/env node

/**
 * Migration: Migrate existing gallery_items image_url to images array
 * NOTE: The 'images' column must already exist in the database
 *
 * To create the column, run this SQL in Supabase Dashboard:
 * ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
 */

require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

async function runMigration() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "❌ Error: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY environment variables are required"
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log("🔄 Checking if 'images' column exists...\n");

    // Try to fetch gallery items with images column
    const { data: testData, error: testError } = await supabase
      .from("gallery_items")
      .select("id, images")
      .limit(1);

    if (
      testError &&
      testError.message.includes("column gallery_items.images does not exist")
    ) {
      console.error("❌ The 'images' column does not exist yet!\n");
      console.error("📝 Please create it manually in Supabase Dashboard:\n");
      console.error("   Go to SQL Editor and run:\n");
      console.error("   --- Start SQL ---");
      console.error(
        "   ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;"
      );
      console.error("   --- End SQL ---\n");
      console.error("Then run this migration script again.\n");
      process.exit(1);
    }

    console.log("✅ Column 'images' exists\n");
    console.log("🔄 Fetching gallery items...");

    // Get all gallery items
    const { data: items, error: fetchError } = await supabase
      .from("gallery_items")
      .select("id, image_url, images");

    if (fetchError) {
      console.error("❌ Error fetching gallery items:", fetchError.message);
      process.exit(1);
    }

    if (!items || items.length === 0) {
      console.log("✅ No gallery items found");
      return;
    }

    console.log(
      `🔄 Found ${items.length} gallery items. Migrating image_url to images array...`
    );

    let migratedCount = 0;
    let skippedCount = 0;

    for (const item of items) {
      // Get current images array
      const currentImages = Array.isArray(item.images) ? [...item.images] : [];

      // Check if image_url exists and needs to be added to images array
      if (item.image_url) {
        // Only add if not already in the images array
        if (!currentImages.includes(item.image_url)) {
          currentImages.unshift(item.image_url); // Add to beginning

          const { error: updateError } = await supabase
            .from("gallery_items")
            .update({ images: currentImages })
            .eq("id", item.id);

          if (updateError) {
            console.warn(
              `  ⚠️  Could not update item ${item.id}:`,
              updateError.message
            );
          } else {
            migratedCount++;
            console.log(`  ✅ Migrated: ${item.id}`);
          }
        } else {
          skippedCount++;
        }
      } else {
        skippedCount++;
      }
    }

    console.log(
      `\n✨ Migration completed!\n  - Migrated: ${migratedCount}\n  - Skipped: ${skippedCount}`
    );
    console.log(
      "\nGallery items can now display multiple images from the 'images' array"
    );
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    process.exit(1);
  }
}

runMigration();
