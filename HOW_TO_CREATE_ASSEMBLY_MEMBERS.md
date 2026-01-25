# How to Create Electoral Areas and Assembly Members

## Quick Start - 3 Easy Ways

---

## Method 1: Using Supabase Studio (Easiest - No SQL Knowledge Required)

### Step 1: Open Supabase Studio
Open your browser and go to:
- **Local**: http://127.0.0.1:54323
- **Cloud**: https://app.supabase.com

### Step 2: Create Electoral Areas

1. In the left sidebar, click **"Table Editor"**
2. Click on the **"electoral_areas"** table
3. Click the **"Insert"** button (or **"+"** icon)
4. Fill in the fields:
   - **name**: "Weija Electoral Area"
   - **description**: (optional) "Central electoral area"
   - **display_order**: 1
   - **is_active**: Toggle to **ON** (checked)
5. Click **"Save"** or **"Save row"**

Repeat for each electoral area:
```
1. Weija Electoral Area (display_order: 1)
2. Kasoa Electoral Area (display_order: 2)
3. Brofoyedu Electoral Area (display_order: 3)
4. Gomoa Electoral Area (display_order: 4)
5. Awutu Electoral Area (display_order: 5)
```

### Step 3: Create Assembly Members

1. Click on the **"assembly_members"** table
2. Click **"Insert"** 
3. Fill in the fields:
   - **name**: "John Doe"
   - **electoral_area_id**: Click the dropdown, select one of the areas you created
   - **position**: "Elected Assembly Member"
   - **bio**: "Community leader and advocate for development"
   - **contact_email**: "john.doe@example.com"
   - **contact_phone**: "+233 XXX XXX XXX"
   - **display_order**: 1
   - **is_active**: ON (checked)
   - **image_url**: (leave blank for now, we'll add later)
4. Click **"Save"**

---

## Method 2: Using SQL Editor (Faster for Multiple Records)

### Step 1: Open SQL Editor
1. In Supabase Studio, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**

### Step 2: Add Electoral Areas

Paste this SQL and click **"Run"**:

```sql
INSERT INTO electoral_areas (name, description, display_order, is_active) VALUES
  ('Weija Electoral Area', 'Central Weija area', 1, true),
  ('Kasoa Electoral Area', 'Kasoa and surrounding areas', 2, true),
  ('Brofoyedu Electoral Area', 'Brofoyedu district', 3, true),
  ('Gomoa Electoral Area', 'Gomoa regions', 4, true),
  ('Awutu Electoral Area', 'Awutu township', 5, true),
  ('Adentan Electoral Area', 'Adentan district', 6, true),
  ('Asokwa Electoral Area', 'Asokwa communities', 7, true),
  ('Senya Electoral Area', 'Senya locality', 8, true);
```

### Step 3: Add Assembly Members

Create a new query and paste:

```sql
INSERT INTO assembly_members (name, electoral_area_id, position, bio, contact_email, contact_phone, display_order, is_active) VALUES
  (
    'Kwame Adjei',
    (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'),
    'Elected Assembly Member',
    'Community development leader with 10 years of experience',
    'kwame.adjei@gsma.gov.gh',
    '+233 20 XXX XXXX',
    1,
    true
  ),
  (
    'Ama Osei',
    (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'),
    'Elected Assembly Member',
    'Education and social services expert',
    'ama.osei@gsma.gov.gh',
    '+233 24 XXX XXXX',
    2,
    true
  ),
  (
    'David Mensah',
    (SELECT id FROM electoral_areas WHERE name = 'Kasoa Electoral Area'),
    'Elected Assembly Member',
    'Business and trade development specialist',
    'david.mensah@gsma.gov.gh',
    '+233 55 XXX XXXX',
    1,
    true
  ),
  (
    'Grace Boateng',
    (SELECT id FROM electoral_areas WHERE name = 'Kasoa Electoral Area'),
    'Elected Assembly Member',
    'Healthcare and community welfare advocate',
    'grace.boateng@gsma.gov.gh',
    '+233 26 XXX XXXX',
    2,
    true
  );
```

---

## Method 3: Using Terminal (Node.js Script)

If you want to automate data entry, create a script:

```bash
node scripts/add-assembly-members.js
```

(We can create this script if you'd like)

---

## Example Data - Ready to Use

### Electoral Areas
```
Weija Electoral Area
Kasoa Electoral Area
Brofoyedu Electoral Area
Gomoa Electoral Area
Awutu Electoral Area
Adentan Electoral Area
Asokwa Electoral Area
Senya Electoral Area
```

### Sample Members Per Area

**Weija Electoral Area:**
- Kwame Adjei (Elected Assembly Member)
- Ama Osei (Elected Assembly Member)
- Benjamin Quarcoo (Government Appointee)

**Kasoa Electoral Area:**
- David Mensah (Elected Assembly Member)
- Grace Boateng (Elected Assembly Member)
- Abena Kusi (Government Appointee)

**Other Areas:** Add similar members as needed

---

## Step-by-Step Using Supabase Studio (Visual)

### Adding an Electoral Area

```
1. Open http://127.0.0.1:54323
   └─ Click "Table Editor" in sidebar
      └─ Click "electoral_areas"
         └─ Click "Insert row" button
            ├─ name: [Type the area name]
            ├─ description: [Optional description]
            ├─ display_order: [1, 2, 3, etc.]
            ├─ is_active: [Toggle ON]
            └─ Click "Save"
```

### Adding an Assembly Member

```
1. Click "Table Editor" in sidebar
   └─ Click "assembly_members"
      └─ Click "Insert row" button
         ├─ name: [Member's full name]
         ├─ electoral_area_id: [Dropdown - select area]
         ├─ position: [E.g., "Elected Assembly Member"]
         ├─ bio: [Short description]
         ├─ contact_email: [Email address]
         ├─ contact_phone: [Phone number]
         ├─ display_order: [1, 2, 3, etc.]
         ├─ is_active: [Toggle ON]
         └─ Click "Save"
```

---

## Verify Your Data

### View Electoral Areas
1. Go to Table Editor
2. Click "electoral_areas"
3. You should see all your areas listed

### View Assembly Members
1. Go to Table Editor
2. Click "assembly_members"
3. You should see all your members listed

### Test on Website
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/about/assembly
3. You should see your electoral areas and members displayed!

---

## Adding Images (Images URLs)

### Option A: Use Supabase Storage

1. In Supabase Studio, go to **"Storage"** tab
2. Click **"New Bucket"** → Name it "assembly-members" → Create
3. Upload member photos
4. Get the public URL from each photo
5. Edit the assembly member record:
   - Click on the member row
   - Set **image_url** to the photo URL
   - Click **"Save"**

### Option B: Use External Image URLs

If you have photos hosted elsewhere (Google Drive, Imgur, etc.):
1. Get the direct image URL
2. Edit the member record → Set **image_url** to the URL → Save

### Option C: Leave Images Empty (For Now)

Members will display with a placeholder avatar until you add images later.

---

## Common Issues

### ❌ "electoral_area_id dropdown is empty"
**Solution**: First, add electoral areas before adding members

### ❌ "Members not showing on website"
**Solution**: 
- Check `is_active = true` for both areas and members
- Restart dev server: `npm run dev`
- Clear browser cache

### ❌ "Images not displaying"
**Solution**:
- Verify image URL is correct and publicly accessible
- Test URL in browser first
- Make sure it's the direct image URL (not a folder)

### ❌ "Data doesn't match the site"
**Solution**:
- Check `display_order` field (controls sort order)
- Verify `is_active = true`
- Restart dev server

---

## Tips

1. **Display Order Matters**: Lower numbers appear first (1, 2, 3...)
2. **Electoral Area Required**: Members MUST be linked to an electoral area
3. **Active Flag**: Use `is_active = false` to hide without deleting
4. **Contact Info**: Email and phone are clickable links on the website
5. **Images**: Optional but recommended for better appearance

---

## Quick Reference - SQL Snippets

### Get all electoral areas
```sql
SELECT * FROM electoral_areas WHERE is_active = true ORDER BY display_order;
```

### Get members for one area
```sql
SELECT am.*, ea.name as electoral_area
FROM assembly_members am
LEFT JOIN electoral_areas ea ON am.electoral_area_id = ea.id
WHERE ea.name = 'Weija Electoral Area'
ORDER BY am.display_order;
```

### Update member image
```sql
UPDATE assembly_members
SET image_url = 'https://your-image-url.jpg'
WHERE name = 'Kwame Adjei';
```

### Hide a member
```sql
UPDATE assembly_members
SET is_active = false
WHERE name = 'Kwame Adjei';
```

### Change display order
```sql
UPDATE assembly_members
SET display_order = 5
WHERE name = 'Kwame Adjei';
```

---

## Next Steps

1. ✅ Choose a method above (easiest: Method 1 with Supabase Studio)
2. ✅ Add 2-3 electoral areas
3. ✅ Add 2-3 members per area
4. ✅ Test on website: http://localhost:3000/about/assembly
5. ✅ Add images when ready

**That's it! You're done!** 🎉

The data will automatically display on the Assembly page!
