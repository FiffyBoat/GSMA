ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS role VARCHAR(32);

UPDATE admin_users
SET role = 'super_admin'
WHERE role IS NULL;

ALTER TABLE admin_users
ALTER COLUMN role SET DEFAULT 'editor';

ALTER TABLE admin_users
ALTER COLUMN role SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'admin_users_role_check'
  ) THEN
    ALTER TABLE admin_users
    ADD CONSTRAINT admin_users_role_check
    CHECK (role IN ('super_admin', 'content_admin', 'editor'));
  END IF;
END $$;
