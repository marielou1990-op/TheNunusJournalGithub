import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

// Database schema types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  short_description: string;
  image: string;
  images: string[];
  tags: string[];
  category: string;
  in_stock: boolean;
  stock_count: number;
  featured: boolean;
  bestseller: boolean;
  compatibility: string[];
  materials: string;
  size: string;
  rating: number;
  review_count: number;
  sku: string;
  weight: number;
  dimensions: string;
  shipping_class: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: string; // JSON string of order items
  shipping_address: string; // JSON string of shipping address
  shipping_method: string;
  tracking_number?: string;
  carrier?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  status: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
  tags: string[];
  author: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}