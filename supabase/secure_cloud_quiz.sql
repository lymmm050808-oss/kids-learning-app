-- Run in Supabase SQL Editor after updating the app.
-- Cloud questions no longer include answer keys. The database checks and records each answer.
begin;

alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.answer_records
  add column if not exists selected_answer_text text;

drop policy if exists "read active questions" on public.questions;
create policy "read active questions"
  on public.questions
  for select
  to authenticated
  using (is_active = true);

drop policy if exists "read options for active questions" on public.question_options;
create policy "read options for active questions"
  on public.question_options
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.questions q
      where q.id = question_id and q.is_active = true
    )
  );

-- Do not expose question rows or is_correct through the Data API.
revoke all privileges on table public.questions, public.question_options
  from public, anon, authenticated;

drop function if exists public.get_learning_questions(text, text);
create function public.get_learning_questions(p_subject text, p_age_group text)
returns table (
  question_id uuid,
  emoji text,
  prompt text,
  speech text,
  lang text,
  question text,
  answers text[]
)
language sql
stable
security definer
set search_path = ''
as $$
  select q.id, q.emoji, q.prompt, q.speech_text, q.speech_language,
    q.question_text, array_agg(o.option_text order by o.sort_order)
  from public.questions q
  join public.question_options o on o.question_id = q.id
  where auth.uid() is not null
    and q.subject = p_subject
    and q.age_group = p_age_group
    and q.is_active = true
  group by q.id
  order by q.created_at;
$$;

revoke all on function public.get_learning_questions(text, text) from public, anon;
grant execute on function public.get_learning_questions(text, text) to authenticated;

create or replace function public.submit_learning_answer(
  p_session_id uuid,
  p_question_id uuid,
  p_selected_answer text
)
returns table (is_correct boolean, correct_answer text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_child_id uuid;
  v_session_subject text;
  v_session_age_group text;
  v_selected_option_id uuid;
  v_is_correct boolean;
  v_correct_answer text;
begin
  if auth.uid() is null then
    raise exception 'Please sign in to submit an answer';
  end if;

  select s.child_id, s.subject, s.age_group
    into v_child_id, v_session_subject, v_session_age_group
  from public.learning_sessions s
  join public.children c on c.id = s.child_id
  where s.id = p_session_id
    and c.parent_user_id = auth.uid();

  if not found then
    raise exception 'Learning session not found for this parent account';
  end if;

  select o.id, o.is_correct
    into v_selected_option_id, v_is_correct
  from public.question_options o
  join public.questions q on q.id = o.question_id
  where q.id = p_question_id
    and q.subject = v_session_subject
    and q.age_group = v_session_age_group
    and q.is_active = true
    and o.option_text = p_selected_answer
  order by o.sort_order
  limit 1;

  if not found then
    raise exception 'The selected answer is not an option for this question';
  end if;

  select o.option_text
    into v_correct_answer
  from public.question_options o
  where o.question_id = p_question_id
    and o.is_correct = true
  order by o.sort_order
  limit 1;

  if v_correct_answer is null then
    raise exception 'This question has no correct answer configured';
  end if;

  insert into public.answer_records (
    client_event_id,
    session_id,
    child_id,
    question_id,
    selected_option_id,
    selected_answer_text,
    is_correct
  ) values (
    pg_catalog.gen_random_uuid(),
    p_session_id,
    v_child_id,
    p_question_id,
    v_selected_option_id,
    p_selected_answer,
    v_is_correct
  );

  return query select v_is_correct, v_correct_answer;
end;
$$;

revoke all on function public.submit_learning_answer(uuid, uuid, text) from public, anon;
grant execute on function public.submit_learning_answer(uuid, uuid, text) to authenticated;

-- Answer history stays readable to its owner; only the database may create or alter it.
revoke all privileges on table public.answer_records from public, anon;
revoke insert, update, delete, truncate, references, trigger
  on table public.answer_records from authenticated;
grant select on table public.answer_records to authenticated;

commit;

select
  has_table_privilege('anon', 'public.questions', 'select') as anonymous_can_read_questions,
  has_table_privilege('authenticated', 'public.questions', 'select') as parent_directly_can_read_question_rows,
  has_function_privilege('anon', 'public.get_learning_questions(text,text)', 'execute') as anonymous_can_load_questions,
  has_function_privilege('authenticated', 'public.get_learning_questions(text,text)', 'execute') as parent_can_load_questions,
  has_table_privilege('authenticated', 'public.answer_records', 'insert') as parent_can_insert_unchecked_answers,
  has_function_privilege('authenticated', 'public.submit_learning_answer(uuid,uuid,text)', 'execute') as parent_can_submit_answers;
