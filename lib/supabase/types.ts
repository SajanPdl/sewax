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
          email: string
          full_name: string | null
          avatar_url: string | null
          is_super_admin: boolean
          phone_number: string | null
          last_login_at: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_super_admin?: boolean
          phone_number?: string | null
          last_login_at?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_super_admin?: boolean
          phone_number?: string | null
          last_login_at?: string | null
          updated_at?: string | null
        }
      }
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          custom_domain: string | null
          domain_verified: boolean
          plan: string
          subscription_status: 'trial' | 'active' | 'past_due' | 'canceled' | 'lifetime'
          trial_ends_at: string | null
          current_period_ends_at: string | null
          stripe_customer_id: string | null
          settings: Json
          logo_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          name: string
          slug: string
          custom_domain?: string | null
          domain_verified?: boolean
          plan?: string
          subscription_status?: 'trial' | 'active' | 'past_due' | 'canceled' | 'lifetime'
          trial_ends_at?: string | null
          current_period_ends_at?: string | null
          stripe_customer_id?: string | null
          settings?: Json
          logo_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string
          slug?: string
          custom_domain?: string | null
          domain_verified?: boolean
          plan?: string
          subscription_status?: 'trial' | 'active' | 'past_due' | 'canceled' | 'lifetime'
          trial_ends_at?: string | null
          current_period_ends_at?: string | null
          stripe_customer_id?: string | null
          settings?: Json
          logo_url?: string | null
          updated_at?: string | null
        }
      }
      tenant_members: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          role: 'Owner' | 'Admin' | 'Editor' | 'Viewer' | 'Support_Agent'
          joined_at: string
          invited_by: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          role?: 'Owner' | 'Admin' | 'Editor' | 'Viewer' | 'Support_Agent'
          joined_at?: string
          invited_by?: string | null
        }
        Update: {
          role?: 'Owner' | 'Admin' | 'Editor' | 'Viewer' | 'Support_Agent'
          invited_by?: string | null
        }
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          title: string
          slug: string
          description: string | null
          price: number
          compare_at_price: number | null
          cost_price: number | null
          inventory: number
          track_inventory: boolean
          sku: string | null
          barcode: string | null
          image_url: string | null
          gallery_images: string[] | null
          category: string | null
          tags: string[] | null
          status: string
          is_featured: boolean
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          tenant_id: string
          title: string
          slug: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          inventory?: number
          track_inventory?: boolean
          sku?: string | null
          barcode?: string | null
          image_url?: string | null
          gallery_images?: string[] | null
          category?: string | null
          tags?: string[] | null
          status?: string
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          title?: string
          slug?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          inventory?: number
          track_inventory?: boolean
          sku?: string | null
          barcode?: string | null
          image_url?: string | null
          gallery_images?: string[] | null
          category?: string | null
          tags?: string[] | null
          status?: string
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          updated_at?: string | null
        }
      }
      customers: {
        Row: {
          id: string
          tenant_id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          address: Json | null
          total_spent: number
          orders_count: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          tenant_id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          total_spent?: number
          orders_count?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          total_spent?: number
          orders_count?: number
          updated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          tenant_id: string
          customer_id: string | null
          customer_name: string | null
          order_number: string
          total: number
          subtotal: number
          tax_total: number
          discount_total: number
          status: 'Pending' | 'Processing' | 'Completed' | 'Refunded' | 'Cancelled'
          payment_status: string
          payment_method: 'Card' | 'Cash' | 'eSewa' | 'Khalti' | 'Bank_Transfer'
          channel: 'Online' | 'POS' | 'Marketplace'
          shipping_address: Json | null
          billing_address: Json | null
          notes: string | null
          items_count: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          tenant_id: string
          customer_id?: string | null
          customer_name?: string | null
          order_number: string
          total: number
          subtotal: number
          tax_total?: number
          discount_total?: number
          status?: 'Pending' | 'Processing' | 'Completed' | 'Refunded' | 'Cancelled'
          payment_status?: string
          payment_method?: 'Card' | 'Cash' | 'eSewa' | 'Khalti' | 'Bank_Transfer'
          channel?: 'Online' | 'POS' | 'Marketplace'
          shipping_address?: Json | null
          billing_address?: Json | null
          notes?: string | null
          items_count?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          status?: 'Pending' | 'Processing' | 'Completed' | 'Refunded' | 'Cancelled'
          payment_status?: string
          payment_method?: 'Card' | 'Cash' | 'eSewa' | 'Khalti' | 'Bank_Transfer'
          notes?: string | null
          updated_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          tenant_id: string
          order_id: string
          product_id: string | null
          variant_name: string | null
          sku: string | null
          quantity: number
          price: number
          total: number
        }
        Insert: {
          tenant_id: string
          order_id: string
          product_id?: string | null
          variant_name?: string | null
          sku?: string | null
          quantity: number
          price: number
          // total is generated always as stored
        }
        Update: {
          quantity?: number
          price?: number
        }
      }
      pages: {
        Row: {
          id: string
          tenant_id: string
          title: string
          slug: string
          content: Json | null
          is_published: boolean
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          tenant_id: string
          title: string
          slug: string
          content?: Json | null
          is_published?: boolean
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          title?: string
          slug?: string
          content?: Json | null
          is_published?: boolean
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          updated_at?: string | null
        }
      }
      support_tickets: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          subject: string
          description: string | null
          status: 'Open' | 'In_Progress' | 'Resolved' | 'Closed'
          priority: 'Low' | 'Medium' | 'High' | 'Critical'
          assigned_to: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          tenant_id: string
          user_id?: string | null
          subject: string
          description?: string | null
          status?: 'Open' | 'In_Progress' | 'Resolved' | 'Closed'
          priority?: 'Low' | 'Medium' | 'High' | 'Critical'
          assigned_to?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          subject?: string
          description?: string | null
          status?: 'Open' | 'In_Progress' | 'Resolved' | 'Closed'
          priority?: 'Low' | 'Medium' | 'High' | 'Critical'
          assigned_to?: string | null
          updated_at?: string | null
        }
      }
      ticket_messages: {
        Row: {
          id: string
          ticket_id: string
          sender_id: string | null
          message: string
          is_internal: boolean
          created_at: string
        }
        Insert: {
          ticket_id: string
          sender_id?: string | null
          message: string
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          message?: string
          is_internal?: boolean
        }
      }
      audit_logs: {
        Row: {
          id: string
          tenant_id: string | null
          actor_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          tenant_id?: string | null
          actor_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_at: string | null
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_at?: string | null
        }
        Update: {
          value?: Json
          description?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}