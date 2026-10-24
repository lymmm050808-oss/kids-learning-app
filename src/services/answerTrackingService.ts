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

export async function recordCloudAnswer(input: { sessionId: string; childId: string; questionId: string; selectedAnswer: string; correct: boolean }) {
  if (!supabase) return
  const { error } = await supabase.from('answer_records').insert({
    client_event_id: crypto.randomUUID(), session_id: input.sessionId, child_id: input.childId,
    question_id: input.questionId, selected_answer_text: input.selectedAnswer, is_correct: input.correct,
  })
  if (error) throw new Error(error.message)
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
