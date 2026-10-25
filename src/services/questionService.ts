import { questionBank } from '../data/questionBank'
import type { AgeGroup, Question, SubjectId } from '../types/domain'
import { supabase } from './supabaseClient'

export async function loadQuestions(subject: SubjectId, ageGroup: AgeGroup): Promise<{ questions: Question[]; source: 'cloud' | 'local' }> {
  if (supabase) {
    const { data, error } = await supabase.rpc('get_learning_questions', { p_subject: subject, p_age_group: ageGroup })
    if (error) throw new Error(error.message)
    if (!Array.isArray(data) || data.length === 0) throw new Error('云端暂时没有这类题目，请稍后再试。')
    return { source: 'cloud', questions: data.map((item) => ({ id: item.question_id, emoji: item.emoji || '', prompt: item.prompt, speech: item.speech, lang: item.lang, question: item.question, answers: item.answers })) }
  }
  return { source: 'local', questions: questionBank[subject][ageGroup] }
}
