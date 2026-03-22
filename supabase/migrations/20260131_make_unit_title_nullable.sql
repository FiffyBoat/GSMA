-- Make department_units.title nullable so admin can create units without a short title
ALTER TABLE department_units
  ALTER COLUMN title DROP NOT NULL;
