import fs from 'node:fs'

const source = fs.readFileSync(new URL('../src/data/questionBank.ts', import.meta.url), 'utf8')
const objectSource = source.slice(source.indexOf('{', source.indexOf('questionBank'))).trim()
const questionBank = Function(`"use strict"; return (${objectSource})`)()
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const lines = [
  '-- Generated from src/data/questionBank.ts. Run once in Supabase SQL Editor.',
  'begin;',
  '',
  'create or replace function public.get_learning_questions(p_subject text, p_age_group text)',
  'returns table (emoji text, prompt text, speech text, lang text, question text, answers text[], correct text)',
  'language sql security definer set search_path = public as $$',
  '  select q.emoji, q.prompt, q.speech_text, q.speech_language, q.question_text,',
  '    array_agg(o.option_text order by o.sort_order),',
  '    max(o.option_text) filter (where o.is_correct)',
  '  from public.questions q',
  '  join public.question_options o on o.question_id = q.id',
  '  where q.subject = p_subject and q.age_group = p_age_group and q.is_active',
  '  group by q.id',
  '  order by q.created_at;',
  '$$;',
  '',
  'revoke all on function public.get_learning_questions(text, text) from public;',
  'grant execute on function public.get_learning_questions(text, text) to anon, authenticated;',
  'revoke all on public.questions, public.question_options from anon, authenticated;',
  '',
  "delete from public.question_options where question_id in (select id from public.questions where content_version = 1);",
  'delete from public.questions where content_version = 1;',
  '',
]

for (const ageGroup of ['3-4', '5-6']) {
  for (const [subject, questions] of Object.entries(questionBank)) {
    questions.forEach((item, questionIndex) => {
      const alias = `q_${ageGroup.replace('-', '_')}_${subject}_${questionIndex + 1}`
      lines.push(`with ${alias} as (`)
      lines.push('  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)')
      lines.push(`  values (${quote(subject)}, ${quote(ageGroup)}, ${quote(item.prompt)}, ${quote(item.emoji)}, ${quote(item.question)}, ${quote(item.speech)}, ${quote(item.lang || 'zh-CN')}, ${ageGroup === '3-4' ? 1 : 2}, 1)`)
      lines.push('  returning id')
      lines.push(') insert into public.question_options (question_id, option_text, sort_order, is_correct)')
      lines.push('select id, option_text, sort_order, is_correct')
      lines.push(`from ${alias}, (values`)
      item.answers.forEach((answer, optionIndex) => {
        const comma = optionIndex === item.answers.length - 1 ? '' : ','
        lines.push(`  (${quote(answer)}, ${optionIndex + 1}, ${answer === item.correct ? 'true' : 'false'})${comma}`)
      })
      lines.push(') as options(option_text, sort_order, is_correct);', '')
    })
  }
}

lines.push('commit;', '')
fs.writeFileSync(new URL('../supabase/seed_questions.sql', import.meta.url), lines.join('\n'))
console.log('Generated supabase/seed_questions.sql')
