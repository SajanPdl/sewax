export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          is_super_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_super_admin?: boolean
        }
        Update: {
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          custom_domain: string | null
          plan: string
          subscription_status: 'trial' | 'active' | 'past_due' | 'canceled'
          created_at: string
        }
        Insert: {
          name: string
          slug: string
          plan?: string
        }
        Update: {
          name?: string
          custom_domain?: string | null
          plan?: string
        }
      }
      tenant_members: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          role: 'Owner' | 'Admin' | 'Editor' | 'Viewer'
          joined_at: string
        }
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          title: string
          price: number
          inventory: number
          sku: string | null
          image_url: string | null
          category: string | null
          status: string
          created_at: string
        }
        Insert: {
          tenant_id: string
          title: string
          price: number
          inventory?: number
          sku?: string | null
          image_url?: string | null
          category?: string | null
        }
        Update: {
          title?: string
          price?: number
          inventory?: number
        }
      }
      orders: {
        Row: {
          id: string
          tenant_id: string
          customer_name: string | null
          total: number
          status: 'Pending' | 'Processing' | 'Completed' | 'Refunded'
          channel: 'Online' | 'POS'
          items_count: number
          created_at: string
        }
        Insert: {
          tenant_id: string
          total: number
          status?: 'Pending' | 'Processing' | 'Completed'
          channel?: 'Online' | 'POS'
          items_count?: number
        }
      }
    }
  }
}
