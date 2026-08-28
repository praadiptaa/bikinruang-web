-- ==============================================================================
-- BIKINRUANG DIGITAL PORTFOLIO & CONTENT MANAGEMENT SYSTEM
-- PostgreSQL Schema for Supabase (Idempotent / Safe to Re-run)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Supabase Auth Profile integration)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SERVICE GROUPS TABLE (EVENT PROPS, PARTY SETS, EVENT DESK)
CREATE TABLE IF NOT EXISTS public.service_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.service_groups(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT,
    image_url TEXT,
    icon_name TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PROJECT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.project_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT NOT NULL,
    scope_description TEXT,
    featured_image_url TEXT NOT NULL,
    project_year INT NOT NULL,
    location TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. PROJECT IMAGES TABLE (Gallery)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. PROJECT SERVICES (Many-to-Many Bridge Table)
CREATE TABLE IF NOT EXISTS public.project_services (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, service_id)
);

-- 9. NEWS / STORIES TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT,
    featured_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. INQUIRIES / CUSTOMER ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    company_name TEXT,
    service_category TEXT,
    event_date DATE,
    budget_range TEXT,
    project_brief TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'approved', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Safe / Idempotent)
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing public read policies if any
DROP POLICY IF EXISTS "Public profiles can be viewed by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Public service groups can be viewed by everyone" ON public.service_groups;
DROP POLICY IF EXISTS "Public services can be viewed by everyone" ON public.services;
DROP POLICY IF EXISTS "Public clients can be viewed by everyone" ON public.clients;
DROP POLICY IF EXISTS "Public project categories can be viewed by everyone" ON public.project_categories;
DROP POLICY IF EXISTS "Public projects can be viewed by everyone" ON public.projects;
DROP POLICY IF EXISTS "Public project images can be viewed by everyone" ON public.project_images;
DROP POLICY IF EXISTS "Public project services can be viewed by everyone" ON public.project_services;
DROP POLICY IF EXISTS "Public news can be viewed by everyone" ON public.news;
DROP POLICY IF EXISTS "Public users can insert inquiries" ON public.inquiries;

-- Create Public Read-Only Access Policies
CREATE POLICY "Public profiles can be viewed by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public service groups can be viewed by everyone" ON public.service_groups FOR SELECT USING (true);
CREATE POLICY "Public services can be viewed by everyone" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public clients can be viewed by everyone" ON public.clients FOR SELECT USING (is_published = true);
CREATE POLICY "Public project categories can be viewed by everyone" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public projects can be viewed by everyone" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public project images can be viewed by everyone" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public project services can be viewed by everyone" ON public.project_services FOR SELECT USING (true);
CREATE POLICY "Public news can be viewed by everyone" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Public users can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Drop existing authenticated policies if any
DROP POLICY IF EXISTS "Authenticated users can manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can manage service groups" ON public.service_groups;
DROP POLICY IF EXISTS "Authenticated users can manage services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can manage clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can manage project categories" ON public.project_categories;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can manage project images" ON public.project_images;
DROP POLICY IF EXISTS "Authenticated users can manage project services" ON public.project_services;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON public.news;
DROP POLICY IF EXISTS "Authenticated users can manage inquiries" ON public.inquiries;

-- Create Authenticated Users Full Access Policies
CREATE POLICY "Authenticated users can manage profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage service groups" ON public.service_groups FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage clients" ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage project categories" ON public.project_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage project images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage project services" ON public.project_services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS & STORAGE POLICIES (Safe / Idempotent)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('projects', 'projects', true),
    ('clients', 'clients', true),
    ('services', 'services', true),
    ('news', 'news', true),
    ('media', 'media', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if any
DROP POLICY IF EXISTS "Public read storage access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload storage access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update storage access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete storage access" ON storage.objects;

-- Create Storage Policies
CREATE POLICY "Public read storage access" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Authenticated upload storage access" ON storage.objects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update storage access" ON storage.objects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete storage access" ON storage.objects FOR DELETE TO authenticated USING (true);

-- ==============================================================================
-- 11. SUPABASE REALTIME REPLICATION (Safe / Idempotent)
-- ==============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'inquiries'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'projects'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'news'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
    END IF;
END $$;
