-- 1. CLEANUP (Optional: Only run if you want to reset)
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('Owner', 'Admin', 'Editor', 'Viewer');
CREATE TYPE sub_status AS ENUM ('trial', 'active', 'past_due', 'canceled');
CREATE TYPE order_status AS ENUM ('Pending', 'Processing', 'Completed', 'Refunded');
CREATE TYPE channel_type AS ENUM ('Online', 'POS');

-- 3. PROFILES (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TENANTS (The Workspaces/Stores)
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- subdomain
  custom_domain TEXT UNIQUE,
  plan TEXT DEFAULT 'free',
  subscription_status sub_status DEFAULT 'trial',
  settings JSONB DEFAULT '{}'::jsonb, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TENANT MEMBERS (Link Users to Tenants with Roles)
CREATE TABLE public.tenant_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role DEFAULT 'Viewer',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tenant_id, user_id)
);

-- 6. PRODUCTS
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  inventory INTEGER DEFAULT 0,
  sku TEXT,
  image_url TEXT,
  category TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT,
  total DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'Pending',
  channel channel_type DEFAULT 'Online',
  items_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. ORDER ITEMS
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL
);

-- 9. CMS PAGES
CREATE TABLE public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content JSONB,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(tenant_id, slug)
);

-- 10. AUDIT LOGS
CREATE TABLE public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. RLS POLICIES (SECURITY)

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function
CREATE OR REPLACE FUNCTION public.is_tenant_member(_tenant_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM tenant_members 
    WHERE user_id = auth.uid() 
    AND tenant_id = _tenant_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles
CREATE POLICY "Users can see own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Tenants
CREATE POLICY "Members view tenant" ON tenants FOR SELECT USING (is_tenant_member(id));
CREATE POLICY "Owners update tenant" ON tenants FOR UPDATE USING (
  EXISTS (SELECT 1 FROM tenant_members WHERE user_id = auth.uid() AND tenant_id = id AND role IN ('Owner', 'Admin'))
);

-- Products & Orders & Pages (Tenant Isolation)
CREATE POLICY "View tenant products" ON products FOR SELECT USING (is_tenant_member(tenant_id));
CREATE POLICY "Manage tenant products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM tenant_members WHERE user_id = auth.uid() AND tenant_id = products.tenant_id AND role IN ('Owner', 'Admin', 'Editor'))
);

CREATE POLICY "View tenant orders" ON orders FOR SELECT USING (is_tenant_member(tenant_id));
CREATE POLICY "Manage tenant orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM tenant_members WHERE user_id = auth.uid() AND tenant_id = orders.tenant_id AND role IN ('Owner', 'Admin', 'Editor'))
);

CREATE POLICY "View tenant pages" ON pages FOR SELECT USING (is_tenant_member(tenant_id));
CREATE POLICY "Manage tenant pages" ON pages FOR ALL USING (
  EXISTS (SELECT 1 FROM tenant_members WHERE user_id = auth.uid() AND tenant_id = pages.tenant_id AND role IN ('Owner', 'Admin', 'Editor'))
);

-- 12. AUTOMATION TRIGGERS

-- Auto-create Profile & Tenant on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  new_tenant_id UUID;
  slug_val TEXT;
BEGIN
  -- Create Profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  -- Generate slug
  slug_val := split_part(new.email, '@', 1) || '-' || substr(md5(random()::text), 1, 4);

  -- Create Default Tenant
  INSERT INTO public.tenants (name, slug, plan)
  VALUES (coalesce(new.raw_user_meta_data->>'company_name', 'My Store'), slug_val, 'free')
  RETURNING id INTO new_tenant_id;

  -- Add User as Owner
  INSERT INTO public.tenant_members (tenant_id, user_id, role)
  VALUES (new_tenant_id, new.id, 'Owner');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Auto-update Inventory
CREATE OR REPLACE FUNCTION public.update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET inventory = inventory - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_order_item_created
  AFTER INSERT ON public.order_items
  FOR EACH ROW EXECUTE PROCEDURE public.update_inventory();

-- 13. STORAGE
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Tenant members can upload products" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'products');
CREATE POLICY "Public view products" ON storage.objects FOR SELECT TO public USING (bucket_id = 'products');