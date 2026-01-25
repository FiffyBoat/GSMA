# Admin Dashboard Assembly Members - Visual Walkthrough

## 📍 Navigation

```
Admin Dashboard (http://localhost:3001/admin/dashboard)
├── Sidebar Left
│   ├── Overview
│   ├── Hero Slides
│   ├── News Posts
│   ├── Projects
│   ├── Events
│   ├── Gallery
│   ├── Documents
│   ├── Leadership
│   ├── ⭐ Assembly Members    ← NEW
│   └── Site Settings
└── Main Content Area
```

## 🗳️ Electoral Areas Tab

### Form Layout
```
┌─────────────────────────────────────────┐
│ Edit Electoral Area / Add New            │
├─────────────────────────────────────────┤
│                                           │
│ Area Name *                              │
│ [_________________________________]      │
│                                           │
│ Description                              │
│ ┌─────────────────────────────────┐      │
│ │                                 │      │
│ │ (multi-line text area)          │      │
│ │                                 │      │
│ └─────────────────────────────────┘      │
│                                           │
│ Display Order          Active            │
│ [___________]          [Toggle]          │
│                                           │
│ [CREATE] [CANCEL]                        │
│                                           │
└─────────────────────────────────────────┘
```

### List Display
```
┌──────────────────────────────────────────────────┐
│ Electoral Areas                                   │
├──────────────────────────────────────────────────┤
│                                                  │
│ NAME              │ ORDER │ ACTIVE  │ ACTIONS   │
│───────────────────┼───────┼─────────┼──────────│
│ Weija Area        │ 1     │ ✓ Active│ ✏️ 🗑️   │
│ Kasoa Area        │ 2     │ ✓ Active│ ✏️ 🗑️   │
│ Agona West        │ 3     │ Inactive│ ✏️ 🗑️   │
│                                                  │
└──────────────────────────────────────────────────┘
```

## 👥 Assembly Members Tab

### Form Layout
```
┌─────────────────────────────────────────┐
│ Edit Member / Add New Assembly Member    │
├─────────────────────────────────────────┤
│                                           │
│ Full Name *              Electoral Area * │
│ [____________]          [Select Area ▼]  │
│                                           │
│ Position                 Email            │
│ [____________]          [____________]    │
│                                           │
│ Phone                    Display Order    │
│ [____________]          [___________]    │
│                                           │
│ Biography                                │
│ ┌─────────────────────────────────┐      │
│ │ (multi-line text area)          │      │
│ │                                 │      │
│ └─────────────────────────────────┘      │
│                                           │
│ Profile Image                            │
│ ┌─────────────────────────────────┐      │
│ │ [Upload Image]                  │      │
│ │ No image selected               │      │
│ └─────────────────────────────────┘      │
│                                           │
│ Active                                   │
│ [Toggle]                                 │
│                                           │
│ [CREATE] [CANCEL]                        │
│                                           │
└─────────────────────────────────────────┘
```

### List Display
```
┌────────────────────────────────────────────────────────────┐
│ Assembly Members                                            │
├────────────────────────────────────────────────────────────┤
│                                                             │
│ NAME           │ POSITION          │ AREA      │ ACTIVE │ A│
│────────────────┼───────────────────┼───────────┼────────┤  │
│ Hon. John Doe  │ Assembly Member   │ Weija     │ ✓      │ ✏│
│ Chief Mary A.  │ Chief             │ Weija     │ ✓      │ ✏│
│ Mr. Samuel O.  │ DCE Nominee       │ Kasoa     │ ✓      │ ✏│
│                                                             │
└────────────────────────────────────────────────────────────┘
                                                           CTI│
                                                        ON ✏️🗑│
```

## 📱 Responsive Behavior

### Desktop (1024px+)
```
┌─────────────┬─────────────────────────────────┐
│ SIDEBAR     │ HEADER + CONTENT                │
│             │ ┌─────────────────────────────┐ │
│ • Overview  │ │ Assembly Members            │ │
│ • News      │ ├─────────────────────────────┤ │
│ • Projects  │ │ [Electoral Areas][Members]  │ │
│ • Assembly  │ │                             │ │
│ • Settings  │ │ (Full width form/table)     │ │
│             │ │                             │ │
└─────────────┴─────────────────────────────────┘
```

### Tablet (768px)
```
┌──────────────────────────────────┐
│ ☰ HEADER │ Assembly Members      │
├──────────────────────────────────┤
│ [Electoral Areas][Members]       │
├──────────────────────────────────┤
│ (Stack navigation)               │
│ [Sidebar visible on swipe]       │
│ (Responsive 2-column forms)      │
└──────────────────────────────────┘
```

### Mobile (320px)
```
┌─────────────────────┐
│ ☰ │ Assembly...     │
├─────────────────────┤
│ [Electoral][Members]│
├─────────────────────┤
│ Input Fields        │
│ [Full Width]        │
│                     │
│ [CREATE] [CANCEL]   │
├─────────────────────┤
│ List (1 column)     │
│ [Name]              │
│ [Edit][Delete]      │
│                     │
└─────────────────────┘
```

## 🔄 User Workflow

### Create Electoral Area Workflow
```
1. Click "Assembly Members" in sidebar
2. Electoral Areas tab is selected by default
3. Enter area name (required)
4. (Optional) Add description
5. Set display order (e.g., 1, 2, 3)
6. Toggle "Active" ON
7. Click [CREATE]
8. Toast: "Electoral area created"
9. Area appears in list below
```

