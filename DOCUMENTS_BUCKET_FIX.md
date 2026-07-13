# Fix Documents Bucket Access

The "Bucket not found" error occurs because:
1. Documents bucket may not be public
2. Storage policies may be missing or incorrect
3. File URLs might be malformed

## Quick Fix (2 minutes)

### Step 1: Run Setup SQL
1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New query**
5. Copy and paste the contents of: `supabase/setup-documents-complete.sql`
6. Click **Run**

### Step 2: Verify
After running the SQL:
- ✅ Documents bucket should be **public**
- ✅ Policies should allow public reads
- ✅ File downloads should work

## Manual Alternative (if SQL doesn't work)

### Option A: Via Storage UI
1. Go to **Storage** in Supabase Dashboard
2. Click on **documents** bucket
3. Click **...** (three dots) → **Edit bucket**
4. Toggle **"Make bucket public"** = **ON**
5. Click **Save**

### Option B: Via Policies
1. Go to **Storage** → **documents** bucket
2. Click **Policies** tab
3. Click **New Policy** → **For SELECT**
4. Choose **Without any conditions**
5. This allows public read access

## Testing
Try downloading a document from `/documents` page. If it still fails:

1. Check browser console (F12) for exact error URL
2. Try accessing the URL directly in browser
3. Verify the bucket name matches: `documents` (lowercase)
4. Ensure file URL format: `https://kgadsaibqofxpzyehkpi.supabase.co/storage/v1/object/public/documents/...`
