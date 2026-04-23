create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
  name text not null,
  slug text unique not null,
  profile_photo_url text,
  description text not null default '',
  coverage_area text not null default '',
  phone text,
  is_active_today boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  quantity_available integer not null default 0 check (quantity_available >= 0),
  unit text not null default 'kg',
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock', 'low_stock', 'out_of_stock')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendor_locations (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  latitude numeric(10, 6) not null,
  longitude numeric(10, 6) not null,
  place_label text not null,
  is_current boolean not null default true,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_vendors_slug on public.vendors(slug);
create index if not exists idx_products_vendor_id on public.products(vendor_id);
create index if not exists idx_vendor_locations_vendor_id on public.vendor_locations(vendor_id);
create unique index if not exists idx_vendor_locations_current_unique on public.vendor_locations(vendor_id) where is_current = true;

alter table public.users enable row level security;
alter table public.vendors enable row level security;
alter table public.products enable row level security;
alter table public.vendor_locations enable row level security;

drop policy if exists "Public can view vendors" on public.vendors;
drop policy if exists "Public can view products" on public.products;
drop policy if exists "Public can view current vendor locations" on public.vendor_locations;
drop policy if exists "Users can view own profile" on public.users;
drop policy if exists "Users can insert own profile" on public.users;
drop policy if exists "Users can update own profile" on public.users;
drop policy if exists "Vendors can manage own record" on public.vendors;
drop policy if exists "Vendors can manage own products" on public.products;
drop policy if exists "Vendors can manage own locations" on public.vendor_locations;

create policy "Public can view vendors"
on public.vendors for select
using (true);

create policy "Public can view products"
on public.products for select
using (true);

create policy "Public can view current vendor locations"
on public.vendor_locations for select
using (is_current = true);

create policy "Users can view own profile"
on public.users for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.users for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.users for update
using (auth.uid() = id);

create policy "Vendors can manage own record"
on public.vendors for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Vendors can manage own products"
on public.products for all
using (
  exists (
    select 1 from public.vendors
    where public.vendors.id = public.products.vendor_id
      and public.vendors.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vendors
    where public.vendors.id = public.products.vendor_id
      and public.vendors.user_id = auth.uid()
  )
);

create policy "Vendors can manage own locations"
on public.vendor_locations for all
using (
  exists (
    select 1 from public.vendors
    where public.vendors.id = public.vendor_locations.vendor_id
      and public.vendors.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vendors
    where public.vendors.id = public.vendor_locations.vendor_id
      and public.vendors.user_id = auth.uid()
  )
);
