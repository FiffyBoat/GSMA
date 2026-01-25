-- Create Assembly Members
INSERT INTO assembly_members (name, electoral_area_id, position, bio, contact_email, contact_phone, display_order, is_active) VALUES
  ('Kwame Adjei', (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'), 'Elected Assembly Member', 'Community leader', 'kwame@gsma.gov.gh', '+233 20 XXX XXXX', 1, true),
  ('Ama Osei', (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'), 'Elected Assembly Member', 'Education expert', 'ama@gsma.gov.gh', '+233 24 XXX XXXX', 2, true),
  ('David Mensah', (SELECT id FROM electoral_areas WHERE name = 'Kasoa Electoral Area'), 'Elected Assembly Member', 'Business specialist', 'david@gsma.gov.gh', '+233 55 XXX XXXX', 1, true),
  ('Grace Boateng', (SELECT id FROM electoral_areas WHERE name = 'Kasoa Electoral Area'), 'Elected Assembly Member', 'Healthcare advocate', 'grace@gsma.gov.gh', '+233 26 XXX XXXX', 2, true);