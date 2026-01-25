# Assembly Members Admin Quick Reference

## Quick Start

### Access Admin Dashboard
```
URL: http://localhost:3001/admin/dashboard
or production: https://your-domain.com/admin/dashboard
```

## Step-by-Step: Adding Electoral Areas

1. **Login** to admin dashboard
2. Click **Assembly Members** in sidebar
3. Click **Electoral Areas** tab
4. Enter area name (e.g., "Weija Electoral Area")
5. Click **Create**

## Step-by-Step: Adding Assembly Members

1. **Login** to admin dashboard
2. Click **Assembly Members** in sidebar
3. Click **Assembly Members** tab
4. Fill in:
   - **Full Name** ✓ (required)
   - **Electoral Area** ✓ (required)
   - Position (optional)
   - Email (optional)
   - Phone (optional)
   - Biography (optional)
5. **Upload Photo** by clicking the image upload button
6. Click **Create**

## Quick Actions

| Action | Location | Steps |
|--------|----------|-------|
| **Add Area** | Assembly Members → Electoral Areas | Fill form → Click Create |
| **Edit Area** | Electoral Areas list | Click ✏️ → Update changes → Click Update |
| **Delete Area** | Electoral Areas list | Click 🗑️ → Confirm |
| **Add Member** | Assembly Members → Assembly Members | Fill form → Click Create |
| **Edit Member** | Assembly Members list | Click ✏️ → Update changes → Click Update |
| **Delete Member** | Assembly Members list | Click 🗑️ → Confirm |

## Important Notes

✓ **Electoral Area is required** - Create areas before adding members  
✓ **Name is required** - Member names must be filled in  
✓ **Photos are optional** - But recommended for better presentation  
✓ **Display Order** - Use numbers like 1, 2, 3 to control website order  
✓ **Active Toggle** - Turn off to hide without deleting  

## Where Data Appears on Website

- **Electoral Areas**: `/about/assembly`
- **Assembly Members**: `/about/assembly` (displayed under their area)

## Keyboard Shortcuts

- **Tab** - Move between form fields
- **Enter** - Submit form (when Create/Update button is focused)
- **Escape** - Cancel editing (if available)

## Form Validation

- ❌ Missing required field → "Please enter..." message appears
- ❌ Invalid email format → Email validation error shown
- ❌ Network error → "Error saving..." message shown
- ✓ Success → "Successfully created/updated" notification appears

## Getting Help

- Check toast notifications (pop-up messages) for detailed error messages
- Ensure Electoral Area is selected before adding members
- Verify image is JPG/PNG and under 5MB
- Clear browser cache if display doesn't update immediately

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Electoral area not saving" | Check if name is unique (no duplicates) |
| "Member dropdown empty" | Create electoral areas first |
| "Image won't upload" | Check file size (max 5MB) and format (JPG/PNG) |
| "Changes not showing" | Refresh page or check for error messages |

## Tips for Best Results

💡 **Names**: Use full names for members (e.g., "Hon. John Mensah")  
💡 **Positions**: Be specific (e.g., "Elected Assembly Member", "MMDCEs Rep")  
💡 **Photos**: Use professional headshots when possible  
💡 **Display Order**: Keep consistent numbering (1, 2, 3...)  
💡 **Descriptions**: Keep descriptions under 200 characters for areas  

---

**Last Updated**: January 2025  
**Support**: Contact admin if issues persist
