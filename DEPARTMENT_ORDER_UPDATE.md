# Department Dropdown List Reorganization

## Summary
Reorganized the department dropdown list in the navigation menu to display in the correct order, and ensured that "Units & Committees" always appears at the end.

## New Department Order
1. Central Administration
2. Finance
3. Education
4. Environmental Health and Sanitation
5. Social Welfare and Community Development
6. Physical Planning
7. Works
8. Units & Committees (always last)

## Changes Made

### 1. Database Schema - Order Column
The `departments` table already has an `order` column (INTEGER DEFAULT 0) that controls the display order in the dropdown menu.

### 2. Migration Files Created

#### `supabase/migrations/20260201_update_department_order.sql`
SQL migration file that:
- Updates the `order` field for each existing department to match the desired order (1-7)
- Updates department names to be consistent:
  - "Education, Youth & Sports" → "Education"
  - "Social Welfare" → "Social Welfare and Community Development"
  - "Health" → "Environmental Health and Sanitation"
- Creates missing departments if they don't exist:
  - Environmental Health and Sanitation
  - Physical Planning
- Sets order > 7 for any new departments added in the future (they'll appear before Units & Committees)

#### `scripts/update-department-order.ts`
TypeScript script for updating department order via Supabase API:
- Programmatically updates department order values
- Updates department names to match the desired naming convention
- Can be run with: `npm run update-department-order`

### 3. Frontend Component
The `src/components/sections/navbar.tsx` component already correctly implements the dropdown structure:
```tsx
dropdown: [
  { name: "All Departments", href: "/departments" },
  ...departments.map((dept) => ({
    name: dept.name,
    href: `/departments/${dept.slug}`,
  })),
  { name: "Units & Committees", href: "/units-committees" },
]
```

Departments are fetched from the API and automatically sorted by the `order` column via `src/app/api/admin/departments/route.ts` which queries with `.order("order", { ascending: true })`.

This ensures:
- Departments appear in the correct order (1-7)
- "Units & Committees" always appears last as a static menu item
- Any new departments added will automatically appear before "Units & Committees" if given an order < 8

## Implementation Steps

To apply these changes:

1. **Option A - Using the SQL migration (if Docker/Supabase is running):**
   ```bash
   # Start Supabase if not already running
   npm run supabase:start
   
   # Apply the migration
   supabase db reset
   ```

2. **Option B - Using the TypeScript script:**
   ```bash
   npm run update-department-order
   ```

3. **Manual via Admin Dashboard:**
   - Log into the admin dashboard
   - Navigate to the Departments section
   - Edit each department and set the Order field:
     - Central Administration: 1
     - Finance: 2
     - Education: 3
     - Environmental Health and Sanitation: 4
     - Social Welfare and Community Development: 5
     - Physical Planning: 6
     - Works: 7
   - For any future departments, set order > 7

## Verification

After applying the changes:
1. Departments dropdown in navbar will display in the correct order
2. "Units & Committees" will always appear last
3. Any new departments added later will automatically appear in the correct position (before Units & Committees)
4. The order is persistent in the database and controlled via the `order` column