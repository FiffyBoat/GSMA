# Fee Fixing Documents Implementation

## Overview
The Business Operating Permit page now displays fee fixing documents uploaded by admins. The implementation allows admins to upload and manage fee fixing documents through the admin dashboard, which are then displayed on the public-facing Business Operating Permit page.

## How It Works

### 1. Admin Dashboard (Upload Documents)
**Location**: Admin Dashboard → Documents Tab

**Steps to Add Fee Fixing Document:**
1. Click "New Document" button
2. Upload your fee fixing document (PDF, Word, Image, etc.)
3. Enter the document title (e.g., "Business Operating Permit Fees 2024")
4. Enter a description explaining what the fee fixing document contains
5. Set **Category** to `Fee Fixing` (exact match required)
6. Make sure "Publish" toggle is ON
7. Click "Save Document"

### 2. Public Page (Display Documents)
**Location**: Services → Business Operating Permit page

**What Users See:**
- A "Fee Fixing" section after the application process
- All published fee fixing documents with:
  - Document title
  - Description
  - File type and size
  - Download button to access the document
- If no documents are published, a "coming soon" message appears

## Technical Implementation

### Database
Uses existing `documents` table in Supabase:
- `id`: Document identifier
- `title`: Document name displayed to users
- `description`: Explanation of document contents
- `file_url`: Storage link to the uploaded file
- `file_type`: File extension (pdf, docx, jpg, etc.)
- `category`: **Must be set to "Fee Fixing"** for fee fixing documents
- `file_size`: Document size in bytes
- `is_published`: Must be `true` to display on public page
- `uploaded_date`: Date document was uploaded

### API Endpoints

#### Admin API (Protected)
**GET** `/api/admin/documents?category=Fee%20Fixing`
- Returns all documents in a category (published and unpublished)
- Admin-only access

#### Public API (Open)
**GET** `/api/content/documents?category=Fee%20Fixing`
- Returns only published documents in a category
- Public access (no authentication required)
- Cached for 60 seconds for performance

### Frontend Components

**Business Operating Permit Page:**
- Fetches from `/api/content/documents?category=Fee%20Fixing`
- Displays documents with download links
- Shows loading state while fetching
- Shows "coming soon" message if no documents available

**Admin Dashboard Documents Tab:**
- Upload interface with document upload component
- Title and description fields
- Category dropdown (set to "Fee Fixing")
- Publish toggle
- Delete functionality

## File Changes

### New Files
- `/src/app/api/content/documents/route.ts` - Public API for fetching published documents

### Modified Files
1. `/src/app/services/business-operating-permit/page.tsx`
   - Removed fee fixing table with hardcoded data
   - Removed businessTypes array
   - Added useEffect to fetch documents from public API
   - Added fee fixing documents display section

2. `/src/app/api/admin/documents/route.ts`
   - Added category parameter support to GET endpoint
   - Can now filter documents by category

## Usage Instructions

### For Admins:
1. Go to Admin Dashboard
2. Click "Documents" in sidebar
3. Click "New Document"
4. Upload your fee fixing document
5. Set title (e.g., "Fee Fixing Schedule 2024")
6. Set description with explanation
7. **Important**: Set Category to `Fee Fixing`
8. Check "Publish" box
9. Click "Save Document"

### For Users:
1. Visit Business Operating Permit service page
2. Scroll to "Fee Fixing" section
3. View fee fixing document details
4. Click "Download" to get the PDF/document
5. Review fee structure and requirements

## Benefits

✅ **Dynamic Content**: Fees can be updated without code changes
✅ **Easy Management**: Upload and manage from admin dashboard
✅ **Public Access**: Users can download and review fee documents
✅ **Professional**: Proper document management system
✅ **Flexible**: Supports any file type (PDF, Word, Image, Excel, etc.)
✅ **Scalable**: Can add multiple fee fixing documents if needed

## Future Enhancements

- Add email notification when new fee documents are uploaded
- Add version history for fee documents
- Add search functionality for documents
- Create a dedicated documents/downloads page for all categories
- Add approval workflow for document uploads
