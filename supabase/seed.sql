-- Seed data for local development
-- This file contains sample data for testing

-- Note: Before running this, make sure to create a proper admin user with a real password hash
-- You can generate a password hash using Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = bcrypt.hashSync('your-password', 10);
-- console.log(hash);

-- Sample Hero Slides
INSERT INTO hero_slides (image_url, title, subtitle, description, display_order, is_active) VALUES
    ('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', 'Welcome to GSMA', 'Ghana School Management Association', 'Empowering education through effective school management', 1, true),
    ('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200', 'Quality Education', 'Excellence in Learning', 'Committed to providing quality education for all', 2, true),
    ('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200', 'Community Impact', 'Building Better Schools', 'Working together to improve education outcomes', 3, true)
ON CONFLICT DO NOTHING;

-- Sample News Posts
INSERT INTO news_posts (slug, title, excerpt, content, image_url, published_date, is_published) VALUES
    ('welcome-to-gsma-website', 'Welcome to the New GSMA Website', 'We are excited to launch our new website with improved features and better user experience.', 'This is the full content of the welcome post. The new website provides better access to information about GSMA activities, services, and resources.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', CURRENT_DATE, true),
    ('annual-meeting-2024', 'Annual General Meeting 2024', 'Join us for the Annual General Meeting scheduled for next month.', 'Details about the annual general meeting will be shared soon. All members are encouraged to attend.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', CURRENT_DATE, true)
ON CONFLICT DO NOTHING;

-- Sample Leadership
INSERT INTO leadership (name, position, title, image_url, bio, display_order, is_active) VALUES
    ('John Doe', 'President', 'Dr.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Dr. John Doe has been serving as the President of GSMA for the past 5 years. He brings extensive experience in education management.', 1, true),
    ('Jane Smith', 'Vice President', 'Mrs.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Mrs. Jane Smith serves as the Vice President and has been instrumental in developing key educational initiatives.', 2, true)
ON CONFLICT DO NOTHING;

-- Sample Projects
INSERT INTO projects (
  title, slug, description, content, image_url, category, status,
  start_date, end_date, budget, location, contractor, progress_percentage,
  is_featured, display_order
) VALUES
  (
    'Weija–Mallam Road Rehabilitation',
    'weija-mallam-road-rehabilitation',
    'Rehabilitation of the Weija–Mallam road corridor to improve traffic flow and safety.',
    'This project includes resurfacing, drain construction, pedestrian walkways, and street lighting.\n\nRegular monitoring is conducted to ensure quality and timely delivery.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200',
    'ongoing',
    'in-progress',
    CURRENT_DATE - INTERVAL '120 days',
    NULL,
    2500000,
    'Weija–Mallam Corridor',
    'ABC Roads Ltd.',
    55,
    true,
    1
  ),
  (
    'Five-Storey Office Complex Completion',
    'five-storey-office-complex-completion',
    'Completion and furnishing of the Assembly’s five-storey office complex.',
    'The complex provides a modern working environment and improves service delivery.\n\nFacilities include service hall, conference rooms, offices, and parking.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    'completed',
    'completed',
    CURRENT_DATE - INTERVAL '700 days',
    CURRENT_DATE - INTERVAL '300 days',
    4200000,
    'Ngleshie Amanfro',
    'BuildRight Construction',
    100,
    false,
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Sample Events
INSERT INTO events (
  title, slug, description, content, image_url, event_type,
  start_date, end_date, location, venue, organizer,
  contact_person, contact_email, contact_phone,
  is_featured, is_published, display_order
) VALUES
  (
    'Town Hall Meeting on Fee Fixing Resolution',
    'town-hall-meeting-fee-fixing',
    'Stakeholder engagement on the proposed fee fixing resolution for the fiscal year.',
    'Residents, businesses, and community leaders are invited to participate.\n\nYour input helps improve transparency and accountability.',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
    'hearing',
    NOW() + INTERVAL '10 days',
    NULL,
    'Assembly Hall, Ga South',
    'Assembly Hall',
    'Ga South Municipal Assembly',
    'Public Relations Unit',
    'info@gsma.gov.gh',
    '+233 30 290 8466',
    true,
    true,
    1
  ),
  (
    'Community Durbar on Sanitation',
    'community-durbar-sanitation',
    'Community durbar to discuss sanitation and waste management improvements.',
    'Join us as we discuss practical steps to keep our communities clean.\n\nAll residents are welcome.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    'durbar',
    NOW() + INTERVAL '25 days',
    NULL,
    'Weija',
    'Weija Community Park',
    'Environmental Health Department',
    'Sanitation Officer',
    'sanitation@gsma.gov.gh',
    '+233 20 000 0000',
    false,
    true,
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Sample Gallery Items
INSERT INTO gallery_items (
  title, description, image_url, video_url, category, tags, is_featured, display_order
) VALUES
  (
    'Independence Day Parade Highlights',
    'Highlights from the 67th Independence Day celebration.',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200',
    NULL,
    'event',
    ARRAY['independence', 'parade', 'community'],
    true,
    1
  ),
  (
    'Road Works Progress Update',
    'Progress shots from ongoing road works in the municipality.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200',
    NULL,
    'project',
    ARRAY['roads', 'infrastructure', 'progress'],
    false,
    2
  )
ON CONFLICT DO NOTHING;
