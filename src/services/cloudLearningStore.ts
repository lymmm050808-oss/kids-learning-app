import type { LearningState } from '../types/domain'
import { rollDailyProgress } from './dailyProgress'
import { supabase } from './supabaseClient'

interface CloudBootstrap {
  childId: string
  state: LearningState
  source: 'cloud' | 'local'
}

export async function initializeCloudLearning(localState: LearningState): Promise<CloudBootstrap> {
  if (!supabase) throw new Error('Supabase 尚未连接')
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) throw new Error(userError?.message || '家长尚未登录')
  const userId = userData.user.id

  const { error: profileError } = await supabase.from('profiles').upsert({
    user_id: userId,
    display_name: '家长',
    updated_at: new Date().toISOString(),
  })
  if (profileError) throw new Error(profileError.message)

  const { data: existingChild, error: childReadError } = await supabase
    .from('children')
    .select('id')
    .eq('parent_user_id', userId)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (childReadError) throw new Error(childReadError.message)

  let childId = existingChild?.id as string | undefined
  if (!childId) {
    const { data: newChild, error: childCreateError } = await supabase
      .from('children')
      .insert({ parent_user_id: userId, nickname: '小宇航员', age_group: localState.settings.ageGroup })
      .select('id')
      .single()
    if (childCreateError) throw new Error(childCreateError.message)
    childId = newChild.id
  }
  if (!childId) throw new Error('无法创建儿童档案')
  const resolvedChildId = childId

  const { data: snapshot, error: snapshotError } = await supabase
    .from('learning_snapshots')
    .select('state_json')
    .eq('child_id', resolvedChildId)
    .maybeSingle()
  if (snapshotError) throw new Error(snapshotError.message)
  if (snapshot?.state_json) {
    const savedState = snapshot.state_json as LearningState
    const state = rollDailyProgress(savedState)
    if (state !== savedState) {
      const { error } = await supabase.from('learning_snapshots').upsert({
        child_id: resolvedChildId,
        state_json: state,
        updated_at: new Date().toISOString(),
      })
      if (error) throw new Error(error.message)
    }
    return { childId: resolvedChildId, state, source: 'cloud' }
  }

  await saveCloudLearning(resolvedChildId, localState)
  return { childId: resolvedChildId, state: localState, source: 'local' }
}

export async function saveCloudLearning(childId: string, state: LearningState) {
  if (!supabase) throw new Error('Supabase 尚未连接')
  const now = new Date().toISOString()
  const operations = await Promise.all([
    supabase.from('learning_snapshots').upsert({ child_id: childId, state_json: state, updated_at: now }),
    supabase.from('children').update({ age_group: state.settings.ageGroup }).eq('id', childId),
    supabase.from('parent_settings').upsert({
      child_id: childId,
      daily_question_goal: state.settings.dailyQuestionGoal,
      daily_time_limit_minutes: state.settings.dailyTimeLimitMinutes,
      updated_at: now,
    }),
    supabase.from('reward_accounts').upsert({ child_id: childId, star_total: state.stars, updated_at: now }),
  ])
  const failed = operations.find((result) => result.error)
  if (failed?.error) throw new Error(failed.error.message)
}
