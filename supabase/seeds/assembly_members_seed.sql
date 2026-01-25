-- Sample Electoral Areas for Ga South Municipality
-- Uncomment and modify as needed for your specific electoral areas

-- INSERT INTO electoral_areas (name, display_order, is_active) VALUES
-- ('Weija Electoral Area', 1, true),
-- ('Kasoa Electoral Area', 2, true),
-- ('Brofoyedu Electoral Area', 3, true),
-- ('Gomoa Electoral Area', 4, true),
-- ('Awutu Electoral Area', 5, true),
-- ('Adentan Electoral Area', 6, true),
-- ('Asokwa Electoral Area', 7, true),
-- ('Senya Electoral Area', 8, true);

-- Sample Assembly Members
-- Uncomment and modify with actual member details

-- INSERT INTO assembly_members (name, electoral_area_id, position, bio, contact_email, contact_phone, display_order, is_active) VALUES
-- ('John Doe', (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'), 'Elected Assembly Member', 'Community leader and advocate for development', 'john@example.com', '+233 XXX XXX XXX', 1, true),
-- ('Jane Smith', (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'), 'Elected Assembly Member', 'Education and social services expert', 'jane@example.com', '+233 XXX XXX XXX', 2, true);

-- Note: To add or edit assembly members, use the Admin Dashboard
-- The admin interface allows uploading member images, editing details, and managing electoral areas
