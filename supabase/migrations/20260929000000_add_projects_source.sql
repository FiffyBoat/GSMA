ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS project_source VARCHAR(30) NOT NULL DEFAULT 'assembly';

ALTER TABLE public.projects
DROP CONSTRAINT IF EXISTS projects_project_source_check;

ALTER TABLE public.projects
ADD CONSTRAINT projects_project_source_check
CHECK (project_source IN ('assembly', 'individual'));

CREATE INDEX IF NOT EXISTS idx_projects_project_source
ON public.projects(project_source);

SELECT pg_notify('pgrst', 'reload schema');
