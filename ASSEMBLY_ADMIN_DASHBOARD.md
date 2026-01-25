# Assembly Members Admin Dashboard Guide

## Overview

The admin dashboard now includes a complete interface for managing Electoral Areas and Assembly Members. This allows administrators to:

- Create, edit, and delete electoral areas
- Add assembly members with photos, contact information, and biographical details
- Manage display order for both areas and members
- Activate/deactivate items without deleting them
- Upload member profile photos directly

## Accessing the Admin Dashboard

1. Navigate to `http://localhost:3001/admin/dashboard` (or your production URL)
2. Log in with your admin credentials
3. Click **Assembly Members** in the sidebar navigation

## Managing Electoral Areas

### Add a New Electoral Area

1. Click the **Electoral Areas** tab (if not already selected)
2. Fill in the **Area Name** field (required)
3. Optionally add a **Description**
4. Set the **Display Order** (determines position on the website)
5. Toggle **Active** to enable/disable the area
6. Click **Create**

### Edit an Electoral Area

1. In the Electoral Areas list, click the **Edit** button (pencil icon)
2. Modify the fields as needed
3. Click **Update**
4. Click **Cancel** to exit edit mode without saving

### Delete an Electoral Area

1. In the Electoral Areas list, click the **Delete** button (trash icon)
2. Confirm the deletion in the popup
3. The area will be removed (members linked to this area will have their `electoral_area_id` set to NULL)

## Managing Assembly Members

### Add a New Assembly Member

1. Click the **Assembly Members** tab
2. Fill in the required fields:
   - **Full Name** (required)
   - **Electoral Area** (required - select from dropdown)
3. Fill in optional fields:
   - **Position** - Title/role of the member (e.g., "Elected Assembly Member", "Chief", "DCE Representative")
   - **Email** - Contact email address
   - **Phone** - Contact phone number
   - **Biography** - Short biography or description
4. **Profile Image** - Click "Upload Image" to add a member photo
5. Set **Display Order** - Controls the position on the website
6. Toggle **Active** to enable/disable the member
7. Click **Create**

### Edit an Assembly Member

1. In the Assembly Members list, click the **Edit** button (pencil icon)
2. Modify any fields as needed
3. To change the profile photo:
   - Click the **Upload Image** button to select a new image
4. Click **Update**
5. Click **Cancel** to exit without saving

### Delete an Assembly Member

1. In the Assembly Members list, click the **Delete** button (trash icon)
2. Confirm the deletion in the popup
3. The member will be removed from the website

## Image Requirements

- **Format**: JPG, PNG, WebP
- **Recommended Size**: 400x500 pixels (portrait)
- **File Size**: Keep under 5MB for optimal performance
- **Aspect Ratio**: Portrait orientation recommended (3:4 ratio)

## Data Display on Website

### Electoral Areas & Members Display

The assembly page at `/about/assembly` displays:

1. **Electoral Areas** organized by display_order
2. **Members** grouped under their electoral area
3. **Member Cards** showing:
   - Profile photo
   - Full name
   - Position
   - Biography (if provided)
   - Contact email (clickable mailto link)
   - Contact phone (clickable tel link)

### Responsive Layout

- **Mobile (320px)**: Single column layout
- **Tablet (768px)**: 2 columns of members
- **Desktop (1024px+)**: 3 columns of members

## Database Structure

### Electoral Areas Table
```
- id: UUID (auto-generated)
- name: Text (required, unique)
- description: Text (optional)
- display_order: Number (default: 0)
- is_active: Boolean (default: true)
- created_at: Timestamp
- updated_at: Timestamp (auto-updated)
```

### Assembly Members Table
```
- id: UUID (auto-generated)
- name: Text (required)
- electoral_area_id: UUID (foreign key to electoral_areas)
- position: Text (optional)
- image_url: Text (optional, URL to uploaded image)
- bio: Text (optional)
- contact_email: Text (optional)
- contact_phone: Text (optional)
- display_order: Number (default: 0)
- is_active: Boolean (default: true)
- created_at: Timestamp
- updated_at: Timestamp (auto-updated)
```

## API Endpoints

### Electoral Areas
- `GET /api/admin/electoral-areas` - Fetch all areas
- `POST /api/admin/electoral-areas` - Create new area
- `PUT /api/admin/electoral-areas/[id]` - Update area
- `DELETE /api/admin/electoral-areas/[id]` - Delete area

### Assembly Members
- `GET /api/admin/assembly-members` - Fetch all members
- `POST /api/admin/assembly-members` - Create new member
- `PUT /api/admin/assembly-members/[id]` - Update member
- `DELETE /api/admin/assembly-members/[id]` - Delete member

## Tips & Best Practices

1. **Display Order**: Use sequential numbers (1, 2, 3...) for cleaner organization
2. **Activate/Deactivate**: Use the Active toggle to temporarily hide items without deleting them
3. **Contact Information**: Include email and phone for members so constituents can reach them
4. **Images**: Upload clear, professional photos for better presentation
5. **Descriptions**: Write clear area descriptions to help visitors understand the electoral area

## Troubleshooting

### Image Upload Not Working
- Check file size (must be under 5MB)
- Ensure file format is JPG, PNG, or WebP
- Verify internet connection is stable

### Changes Not Saving
- Check for error messages (displayed as toast notifications)
- Ensure all required fields are filled
- Verify your admin session is still active

### Missing Electoral Areas in Member Dropdown
- Create an electoral area first before adding members
- Ensure the area's `is_active` toggle is ON
- Refresh the page to reload the area list

## Support

For technical issues or questions about the assembly members feature, refer to:
- [Assembly Members Migration Guide](./MIGRATION_ASSEMBLY_MEMBERS.md)
- [Database Architecture](./DATABASE_ARCHITECTURE.md)
