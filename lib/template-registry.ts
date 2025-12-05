import { 
  ShoppingBag, ShoppingCart, Monitor, Package, User, Tag, 
  Megaphone, MapPin, FileText, Bell, LayoutDashboard, Settings, 
  CreditCard, Users, Puzzle, HelpCircle, Globe, PenTool, BarChart2,
  Utensils, ChefHat, BookOpen, Calendar, ClipboardList, Layers
} from 'lucide-react';

export type ModuleType = 
  // Core
  | 'overview' | 'settings' | 'billing' | 'team' | 'support' 
  | 'reports' | 'integrations' | 'notifications' | 'locations'
  // Commerce
  | 'products' | 'orders' | 'inventory' | 'customers' | 'pos' | 'discounts'
  // Restaurant
  | 'menu' | 'tables' | 'kitchen'
  // Service
  | 'services' | 'appointments'
  // Education
  | 'courses' | 'students'
  // Agency/Portfolio
  | 'projects' | 'cms'
  // Growth & Site
  | 'sites' | 'builder' | 'templates' | 'analytics' | 'marketing';

export interface TemplateConfig {
  slug: string;
  name: string;
  industry: 'retail' | 'food' | 'service' | 'education' | 'agency';
  modules: Partial<Record<ModuleType, boolean>>;
}

export const MASTER_REGISTRY: Record<string, TemplateConfig> = {
  'E-commerce': {
    slug: 'ecommerce',
    name: 'Online Store',
    industry: 'retail',
    modules: {
      overview: true, products: true, orders: true, customers: true, 
      inventory: true, discounts: true, marketing: true, analytics: true,
      sites: true, builder: true, templates: true,
      locations: true, team: true, reports: true, billing: true, 
      integrations: true, settings: true, support: true, notifications: true
    }
  },
  'Restaurant': {
    slug: 'restaurant',
    name: 'Restaurant & Cafe',
    industry: 'food',
    modules: {
      overview: true, pos: true, orders: true, tables: true, kitchen: true,
      menu: true, inventory: true, customers: true,
      sites: true, builder: true, templates: true, analytics: true,
      locations: true, team: true, reports: true, billing: true, 
      integrations: true, settings: true, support: true, notifications: true
    }
  },
  'Service': {
    slug: 'service',
    name: 'Service Business',
    industry: 'service',
    modules: {
      overview: true, services: true, appointments: true, customers: true,
      pos: true, marketing: true, analytics: true,
      sites: true, builder: true, templates: true,
      locations: true, team: true, reports: true, billing: true, 
      integrations: true, settings: true, support: true, notifications: true
    }
  },
  'Education': {
    slug: 'education',
    name: 'Online Course',
    industry: 'education',
    modules: {
      overview: true, courses: true, students: true, marketing: true,
      sites: true, builder: true, templates: true, analytics: true,
      team: true, reports: true, billing: true, 
      integrations: true, settings: true, support: true, notifications: true
    }
  },
  'Agency': {
    slug: 'agency',
    name: 'Agency / Portfolio',
    industry: 'agency',
    modules: {
      overview: true, projects: true, cms: true, marketing: true,
      sites: true, builder: true, templates: true, analytics: true,
      team: true, billing: true, 
      integrations: true, settings: true, support: true, notifications: true
    }
  },
  // Default fallback
  'General': {
    slug: 'general',
    name: 'General Business',
    industry: 'retail',
    modules: {
      overview: true, products: true, orders: true, customers: true,
      sites: true, builder: true, templates: true,
      team: true, billing: true, settings: true, support: true
    }
  }
};

export const getTemplateConfig = (category: string = 'General'): TemplateConfig => {
  // Normalize category to match registry keys
  const mapping: Record<string, string> = {
    'Travel': 'Service',
    'Hospitality': 'Service',
    'SaaS': 'Agency',
    'Business': 'General'
  };

  const key = mapping[category] || category;
  // Fallback to key if direct match, or General if not found
  return MASTER_REGISTRY[key] || MASTER_REGISTRY['General'];
};