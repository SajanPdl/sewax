export interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
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