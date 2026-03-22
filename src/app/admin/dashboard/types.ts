import type { AdminRole } from "@/lib/admin-roles";

export interface User {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_date: string;
  is_published: boolean;
  tags?: string[];
  posted_by?: string;
  admin_users?: { name: string; email: string };
}

export interface Leadership {
  id: string;
  name: string;
  position: string;
  title: string;
  image_url: string;
  bio: string;
  department?: string;
  display_order: number;
  is_active: boolean;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  location: string;
  contractor: string;
  progress_percentage: number;
  is_featured: boolean;
  display_order: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  event_type: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  organizer: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  images?: string[];
  video_url: string;
  category: string;
  is_featured: boolean;
  display_order: number;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  category: string;
  file_size: number;
  is_published: boolean;
  uploaded_date: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentUnit {
  id: string;
  department_id: string;
  name: string;
  title: string;
  description: string;
  order: number;
}

export interface DepartmentSection {
  title: string;
  content: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  head_name: string;
  head_title: string;
  head_image_url: string;
  description: string;
  tagline?: string;
  overview?: string;
  sections?: DepartmentSection[];
  contact_info?: string;
  order: number;
  is_published: boolean;
  units?: DepartmentUnit[];
  created_at: string;
  updated_at: string;
}

export type AdminTabId =
  | "overview"
  | "slides"
  | "news"
  | "projects"
  | "events"
  | "gallery"
  | "departments"
  | "documents"
  | "leadership"
  | "assembly"
  | "admin-users"
  | "settings";

export interface AdminDashboardData {
  slides: HeroSlide[];
  news: NewsPost[];
  leadership: Leadership[];
  settings: SiteSetting[];
  projects: Project[];
  events: Event[];
  gallery: GalleryItem[];
  documents: Document[];
  departments: Department[];
}
