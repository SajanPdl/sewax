
export interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  preview_url?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  recommended?: boolean;
}

export interface Tenant {
  id: string;
  companyName: string;
  subdomain: string;
  plan: string;
  createdAt: string;
  status: 'active' | 'pending';
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface ChartData {
  name: string;
  visitors: number;
  sales: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export interface UseCase {
  title: string;
  description: string;
  icon: any; // Lucide icon type
  benefits: string[];
}

// Commerce Interfaces
export interface Product {
  id: string;
  title: string;
  price: number;
  inventory: number;
  sku: string;
  image: string;
  category: string;
  status: 'Active' | 'Draft' | 'Low Stock';
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'Completed' | 'Pending' | 'Refunded';
  channel: 'Online' | 'POS';
  date: string;
  itemsCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  domain: string;
  plan: string;
  themeId: string;
}