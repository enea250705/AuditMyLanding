-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── Profiles (extends Supabase Auth) ────────────────────────────────────────
create table profiles (
  id uuid references auth.users primary key,
  email text,
  full_name text,
  plan text default 'free',        -- free | starter | pro | agency
  audits_used int default 0,
  audits_limit int default 3,
  lemonsqueezy_customer_id text,
  lemonsqueezy_subscription_id text,
  created_at timestamp default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Audits ───────────────────────────────────────────────────────────────────
create table audits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  url text not null,
  status text default 'pending',   -- pending | processing | complete | failed
  overall_score int,
  headline_score int,
  cta_score int,
  trust_score int,
  clarity_score int,
  social_proof_score int,
  headline_insight text,
  cta_insight text,
  trust_insight text,
  clarity_insight text,
  social_proof_insight text,
  suggestions jsonb,               -- [{priority, title, description, rewrite}]
  raw_html text,
  screenshot_url text,
  error_message text,
  created_at timestamp default now()
);

-- RLS
alter table audits enable row level security;
alter table profiles enable row level security;

create policy "Users can view their own audits"
  on audits for select using (auth.uid() = user_id);

create policy "Users can insert their own audits"
  on audits for insert with check (auth.uid() = user_id);

create policy "Users can view their own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- ── Waitlist ─────────────────────────────────────────────────────────────────
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);
