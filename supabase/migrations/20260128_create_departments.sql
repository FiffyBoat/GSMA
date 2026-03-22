-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  head_name TEXT NOT NULL,
  head_title TEXT NOT NULL,
  head_image_url TEXT,
  description TEXT NOT NULL,
  contact_info TEXT,
  "order" INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create department_units table
CREATE TABLE IF NOT EXISTS department_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_departments_slug ON departments(slug);
CREATE INDEX IF NOT EXISTS idx_departments_published ON departments(is_published);
CREATE INDEX IF NOT EXISTS idx_department_units_department_id ON department_units(department_id);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE department_units ENABLE ROW LEVEL SECURITY;

-- RLS policies for departments
CREATE POLICY "Departments are viewable by everyone" 
  ON departments FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Only admin can manage departments"
  ON departments FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- RLS policies for department_units
CREATE POLICY "Units are viewable by everyone"
  ON department_units FOR SELECT
  USING (
    department_id IN (
      SELECT id FROM departments WHERE is_published = true
    )
  );

CREATE POLICY "Only admin can manage units"
  ON department_units FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));
