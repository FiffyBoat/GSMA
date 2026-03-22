-- Add `status` column to events and helper trigger/function
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'upcoming';

-- Populate existing rows based on start_date/end_date
UPDATE events SET status = (
  CASE
    WHEN (COALESCE(end_date, start_date) < now()) THEN 'past'
    WHEN (start_date <= now() AND (end_date IS NULL OR end_date >= now())) THEN 'ongoing'
    ELSE 'upcoming'
  END
);

-- Function to set status on insert/update
CREATE OR REPLACE FUNCTION set_event_status()
RETURNS trigger AS $$
BEGIN
  IF (NEW.start_date IS NULL) THEN
    NEW.status := 'upcoming';
  ELSIF (COALESCE(NEW.end_date, NEW.start_date) < now()) THEN
    NEW.status := 'past';
  ELSIF (NEW.start_date <= now() AND (NEW.end_date IS NULL OR NEW.end_date >= now())) THEN
    NEW.status := 'ongoing';
  ELSE
    NEW.status := 'upcoming';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run on insert or update
DROP TRIGGER IF EXISTS trg_set_event_status ON events;
CREATE TRIGGER trg_set_event_status
BEFORE INSERT OR UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION set_event_status();

-- Function to refresh statuses for all events (callable via RPC)
CREATE OR REPLACE FUNCTION refresh_event_statuses()
RETURNS void AS $$
BEGIN
  UPDATE events SET status = (
    CASE
      WHEN (COALESCE(end_date, start_date) < now()) THEN 'past'
      WHEN (start_date <= now() AND (end_date IS NULL OR end_date >= now())) THEN 'ongoing'
      ELSE 'upcoming'
    END
  );
END;
$$ LANGUAGE plpgsql;
