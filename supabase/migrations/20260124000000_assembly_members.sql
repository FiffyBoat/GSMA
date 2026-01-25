-- Ensure update_updated_at_column function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Assembly Members Table with Electoral Areas

CREATE TABLE IF NOT EXISTS electoral_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assembly_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    electoral_area_id UUID REFERENCES electoral_areas(id) ON DELETE SET NULL,
    position VARCHAR(255), -- Assembly Member, Government Appointee, MP, etc.
    image_url TEXT,
    bio TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_electoral_areas_display_order ON electoral_areas(display_order);
CREATE INDEX IF NOT EXISTS idx_electoral_areas_is_active ON electoral_areas(is_active);
CREATE INDEX IF NOT EXISTS idx_assembly_members_electoral_area ON assembly_members(electoral_area_id);
CREATE INDEX IF NOT EXISTS idx_assembly_members_display_order ON assembly_members(display_order);
CREATE INDEX IF NOT EXISTS idx_assembly_members_is_active ON assembly_members(is_active);

-- Triggers for updated_at
CREATE TRIGGER update_electoral_areas_updated_at BEFORE UPDATE ON electoral_areas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assembly_members_updated_at BEFORE UPDATE ON assembly_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
