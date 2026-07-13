ALTER TABLE public.department_units
ADD COLUMN IF NOT EXISTS head_name TEXT;

SELECT pg_notify('pgrst', 'reload schema');
