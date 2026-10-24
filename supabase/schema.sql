create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references public.profiles(user_id) on delete cascade,
  nickname text not null default '小宇航员',
  age_group text not null default '3-4' check (age_group in ('3-4','5-6')),
  created_at timestamptz not null default now()
);

create table public.parent_settings (
  child_id uuid primary key references public.children(id) on delete cascade,
  daily_question_goal smallint not null default 10 check (daily_question_goal between 1 and 50),
  daily_time_limit_minutes smallint not null default 20 check (daily_time_limit_minutes between 1 and 120),
  sound_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (subject in ('chinese','math','english')),
  age_group text not null check (age_group in ('3-4','5-6')),
  prompt text not null, emoji text, question_text text not null,
  speech_text text not null, speech_language text not null default 'zh-CN',
  difficulty smallint not null default 1, is_active boolean not null default true,
  content_version integer not null default 1, created_at timestamptz not null default now()
);

create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null, sort_order smallint not null, is_correct boolean not null default false
);

create table public.learning_sessions (
  id uuid primary key default gen_random_uuid(), child_id uuid not null references public.children(id) on delete cascade,
  subject text not null, age_group text not null, started_at timestamptz not null default now(),
  ended_at timestamptz, active_seconds integer not null default 0, completed boolean not null default false
);

create table public.answer_records (
  id uuid primary key default gen_random_uuid(), client_event_id uuid not null unique,
  session_id uuid not null references public.learning_sessions(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  question_id uuid not null references public.questions(id), selected_option_id uuid references public.question_options(id),
  is_correct boolean not null, answered_at timestamptz not null default now()
);

create table public.reward_accounts (
  child_id uuid primary key references public.children(id) on delete cascade,
  star_total integer not null default 0, updated_at timestamptz not null default now()
);

create table public.learning_snapshots (
  child_id uuid primary key references public.children(id) on delete cascade,
  state_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.parent_settings enable row level security;
alter table public.learning_sessions enable row level security;
alter table public.answer_records enable row level security;
alter table public.reward_accounts enable row level security;
alter table public.learning_snapshots enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own children" on public.children for all using (auth.uid() = parent_user_id) with check (auth.uid() = parent_user_id);
create policy "own child settings" on public.parent_settings for all using (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid())) with check (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid()));
create policy "own sessions" on public.learning_sessions for all using (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid())) with check (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid()));
create policy "own answers" on public.answer_records for all using (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid())) with check (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid()));
create policy "own rewards" on public.reward_accounts for select using (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid()));
create policy "own snapshots" on public.learning_snapshots for all using (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid())) with check (exists(select 1 from public.children c where c.id=child_id and c.parent_user_id=auth.uid()));

-- Allow Supabase Data API calls. The RLS policies above still protect rows.
grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.children to authenticated;
grant select, insert, update, delete on public.parent_settings to authenticated;
grant select, insert, update, delete on public.learning_sessions to authenticated;
grant select, insert, update, delete on public.answer_records to authenticated;
grant select, insert, update, delete on public.reward_accounts to authenticated;
grant select, insert, update, delete on public.learning_snapshots to authenticated;
