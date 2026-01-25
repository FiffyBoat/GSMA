-- Add department column to leadership table to link HODs to departments
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS department VARCHAR(255);

-- Create index for faster queries by department
CREATE INDEX IF NOT EXISTS idx_leadership_department ON leadership(department);
