export type UserRole = 'admin' | 'editor';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceGroup {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  services?: Service[];
}

export interface Service {
  id: string;
  group_id?: string | null;
  title: string;
  slug: string;
  short_description: string;
  description?: string | null;
  image_url?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  service_groups?: ServiceGroup | null;
}

export interface Client {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  description?: string | null;
  website_url?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text?: string | null;
  caption?: string | null;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client_id?: string | null;
  category_id?: string | null;
  short_description: string;
  description?: string | null;
  brief?: string | null;
  vision?: string | null;
  build_process?: string | null;
  result?: string | null;
  project_year: number;
  event_date?: string | null;
  location?: string | null;
  featured_image_url: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // Joins
  clients?: Client | null;
  project_categories?: ProjectCategory | null;
  project_images?: ProjectImage[];
  project_services?: {
    id: string;
    service_id: string;
    services?: Service | null;
  }[];
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string | null;
  author_id?: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
}

export interface InquiryFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  project_type: string;
  estimated_date?: string;
  location?: string;
  budget_range?: string;
  project_description: string;
}

export type InquiryStatus = 'new' | 'reviewed' | 'contacted' | 'approved' | 'declined';

export interface Inquiry {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  company_name?: string | null;
  service_category?: string | null;
  event_date?: string | null;
  location?: string | null;
  budget_range?: string | null;
  project_brief: string;
  status: InquiryStatus;
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

