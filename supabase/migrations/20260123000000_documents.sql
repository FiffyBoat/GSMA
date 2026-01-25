-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_size BIGINT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    uploaded_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_is_published ON documents(is_published);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_date ON documents(uploaded_date DESC);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Public can read published documents
CREATE POLICY "Public can read published documents" ON documents
    FOR SELECT
    USING (is_published = true);

-- Authenticated users (admin) can manage documents
CREATE POLICY "Authenticated users can insert documents" ON documents
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update documents" ON documents
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete documents" ON documents
    FOR DELETE
    USING (auth.role() = 'authenticated');
