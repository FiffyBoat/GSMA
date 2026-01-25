create table public.admin_users (
  id uuid not null default extensions.uuid_generate_v4 (),
  email character varying(255) not null default 'admin@gsma.gov.gh'::character varying,
  password_hash character varying(255) not null default 'admin123'::character varying,
  name character varying(255) not null default 'admin'::character varying,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint admin_users_pkey primary key (id),
  constraint admin_users_email_key unique (email)
) TABLESPACE pg_default;

create trigger update_admin_users_updated_at BEFORE
update on admin_users for EACH row
execute FUNCTION update_updated_at_column ();