### Create Assembly Member Workflow
```
1. Click "Assembly Members" tab
2. Select electoral area from dropdown
   ↳ Must create area first
3. Enter member name (required)
4. (Optional) Add position/role
5. (Optional) Add email address
6. (Optional) Add phone number
7. (Optional) Write biography
8. Click [Upload Image] to add photo
   ↳ Image appears as preview
9. Set display order
10. Toggle "Active" ON
11. Click [CREATE]
12. Toast: "Member created"
13. Member appears in list below
```

### Edit Workflow
```
1. Find item in list (Electoral Area or Member)
2. Click [✏️] Edit button
3. Form fills with current data
4. Make changes to any field
5. For members: Can re-upload image
6. Click [UPDATE]
7. Toast: "Updated successfully"
8. List refreshes with new data
9. Or click [Cancel] to discard changes
```

### Delete Workflow
```
1. Find item in list
2. Click [🗑️] Delete button
3. Confirmation dialog appears:
   "Are you sure?"
4. Click OK to confirm
5. Item removed from database
6. Toast: "Deleted successfully"
7. List refreshes
```

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────┐
│   AssemblyManagement Component      │
│  (Client-side React State)          │
├─────────────────────────────────────┤
│                                     │
│  Form State:                        │
│  • areaForm (name, desc, order)    │
│  • memberForm (name, email, etc)   │
│                                     │
│  Display State:                     │
│  • electoralAreas array             │
│  • assemblyMembers array            │
│  • activeTab: "areas" | "members"   │
│                                     │
└──────────┬──────────────────────────┘
           │
           │ fetch()
           ▼
┌─────────────────────────────────────┐
│      Next.js API Routes             │
│  (/api/admin/electoral-areas/...)   │
│  (/api/admin/assembly-members/...)  │
├─────────────────────────────────────┤
│  GET  → Read from database          │
│  POST → Create in database          │
│  PUT  → Update in database          │
│  DELETE → Remove from database      │
└──────────┬──────────────────────────┘
           │
           │ Supabase.js client
           ▼
┌─────────────────────────────────────┐
│    Supabase Database                │
│  ├─ electoral_areas table           │
│  │  ├─ id (UUID)                    │
│  │  ├─ name (VARCHAR)               │
│  │  ├─ description (TEXT)           │
│  │  ├─ display_order (INT)          │
│  │  ├─ is_active (BOOLEAN)          │
│  │  └─ timestamps                   │
│  │                                  │
│  └─ assembly_members table          │
│     ├─ id (UUID)                    │
│     ├─ name (VARCHAR)               │
│     ├─ electoral_area_id (FK)       │
│     ├─ position, email, phone       │
│     ├─ image_url (storage URL)      │
│     ├─ bio (TEXT)                   │
│     ├─ display_order (INT)          │
│     ├─ is_active (BOOLEAN)          │
│     └─ timestamps                   │
│                                     │
└─────────────────────────────────────┘
           │
           │ Displayed on /about/assembly
           ▼
┌─────────────────────────────────────┐
│    Public Website Display           │
│  /about/assembly page               │
├─────────────────────────────────────┤
│  Electoral Areas                    │
│  ├─ Weija Area                      │
│  │  ├─ 👤 John Doe (Member 1)       │
│  │  ├─ 👤 Mary Smith (Member 2)     │
│  │  └─ ...                          │
│  │                                  │
│  └─ Kasoa Area                      │
│     ├─ 👤 Samuel (Member 1)         │
│     └─ ...                          │
│                                     │
└─────────────────────────────────────┘
```

## 🎨 Color Scheme

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary Button | GSMA Red | #8B0000 | Create, Update actions |
| Button Hover | Dark Red | #6B0000 | Hover state |
| Success Text | Green | #16a34a | Active badges |
| Error Text | Red | #dc2626 | Validation errors |
| Inactive Text | Gray | #9ca3af | Disabled items |
| Background | White | #ffffff | Form/table backgrounds |
| Border | Light Gray | #e5e7eb | Separators |

## 📋 Validation Messages

```
Required Fields Not Filled:
  ❌ "Please enter an electoral area name"
  ❌ "Please enter member name"
  ❌ "Please select an electoral area"

Image Upload:
  ✓ "Image uploaded successfully"
  ❌ "File must be under 5MB"
  ❌ "Invalid image format"

Network Errors:
  ❌ "Failed to save electoral area"
  ❌ "Error creating member"
  ❌ "An error occurred"

Success Messages:
  ✓ "Electoral area created"
  ✓ "Electoral area updated"
  ✓ "Member created"
  ✓ "Member updated"
  ✓ "Electoral area deleted"
  ✓ "Member deleted"
```

## 🔌 Integration Points

### With Existing Dashboard
```
dashboard-client.tsx
├── Imports AssemblyManagement component
├── Adds "assembly" to activeTab
├── Adds Users icon to sidebar nav
└── Renders <AssemblyManagement /> when activeTab === "assembly"
```

### With ImageUpload Component
```
ImageUpload.tsx
└── Called from AssemblyManagement for member photos
    ├── Handles file selection
    ├── Validates file type/size
    ├── Uploads to Supabase Storage
    └── Returns URL to component
```

### With Supabase
```
createServerSupabaseClient()
├── /api/admin/electoral-areas/*
│  └── Manages electoral_areas table
├── /api/admin/assembly-members/*
│  └── Manages assembly_members table
└── Uses RLS policies for security
```

---

**Visual Guide Complete** ✅  
Ready for admin use and training
