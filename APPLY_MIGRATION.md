# How to Apply the Department Column Migration

The admin dashboard has been updated to support assigning department heads (HODs) to departments, but the database column needs to be added manually.

## Steps:

1. **Go to your Supabase Dashboard**
   - Navigate to: https://app.supabase.com/
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and paste this SQL:**

```sql
-- Add department column to leadership table
ALTER TABLE public.leadership 
ADD COLUMN IF NOT EXISTS department VARCHAR(255);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leadership_department 
ON public.leadership(department);
```

4. **Click "Run"** to execute the SQL

5. **Verify Success**
   - You should see: "Success. No rows returned"
   - The column is now ready to use

## What This Does:

- Adds a `department` VARCHAR(255) column to the leadership table
- Allows you to assign department heads to specific departments
- Creates an index for faster department-based queries

## Department Values:

When assigning leaders to departments, use these exact values:
- `central-administration` - Central Administration
- `finance` - Finance
- `education` - Education, Youth & Sports
- `health` - Health
- `agriculture` - Agriculture
- `social-welfare` - Social Welfare
- `works` - Works

## After Adding the Column:

1. Restart the app (`npm run dev`)
2. Go to Admin Dashboard > Leadership
3. Add or edit leaders and assign them to departments
4. Department heads will automatically display on department pages

---

Need help? Check the migration file at: `supabase/migrations/20260124100000_add_department_to_leadership.sql`
