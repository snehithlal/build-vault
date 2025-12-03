-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  client_name text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories Table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  parent_id uuid references categories(id) on delete cascade,
  name text not null,
  type text default 'folder', -- 'folder' or 'item_group'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Items Table
create table items (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references categories(id) on delete cascade not null,
  name text not null,
  attributes jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table projects enable row level security;
alter table categories enable row level security;
alter table items enable row level security;

-- Policies for Projects
create policy "Users can view their own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "Users can insert their own projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- Policies for Categories (via Project ownership)
create policy "Users can view categories of their projects"
  on categories for select
  using (
    exists (
      select 1 from projects
      where projects.id = categories.project_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can insert categories to their projects"
  on categories for insert
  with check (
    exists (
      select 1 from projects
      where projects.id = categories.project_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can update categories of their projects"
  on categories for update
  using (
    exists (
      select 1 from projects
      where projects.id = categories.project_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can delete categories of their projects"
  on categories for delete
  using (
    exists (
      select 1 from projects
      where projects.id = categories.project_id
      and projects.user_id = auth.uid()
    )
  );

-- Policies for Items (via Category -> Project ownership)
create policy "Users can view items of their projects"
  on items for select
  using (
    exists (
      select 1 from categories
      join projects on projects.id = categories.project_id
      where categories.id = items.category_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can insert items to their projects"
  on items for insert
  with check (
    exists (
      select 1 from categories
      join projects on projects.id = categories.project_id
      where categories.id = items.category_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can update items of their projects"
  on items for update
  using (
    exists (
      select 1 from categories
      join projects on projects.id = categories.project_id
      where categories.id = items.category_id
      and projects.user_id = auth.uid()
    )
  );

create policy "Users can delete items of their projects"
  on items for delete
  using (
    exists (
      select 1 from categories
      join projects on projects.id = categories.project_id
      where categories.id = items.category_id
      and projects.user_id = auth.uid()
    )
  );
