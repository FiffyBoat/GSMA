# Assembly Members Management Guide

## Overview
The Assembly Members feature allows admins to organize and display all elected and appointed assembly members by their electoral areas on the Assembly page.

## Database Structure

### Electoral Areas Table
Stores information about electoral areas in Ga South Municipality.

**Fields:**
- `id` - Unique identifier (UUID)
- `name` - Name of the electoral area (VARCHAR, UNIQUE)
- `description` - Optional description (TEXT)
- `display_order` - Order of display on website (INTEGER)
- `is_active` - Whether to show on website (BOOLEAN)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Assembly Members Table
Stores information about individual assembly members.

**Fields:**
- `id` - Unique identifier (UUID)
- `name` - Member's full name (VARCHAR)
- `electoral_area_id` - Reference to electoral area (UUID, FOREIGN KEY)
- `position` - Position/title (VARCHAR) - e.g., "Elected Assembly Member", "Government Appointee", "MP"
- `image_url` - URL to member's profile image (TEXT)
- `bio` - Short biography or description (TEXT)
- `contact_email` - Email address (VARCHAR)
- `contact_phone` - Phone number (VARCHAR)
- `is_active` - Whether to display on website (BOOLEAN)
- `display_order` - Order of display within electoral area (INTEGER)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Adding Electoral Areas

1. Open Supabase Dashboard
2. Navigate to SQL Editor
3. Run the following query:

```sql
INSERT INTO electoral_areas (name, description, display_order, is_active)
VALUES (
  'Your Electoral Area Name',
  'Optional description',
  1,
  true
);
```

Replace with your actual electoral areas. Increase `display_order` for each new area.

## Adding Assembly Members

1. Open Supabase Dashboard
2. Navigate to SQL Editor
3. Run the following query:

```sql
INSERT INTO assembly_members (name, electoral_area_id, position, image_url, bio, contact_email, contact_phone, display_order, is_active)
VALUES (
  'Member Full Name',
  (SELECT id FROM electoral_areas WHERE name = 'Electoral Area Name'),
  'Position Title',
  'https://your-image-url.jpg',
  'Short biography or description',
  'email@example.com',
  '+233 XXX XXX XXX',
  1,
  true
);
```

## Uploading Member Images

Images should be uploaded to your storage service. Options:
1. **Supabase Storage** - Upload to the public bucket and get the URL
2. **External CDN** - Use any image hosting service URL

## Editing Members

1. In Supabase Dashboard, go to the `assembly_members` table
2. Click on the member record to edit
3. Update the fields as needed
4. Click "Save"

## Example Dataset

Here are some sample electoral areas for Ga South Municipality:

```
1. Weija Electoral Area
2. Kasoa Electoral Area
3. Brofoyedu Electoral Area
4. Gomoa Electoral Area
5. Awutu Electoral Area
6. Adentan Electoral Area
7. Asokwa Electoral Area
8. Senya Electoral Area
```

## Frontend Display

The Assembly page automatically displays:
- All electoral areas (organized by `display_order`)
- Members organized under their electoral areas
- Member photos (or placeholder if no image)
- Member name, position, and bio
- Contact email and phone (clickable links)

## Tips

1. **Images**: Recommended size is 300x400px for best display
2. **Position**: Use consistent titles like "Elected Assembly Member", "Government Appointee", "MP"
3. **Display Order**: Use 1, 2, 3, etc. to control the order of appearance
4. **Active Flag**: Set `is_active = false` to hide members without deleting them
5. **Contact Info**: Email links use `mailto:` and phone uses `tel:` for direct contact

## Troubleshooting

**Members not showing on website:**
- Check that `is_active = true` for both electoral area and member
- Verify `electoral_area_id` references exist in `electoral_areas` table
- Clear browser cache and refresh

**Images not displaying:**
- Verify image URL is publicly accessible
- Check image URL in database (no typos)
- Ensure image file exists at that URL

**Order is wrong:**
- Update `display_order` field (1, 2, 3, etc.)
- Lower numbers appear first

## API Endpoints

The page fetches data server-side using:
- GET `/api/electoral_areas` - Returns all active electoral areas with members

## Responsive Design

The member cards are fully responsive:
- **Mobile (320px)**: Single column layout
- **Tablet (768px)**: 2 columns
- **Desktop (1024px+)**: 3 columns

All images scale responsively with proper aspect ratio.
