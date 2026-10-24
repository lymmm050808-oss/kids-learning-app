-- Run once in Supabase SQL Editor to enable parent learning insights.
create or replace function public.get_child_learning_insights(p_child_id uuid)
returns table (
  subject text,
  prompt text,
  question_text text,
  attempts bigint,
  wrong_count bigint,
  accuracy integer
)
language sql
security definer
set search_path = public
as $$
  select q.subject, q.prompt, q.question_text,
    count(a.id) as attempts,
    count(a.id) filter (where not a.is_correct) as wrong_count,
    round(100.0 * count(a.id) filter (where a.is_correct) / nullif(count(a.id), 0))::integer as accuracy
  from public.answer_records a
  join public.questions q on q.id = a.question_id
  join public.children c on c.id = a.child_id
  where a.child_id = p_child_id and c.parent_user_id = auth.uid()
  group by q.subject, q.prompt, q.question_text
  order by wrong_count desc, attempts desc, q.subject, q.prompt;
$$;

revoke all on function public.get_child_learning_insights(uuid) from public;
grant execute on function public.get_child_learning_insights(uuid) to authenticated;
