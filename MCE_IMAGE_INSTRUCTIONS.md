# MCE Image Setup Instructions

## Image File Placement

The MCE portrait image should be placed in the `public` folder with the filename:
- `mce-portrait.jpg`

## Steps to Add the Image

### Option 1: Direct File Upload (Recommended)
1. Place the image file in the `public` folder:
   ```
   public/mce-portrait.jpg
   ```

2. The image will be accessible at: `/mce-portrait.jpg`

### Option 2: Upload via Admin Dashboard (Future Enhancement)
Once the Leadership admin section is fully implemented, you can:
1. Go to Admin Dashboard → Leadership
2. Add/Edit the MCE profile
3. Upload the image using the image upload feature

## Image Specifications

- **Recommended size**: 800x1000px (portrait orientation)
- **Format**: JPG or PNG
- **File size**: Under 2MB for optimal performance
- **Aspect ratio**: 3:4 or 4:5 (portrait)

## Where the Image Appears

The MCE image will appear in:
1. **Homepage** - Welcome Section (right column)
2. **Homepage** - Leadership Highlight Section (left side)
3. **About Us → MCE Profile** page (profile image)

## Alternative: Use Supabase Storage

If you prefer to use Supabase Storage (for admin management):
1. Upload the image via Admin Dashboard → Leadership
2. Update the image paths in the code to use the stored URL instead of `/mce-portrait.jpg`

## Current Status

All pages have been updated to use the image path `/mce-portrait.jpg`. Once you place the image file in the `public` folder, it will automatically appear on all pages.
