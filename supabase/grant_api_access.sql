-- Run this once in Supabase SQL Editor after schema.sql.
-- It enables Data API access; RLS still protects each family's rows.
grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.children to authenticated;
grant select, insert, update, delete on public.parent_settings to authenticated;
grant select, insert, update, delete on public.learning_sessions to authenticated;
grant select, insert, update, delete on public.answer_records to authenticated;
grant select, insert, update, delete on public.reward_accounts to authenticated;
