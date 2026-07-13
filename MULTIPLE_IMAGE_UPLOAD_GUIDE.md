# Multiple Image Upload Guide

## Overview
You now have two ways to upload multiple images to the gallery:

### 1. **Multi Image Upload Component** (For Single Gallery Item)
- Located in the **Gallery** tab under "Edit/Add Gallery Item"
- Allows uploading multiple images but saves them as a single gallery item
- Best for: Gallery items with multiple photos that should be grouped together
- Features:
  - Drag and drop support
  - Multiple image selection
  - Individual image removal
  - Progress tracking per image
  - Automatic error handling

### 2. **Bulk Gallery Upload** (For Multiple Gallery Items)
- New dedicated tab in the admin dashboard: **Bulk Upload**
- Allows uploading multiple images and automatically creates a separate gallery item for each image
- Best for: Adding many photos quickly, where each photo should be its own gallery item
- Features:
  - Drag and drop for up to 50 images
  - Batch upload with progress tracking
  - Automatic gallery item creation
  - Optional title, description, and category for all items
  - Individual image status display (pending, uploading, completed, failed)
  - Retry failed uploads

## How to Use

### Method 1: Single Gallery Item with Multiple Images
1. Go to **Gallery** tab
2. Click **Add Gallery Item** or edit an existing item
3. Use the **Gallery Images** section to upload multiple images
4. Set title, description, category, and other details
5. Click **Save**

```
Note: Currently saves the first uploaded image. To store multiple images
per item, the database schema would need to be updated to support an 
image array instead of single image_url field.
```

### Method 2: Bulk Upload Multiple Gallery Items
1. Go to the new **Bulk Upload** tab
2. Drag and drop multiple images or click to select them (up to 50 images)
3. Optionally add:
   - **Gallery Title**: Common title for all items (e.g., "Project Photos 2024")
   - **Category**: Category for all items (general, photo, video, project, event)
   - **Description**: Description for all items
4. Click **Upload All Images**
5. Wait for upload completion
6. Gallery items are created automatically
7. View them in the **Gallery** tab

## Features

### MultiImageUpload Component
- **Max Files**: 10 images (configurable)
- **File Size**: 5MB per image
- **Formats**: PNG, JPG, WEBP, GIF
- **UI**: Grid display with:
  - Image previews
  - Individual remove buttons
  - Upload progress per image
  - Add more button to add additional images
  - Hover effects for better visibility

### BulkGalleryUpload Component
- **Max Files**: 50 images (configurable)
- **File Size**: 5MB per image
- **Formats**: PNG, JPG, WEBP, GIF
- **Features**:
  - Real-time preview grid (scrollable)
  - Individual status badges (pending, uploading, completed, failed)
  - Error messages per image
  - Automatic gallery item creation after upload
  - Clear all or individual remove functionality
  - Common metadata for all items (title, category, description)

## API Integration

Both components use the existing:
- **Upload Endpoint**: `/api/admin/upload`
- **Gallery Endpoint**: `/api/admin/gallery` (POST for creating items)

## Error Handling

- **Network Errors**: Displays actual error message
- **File Size**: Validates before upload
- **Upload Failures**: Shows error message per image
- **Validation**: Checks file type and size before upload

## Tips

1. **Organization**: Use categories to organize images (photo, project, event, etc.)
2. **Tagging**: Add tags in the gallery item editor for better searchability
3. **Featured**: Mark important items as featured in the gallery editor
4. **Bulk Metadata**: Add common title/description when bulk uploading similar images
5. **Error Recovery**: Failed uploads can be retried by re-selecting and uploading again

## File Structure

### New Components Created:
- `src/components/admin/MultiImageUpload.tsx` - Multi-file upload for single item
- `src/components/admin/BulkGalleryUpload.tsx` - Bulk upload with auto-item creation

### Modified Files:
- `src/app/admin/dashboard/dashboard-client.tsx` - Added bulk upload tab and imports
- Image upload in gallery now uses MultiImageUpload component

## Limitations & Future Enhancements

### Current Limitations:
1. Gallery items store only one image_url (database schema)
2. Bulk upload creates identical metadata for all items
3. No batch editing after upload

### Future Enhancements:
1. Support multiple images per gallery item (schema update needed)
2. Bulk metadata editing after upload
3. Drag-to-reorder images
4. Image cropping/filtering before upload
5. Duplicate detection
6. Scheduled uploads

## Support

If you encounter issues:
1. Check network connectivity
2. Verify file sizes are under 5MB
3. Ensure file formats are supported (PNG, JPG, WEBP, GIF)
4. Clear browser cache and retry
5. Check console (F12) for detailed error messages
