
export interface Product {
  id: number;
  title: string;
  description: string; // Short description
  details?: string; // Long description / HTML content / Table of Contents
  coverImage: string;
  type: 'research' | 'textbook' | 'tool';
  status: 'available' | 'unavailable';
  price?: number;
  author?: string;
  pages?: number;
  publishYear?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  type: 'research' | 'textbook' | 'tool';
}

export interface CouncilMember {
  id: number;
  name: string;
  alias?: string;
  title: string;
  role: string;
  image: string;
  bio?: string;
  education?: string[];
  achievements?: string[];
  certificates?: string[];
  pressLinks?: { title: string; url: string; source: string }[];
}

export interface ResearchProject {
  id: number;
  title: string;
  summary: string;
  description?: string;
  leader: string;
  members?: string;
  status: 'completed' | 'ongoing' | 'proposed';
  year: string;
  category: string;
  image?: string;
  pdfUrl?: string;
}

export interface TrainingCourse {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  duration: string;
  location: string;
  image: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  fee?: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

export interface SiteSettings {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: any;
  children?: { 
    label: string; 
    path: string; 
    description?: string;
  }[];
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  summary: string; // Short excerpt
  content?: string; // Full HTML content
  status: 'published' | 'draft' | 'archived';
  views: number;
  featured?: boolean;
  author?: string;
}