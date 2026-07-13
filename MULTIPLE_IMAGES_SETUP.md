# Multiple Images Upload - Setup Instructions

## Step 1: Add the `images` Column to Database

You need to run SQL in your Supabase project to add the `images` column to the `gallery_items` table.

### For Cloud Supabase:

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project: `kgadsaibqofxpzyehkpi`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste This SQL:**
   ```sql
   -- Add images JSONB array column to gallery_items
   ALTER TABLE gallery_items 
   ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
   
   -- Create index for better performance
   CREATE INDEX IF NOT EXISTS idx_gallery_items_images 
   ON gallery_items USING GIN (images);
   ```

4. **Execute the Query**
   - Click the "Run" button (or press Ctrl+Enter)
   - You should see: "Rows affected: 0" (success - no data yet)

### For Local Supabase:

If using local Supabase, run:
```bash
supabase db reset
```

This will reset the database with the latest migrations.

## Step 2: Run the Data Migration Script

Once the column is created, run:

```bash
npm run migrate-gallery-images
```

This will:
- ✅ Populate existing `image_url` values into the new `images` array
- ✅ Set the first image as the featured image (`image_url`)
- ✅ Prepare all data for multiple image display

## Step 3: Test in Admin Dashboard

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Go to Admin Dashboard → Gallery

3. Click "Add Gallery Item"

4. Upload multiple images with the same title

5. Click Save

6. Go to the public Gallery page (`/gallery`)

7. Click on a gallery item to see the lightbox

8. Use arrow keys to browse all images in that item!

## Troubleshooting

### "Column gallery_items.images does not exist"
- ✅ You haven't run the SQL yet
- **Fix:** Follow Step 1 above

### Images don't show in lightbox
- ✅ The migration didn't run
- **Fix:** Run `npm run migrate-gallery-images`

### Can only see one image when uploading multiple
- ✅ Refresh the page or restart dev server
- **Fix:** `npm run dev` (restart)

## Features Now Available

✅ Upload multiple images to ONE gallery item  
✅ All images appear in lightbox with navigation  
✅ Arrow keys to browse images  
✅ Image counter: "Item 1/5 • Image 3/8"  
✅ Thumbnail strip for quick navigation  
✅ First image shows as featured in gallery grid  

## Database Schema

### New `images` Column
```json
{
  "id": "uuid",
  "title": "Community Event Photos",
  "description": "Photos from the event",
  "image_url": "https://...(first image - featured)",
  "images": [
    "https://... (image 1)",
    "https://... (image 2)",
    "https://... (image 3)"
  ],
  "video_url": null,
  "category": "event",
  "tags": ["community", "event"],
  "is_featured": true,
  "created_at": "2026-01-26T...",
  "updated_at": "2026-01-26T..."
}
```

The `image_url` field is kept for backward compatibility and shows as the featured image in the gallery grid.
