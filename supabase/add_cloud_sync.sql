-- Run once in Supabase SQL Editor to enable cloud state synchronization.
create table if not exists public.learning_snapshots (
  child_id uuid primary key references public.children(id) on delete cascade,
  state_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learning_snapshots enable row level security;

drop policy if exists "own snapshots" on public.learning_snapshots;
create policy "own snapshots" on public.learning_snapshots
for all
using (exists (
  select 1 from public.children c
  where c.id = child_id and c.parent_user_id = auth.uid()
))
with check (exists (
  select 1 from public.children c
  where c.id = child_id and c.parent_user_id = auth.uid()
));

grant select, insert, update, delete
on public.learning_snapshots to authenticated;

drop policy if exists "own rewards" on public.reward_accounts;
create policy "own rewards" on public.reward_accounts
for all
using (exists (
  select 1 from public.children c
  where c.id = child_id and c.parent_user_id = auth.uid()
))
with check (exists (
  select 1 from public.children c
  where c.id = child_id and c.parent_user_id = auth.uid()
));
