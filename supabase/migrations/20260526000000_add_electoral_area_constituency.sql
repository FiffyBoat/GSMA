ALTER TABLE electoral_areas
ADD COLUMN IF NOT EXISTS constituency VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_electoral_areas_constituency
ON electoral_areas(constituency);

SELECT pg_notify('pgrst', 'reload schema');
