-- Run once in the Supabase SQL Editor.
-- Keep the app's question bank readable, but prevent client roles from changing it.
begin;

alter table public.questions enable row level security;
alter table public.question_options enable row level security;

drop policy if exists "read active questions" on public.questions;
create policy "read active questions"
  on public.questions
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "read options for active questions" on public.question_options;
create policy "read options for active questions"
  on public.question_options
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.questions q
      where q.id = question_id and q.is_active = true
    )
  );

revoke all privileges on table public.questions from anon, authenticated;
revoke all privileges on table public.question_options from anon, authenticated;
grant select on table public.questions to anon, authenticated;
grant select on table public.question_options to anon, authenticated;

commit;
