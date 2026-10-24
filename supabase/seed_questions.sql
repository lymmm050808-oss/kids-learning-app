-- Generated from src/data/questionBank.ts. Run once in Supabase SQL Editor.
begin;

create or replace function public.get_learning_questions(p_subject text, p_age_group text)
returns table (emoji text, prompt text, speech text, lang text, question text, answers text[], correct text)
language sql security definer set search_path = public as $$
  select q.emoji, q.prompt, q.speech_text, q.speech_language, q.question_text,
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
revoke all on public.questions, public.question_options from anon, authenticated;

delete from public.question_options where question_id in (select id from public.questions where content_version = 1);
delete from public.questions where content_version = 1;

with q_3_4_chinese_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '月', '🌙', '哪一个是“月”？', '月', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_1, (values
  ('日', 1, false),
  ('月', 2, true),
  ('山', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '水', '💧', '请找到“水”字', '水', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_2, (values
  ('木', 1, false),
  ('火', 2, false),
  ('水', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '山', '⛰️', '哪一个字读“山”？', '山', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_3, (values
  ('山', 1, true),
  ('口', 2, false),
  ('手', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '日', '☀️', '太阳对应哪个字？', '日', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_4, (values
  ('月', 1, false),
  ('日', 2, true),
  ('木', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '木', '🌳', '请找到“木”字', '木', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_5, (values
  ('水', 1, false),
  ('人', 2, false),
  ('木', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '口', '👄', '嘴巴对应哪个字？', '口', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_6, (values
  ('手', 1, false),
  ('口', 2, true),
  ('人', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '手', '✋', '哪一个字读“手”？', '手', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_7, (values
  ('口', 1, false),
  ('山', 2, false),
  ('手', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '人', '🧍', '请找到“人”字', '人', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_8, (values
  ('人', 1, true),
  ('木', 2, false),
  ('日', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '火', '🔥', '火焰对应哪个字？', '火', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_9, (values
  ('水', 1, false),
  ('火', 2, true),
  ('木', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '禾', '🌾', '哪一个字读“禾”？', '禾', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_10, (values
  ('禾', 1, true),
  ('木', 2, false),
  ('米', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '家', '🏠', '请找到“家”字', '家', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_11, (values
  ('学', 1, false),
  ('家', 2, true),
  ('云', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_chinese_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '3-4', '云', '☁️', '白云对应哪个字？', '云', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_chinese_12, (values
  ('雨', 1, false),
  ('天', 2, false),
  ('云', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '1 + 1', '🍎🍎', '一共有几个苹果？', '一加一', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_1, (values
  ('1', 1, false),
  ('2', 2, true),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '2 + 1', '⭐⭐⭐', '一共有几颗星星？', '二加一', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_2, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '3 + 1', '🐥🐥🐥🐥', '一共有几只小鸡？', '三加一', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_3, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '数一数', '🚀', '这里有几个火箭？', '数一数，有几个火箭', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_4, (values
  ('1', 1, true),
  ('2', 2, false),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '数一数', '🪐🪐🪐🪐🪐', '这里有几个星球？', '数一数，有几个星球', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_5, (values
  ('3', 1, false),
  ('4', 2, false),
  ('5', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '1 + 2', '🍓🍓🍓', '一共有几个草莓？', '一加二', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_6, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '2 + 3', '🎈🎈🎈🎈🎈', '一共有几个气球？', '二加三', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_7, (values
  ('3', 1, false),
  ('4', 2, false),
  ('5', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '2 + 2', '🌟🌟🌟🌟', '一共有几颗亮星？', '二加二', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_8, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '数一数', '🌼🌼', '这里有几朵花？', '数一数，有几朵花', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_9, (values
  ('1', 1, false),
  ('2', 2, true),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '数一数', '🐟🐟🐟🐟', '这里有几条鱼？', '数一数，有几条鱼', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_10, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '4 + 1', '🍪🍪🍪🍪🍪', '一共有几块饼干？', '四加一', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_11, (values
  ('4', 1, false),
  ('5', 2, true),
  ('6', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_math_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '3-4', '2 + 1', '🧸🧸🧸', '一共有几个玩具熊？', '二加一', 'zh-CN', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_math_12, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'apple', '🍎', '苹果的英文是什么？', 'apple', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_1, (values
  ('apple', 1, true),
  ('cat', 2, false),
  ('sun', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'cat', '🐱', '小猫的英文是什么？', 'cat', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_2, (values
  ('dog', 1, false),
  ('cat', 2, true),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'sun', '☀️', '太阳的英文是什么？', 'sun', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_3, (values
  ('star', 1, false),
  ('sun', 2, true),
  ('tree', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'dog', '🐶', '小狗的英文是什么？', 'dog', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_4, (values
  ('cat', 1, false),
  ('book', 2, false),
  ('dog', 3, true)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'moon', '🌙', '月亮的英文是什么？', 'moon', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_5, (values
  ('moon', 1, true),
  ('sun', 2, false),
  ('car', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'tree', '🌳', '大树的英文是什么？', 'tree', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_6, (values
  ('book', 1, false),
  ('tree', 2, true),
  ('apple', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'car', '🚗', '小汽车的英文是什么？', 'car', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_7, (values
  ('dog', 1, false),
  ('car', 2, true),
  ('sun', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'book', '📘', '书的英文是什么？', 'book', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_8, (values
  ('book', 1, true),
  ('tree', 2, false),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'star', '⭐', '星星的英文是什么？', 'star', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_9, (values
  ('sun', 1, false),
  ('star', 2, true),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'fish', '🐟', '小鱼的英文是什么？', 'fish', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_10, (values
  ('bird', 1, false),
  ('fish', 2, true),
  ('cat', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'bird', '🐦', '小鸟的英文是什么？', 'bird', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_11, (values
  ('bird', 1, true),
  ('dog', 2, false),
  ('fish', 3, false)
) as options(option_text, sort_order, is_correct);

with q_3_4_english_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '3-4', 'flower', '🌼', '花朵的英文是什么？', 'flower', 'en-US', 1, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_3_4_english_12, (values
  ('tree', 1, false),
  ('flower', 2, true),
  ('grass', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '月', '🌙', '哪一个是“月”？', '月', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_1, (values
  ('日', 1, false),
  ('月', 2, true),
  ('山', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '水', '💧', '请找到“水”字', '水', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_2, (values
  ('木', 1, false),
  ('火', 2, false),
  ('水', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '山', '⛰️', '哪一个字读“山”？', '山', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_3, (values
  ('山', 1, true),
  ('口', 2, false),
  ('手', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '日', '☀️', '太阳对应哪个字？', '日', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_4, (values
  ('月', 1, false),
  ('日', 2, true),
  ('木', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '木', '🌳', '请找到“木”字', '木', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_5, (values
  ('水', 1, false),
  ('人', 2, false),
  ('木', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '口', '👄', '嘴巴对应哪个字？', '口', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_6, (values
  ('手', 1, false),
  ('口', 2, true),
  ('人', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '手', '✋', '哪一个字读“手”？', '手', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_7, (values
  ('口', 1, false),
  ('山', 2, false),
  ('手', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '人', '🧍', '请找到“人”字', '人', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_8, (values
  ('人', 1, true),
  ('木', 2, false),
  ('日', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '火', '🔥', '火焰对应哪个字？', '火', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_9, (values
  ('水', 1, false),
  ('火', 2, true),
  ('木', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '禾', '🌾', '哪一个字读“禾”？', '禾', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_10, (values
  ('禾', 1, true),
  ('木', 2, false),
  ('米', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '家', '🏠', '请找到“家”字', '家', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_11, (values
  ('学', 1, false),
  ('家', 2, true),
  ('云', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_chinese_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('chinese', '5-6', '云', '☁️', '白云对应哪个字？', '云', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_chinese_12, (values
  ('雨', 1, false),
  ('天', 2, false),
  ('云', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '1 + 1', '🍎🍎', '一共有几个苹果？', '一加一', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_1, (values
  ('1', 1, false),
  ('2', 2, true),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '2 + 1', '⭐⭐⭐', '一共有几颗星星？', '二加一', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_2, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '3 + 1', '🐥🐥🐥🐥', '一共有几只小鸡？', '三加一', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_3, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '数一数', '🚀', '这里有几个火箭？', '数一数，有几个火箭', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_4, (values
  ('1', 1, true),
  ('2', 2, false),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '数一数', '🪐🪐🪐🪐🪐', '这里有几个星球？', '数一数，有几个星球', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_5, (values
  ('3', 1, false),
  ('4', 2, false),
  ('5', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '1 + 2', '🍓🍓🍓', '一共有几个草莓？', '一加二', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_6, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '2 + 3', '🎈🎈🎈🎈🎈', '一共有几个气球？', '二加三', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_7, (values
  ('3', 1, false),
  ('4', 2, false),
  ('5', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '2 + 2', '🌟🌟🌟🌟', '一共有几颗亮星？', '二加二', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_8, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '数一数', '🌼🌼', '这里有几朵花？', '数一数，有几朵花', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_9, (values
  ('1', 1, false),
  ('2', 2, true),
  ('3', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '数一数', '🐟🐟🐟🐟', '这里有几条鱼？', '数一数，有几条鱼', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_10, (values
  ('3', 1, false),
  ('4', 2, true),
  ('5', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '4 + 1', '🍪🍪🍪🍪🍪', '一共有几块饼干？', '四加一', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_11, (values
  ('4', 1, false),
  ('5', 2, true),
  ('6', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_math_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('math', '5-6', '2 + 1', '🧸🧸🧸', '一共有几个玩具熊？', '二加一', 'zh-CN', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_math_12, (values
  ('2', 1, false),
  ('3', 2, true),
  ('4', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_1 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'apple', '🍎', '苹果的英文是什么？', 'apple', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_1, (values
  ('apple', 1, true),
  ('cat', 2, false),
  ('sun', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_2 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'cat', '🐱', '小猫的英文是什么？', 'cat', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_2, (values
  ('dog', 1, false),
  ('cat', 2, true),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_3 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'sun', '☀️', '太阳的英文是什么？', 'sun', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_3, (values
  ('star', 1, false),
  ('sun', 2, true),
  ('tree', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_4 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'dog', '🐶', '小狗的英文是什么？', 'dog', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_4, (values
  ('cat', 1, false),
  ('book', 2, false),
  ('dog', 3, true)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_5 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'moon', '🌙', '月亮的英文是什么？', 'moon', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_5, (values
  ('moon', 1, true),
  ('sun', 2, false),
  ('car', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_6 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'tree', '🌳', '大树的英文是什么？', 'tree', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_6, (values
  ('book', 1, false),
  ('tree', 2, true),
  ('apple', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_7 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'car', '🚗', '小汽车的英文是什么？', 'car', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_7, (values
  ('dog', 1, false),
  ('car', 2, true),
  ('sun', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_8 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'book', '📘', '书的英文是什么？', 'book', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_8, (values
  ('book', 1, true),
  ('tree', 2, false),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_9 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'star', '⭐', '星星的英文是什么？', 'star', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_9, (values
  ('sun', 1, false),
  ('star', 2, true),
  ('moon', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_10 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'fish', '🐟', '小鱼的英文是什么？', 'fish', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_10, (values
  ('bird', 1, false),
  ('fish', 2, true),
  ('cat', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_11 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'bird', '🐦', '小鸟的英文是什么？', 'bird', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_11, (values
  ('bird', 1, true),
  ('dog', 2, false),
  ('fish', 3, false)
) as options(option_text, sort_order, is_correct);

with q_5_6_english_12 as (
  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)
  values ('english', '5-6', 'flower', '🌼', '花朵的英文是什么？', 'flower', 'en-US', 2, 1)
  returning id
) insert into public.question_options (question_id, option_text, sort_order, is_correct)
select id, option_text, sort_order, is_correct
from q_5_6_english_12, (values
  ('tree', 1, false),
  ('flower', 2, true),
  ('grass', 3, false)
) as options(option_text, sort_order, is_correct);

commit;
