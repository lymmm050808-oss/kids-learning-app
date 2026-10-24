import { questionBank } from '../data/questionBank'
import type { AgeGroup, Question, SubjectId } from '../types/domain'
import { supabase } from './supabaseClient'

export async function loadQuestions(subject: SubjectId, ageGroup: AgeGroup): Promise<{ questions: Question[]; source: 'cloud' | 'local' }> {
  if (supabase) {
    const { data, error } = await supabase.rpc('get_learning_questions', { p_subject: subject, p_age_group: ageGroup })
    if (!error && Array.isArray(data) && data.length > 0) {
      return { source: 'cloud', questions: data.map((item) => ({ id: item.question_id, emoji: item.emoji || '', prompt: item.prompt, speech: item.speech, lang: item.lang, question: item.question, answers: item.answers, correct: item.correct })) }
    }
  }
  return { source: 'local', questions: questionBank[subject][ageGroup] }
}
