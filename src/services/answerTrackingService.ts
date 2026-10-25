import type { AgeGroup, SubjectId } from '../types/domain'
import { supabase } from './supabaseClient'

export interface LearningInsight {
  subject: SubjectId
  prompt: string
  questionText: string
  attempts: number
  wrongCount: number
  accuracy: number
}

export async function startLearningSession(childId: string, subject: SubjectId, ageGroup: AgeGroup) {
  if (!supabase) return null
  const { data, error } = await supabase.from('learning_sessions').insert({ child_id: childId, subject, age_group: ageGroup }).select('id').single()
  if (error) throw new Error(error.message)
  return data.id as string
}

export async function submitCloudAnswer(input: { sessionId: string; questionId: string; selectedAnswer: string }) {
  if (!supabase) throw new Error('云端暂不可用，请稍后再试。')
  const { data, error } = await supabase.rpc('submit_learning_answer', {
    p_session_id: input.sessionId,
    p_question_id: input.questionId,
    p_selected_answer: input.selectedAnswer,
  })
  if (error) throw new Error(error.message)
  const result = Array.isArray(data) ? data[0] : data
  if (!result || typeof result.is_correct !== 'boolean' || typeof result.correct_answer !== 'string') {
    throw new Error('云端没有返回有效的答题结果，请稍后再试。')
  }
  return { correct: result.is_correct, correctAnswer: result.correct_answer, persisted: true }
}

export async function finishLearningSession(sessionId: string, activeSeconds: number, completed: boolean) {
  if (!supabase) return
  const { error } = await supabase.from('learning_sessions').update({ ended_at: new Date().toISOString(), active_seconds: activeSeconds, completed }).eq('id', sessionId)
  if (error) throw new Error(error.message)
}

export async function countCloudAnswers(childId: string) {
  if (!supabase) return 0
  const { count, error } = await supabase.from('answer_records').select('id', { count: 'exact', head: true }).eq('child_id', childId)
  if (error) throw new Error(error.message)
  return count || 0
}

export async function loadLearningInsights(childId: string): Promise<LearningInsight[]> {
  if (!supabase) return []
  const { data, error } = await supabase.rpc('get_child_learning_insights', { p_child_id: childId })
  if (error) throw new Error(error.message)
  return (data || []).map((item: { subject: string; prompt: string; question_text: string; attempts: number | string; wrong_count: number | string; accuracy: number | string }) => ({
    subject: item.subject as SubjectId,
    prompt: item.prompt,
    questionText: item.question_text,
    attempts: Number(item.attempts),
    wrongCount: Number(item.wrong_count),
    accuracy: Number(item.accuracy),
  }))
}
