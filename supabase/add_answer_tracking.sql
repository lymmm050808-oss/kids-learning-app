-- Run once in Supabase SQL Editor to enable detailed answer tracking.
alter table public.answer_records
add column if not exists selected_answer_text text;

drop function if exists public.get_learning_questions(text, text);
create function public.get_learning_questions(p_subject text, p_age_group text)
returns table (question_id uuid, emoji text, prompt text, speech text, lang text, question text, answers text[], correct text)
language sql security definer set search_path = public as $$
  select q.id, q.emoji, q.prompt, q.speech_text, q.speech_language, q.question_text,
    array_agg(o.option_text order by o.sort_order),
    max(o.option_text) filter (where o.is_correct)
  from public.questions q
  join public.question_options o on o.question_id = q.id
  where q.subject = p_subject and q.age_group = p_age_group and q.is_active
  group by q.id
  order by q.created_at;
$$;

revoke all on function public.get_learning_questions(text, text) from public;
grant execute on function public.get_learning_questions(text, text) to anon, authenticated;
