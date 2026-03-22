-- Update department order to match the desired dropdown arrangement
-- Desired order:
-- 1. Central Administration
-- 2. Finance
-- 3. Education
-- 4. Environmental Health and Sanitation
-- 5. Social Welfare and Community Development
-- 6. Physical Planning
-- 7. Works
-- (Units & Committees comes after all departments)

-- Update existing departments with new order
UPDATE departments SET "order" = 1 WHERE name = 'Central Administration';
UPDATE departments SET "order" = 2 WHERE name = 'Finance';
UPDATE departments SET "order" = 3 WHERE name = 'Education' OR name = 'Education, Youth & Sports';
UPDATE departments SET "order" = 4 WHERE name = 'Environmental Health and Sanitation' OR name = 'Health';
UPDATE departments SET "order" = 5 WHERE name = 'Social Welfare and Community Development' OR name = 'Social Welfare';
UPDATE departments SET "order" = 6 WHERE name = 'Physical Planning';
UPDATE departments SET "order" = 7 WHERE name = 'Works';

-- Update any other departments to have order > 7 so they come before Units & Committees
UPDATE departments SET "order" = 8 WHERE "order" = 0 OR "order" IS NULL;

-- If Environmental Health and Sanitation doesn't exist, create it
INSERT INTO departments (name, slug, head_name, head_title, description, "order", is_published)
SELECT 'Environmental Health and Sanitation', 'environmental-health-sanitation', '', '', 'Department responsible for environmental health and sanitation services', 4, false
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Environmental Health and Sanitation');

-- If Physical Planning doesn't exist, create it
INSERT INTO departments (name, slug, head_name, head_title, description, "order", is_published)
SELECT 'Physical Planning', 'physical-planning', '', '', 'Department responsible for physical planning and development', 6, false
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Physical Planning');

-- Update Social Welfare to include "and Community Development" if it doesn't already
UPDATE departments SET name = 'Social Welfare and Community Development' WHERE name = 'Social Welfare';

-- Update Education to remove "Youth & Sports" if present
UPDATE departments SET name = 'Education' WHERE name = 'Education, Youth & Sports';