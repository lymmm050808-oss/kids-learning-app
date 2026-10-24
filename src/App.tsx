import { useEffect, useRef, useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { ParentAuth } from './components/ParentAuth'
import { LearningInsights } from './components/LearningInsights'
import { InstallAppButton } from './components/InstallAppButton'
import { appConfig } from './config/appConfig'
import { HomePage } from './pages/HomePage'
import { LearningPage } from './pages/LearningPage'
import { ParentPage } from './pages/ParentPage'
import { learningStore } from './services/learningStore'
import { initializeCloudLearning, saveCloudLearning } from './services/cloudLearningStore'
import { countCloudAnswers, finishLearningSession, loadLearningInsights, recordCloudAnswer, startLearningSession, type LearningInsight } from './services/answerTrackingService'
import { checkSupabaseConnection, supabase } from './services/supabaseClient'
import type { AppView, LearningState, ParentSettings, SubjectId } from './types/domain'

const today = () => new Date().toLocaleDateString('en-CA')
const freshDaily = () => ({ date: today(), activeSeconds: 0, correct: { chinese: 0, math: 0, english: 0 }, attempts: { chinese: 0, math: 0, english: 0 }, noticeShown: false })
const initialState = (): LearningState => {
  const fallback: LearningState = { stars: 0, settings: { ageGroup: appConfig.defaultAgeGroup, dailyQuestionGoal: appConfig.defaultDailyQuestionGoal, dailyTimeLimitMinutes: appConfig.defaultDailyTimeLimitMinutes }, daily: freshDaily(), history: [] }
  try { const saved = learningStore.load(); if (!saved) return fallback; const isToday = saved.daily?.date === today(); const history = [...(saved.history || []), ...(saved.daily?.date && !isToday ? [saved.daily] : [])].filter((day, index, all) => all.findIndex((item) => item.date === day.date) === index).slice(-30); return { ...fallback, ...saved, history, settings: { ...fallback.settings, ...saved.settings }, daily: isToday ? { ...fallback.daily, ...saved.daily } : freshDaily() } } catch { return fallback }
}
function App() {
  const [view, setView] = useState<AppView>('home')
  const [subject, setSubject] = useState<SubjectId>('chinese')
  const [state, setState] = useState(initialState)
  const [reminder, setReminder] = useState<string | null>(null)
  const [cloudStatus, setCloudStatus] = useState('正在检查云端连接…')
  const [parentEmail, setParentEmail] = useState<string | null>(null)
  const [authReady, setAuthReady] = useState(!supabase)
  const [childId, setChildId] = useState<string | null>(null)
  const [answerDetailCount, setAnswerDetailCount] = useState(0)
  const [trackingStatus, setTrackingStatus] = useState('答题明细等待记录')
  const [learningInsights, setLearningInsights] = useState<LearningInsight[]>([])
  const stateRef = useRef(state)
  const sessionPromiseRef = useRef<Promise<string | null> | null>(null)
  const sessionStartedAtRef = useRef(0)
  useEffect(() => { stateRef.current = state; learningStore.save(state) }, [state])
  useEffect(() => {
    checkSupabaseConnection().then((result) => {
      setCloudStatus(result.ok ? '云端数据库已连接' : `云端尚未连接：${result.message}`)
    })
  }, [])
  useEffect(() => {
    if (!parentEmail) return
    let active = true
    initializeCloudLearning(stateRef.current).then((result) => {
      if (!active) return
      setChildId(result.childId)
      setState(result.state)
      setCloudStatus(result.source === 'cloud' ? '已读取云端学习记录' : '本机记录已保存到云端')
    }).catch((error: unknown) => {
      if (active) setCloudStatus(`云端同步暂不可用：${error instanceof Error ? error.message : '未知错误'}`)
    })
    return () => { active = false }
  }, [parentEmail])
  useEffect(() => {
    if (!childId) return
    const sync = () => saveCloudLearning(childId, stateRef.current)
      .then(() => setCloudStatus('云端数据已同步'))
      .catch((error: unknown) => setCloudStatus(`同步失败，本机数据仍已保存：${error instanceof Error ? error.message : '未知错误'}`))
    const timer = window.setInterval(sync, 10_000)
    return () => window.clearInterval(timer)
  }, [childId])
  useEffect(() => {
    if (view !== 'parent' || !childId) return
    Promise.all([countCloudAnswers(childId), loadLearningInsights(childId)]).then(([count, insights]) => {
      setAnswerDetailCount(count)
      setLearningInsights(insights)
    }).catch((error: unknown) => setTrackingStatus(`学习分析暂不可用：${error instanceof Error ? error.message : '未知错误'}`))
  }, [view, childId])
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setParentEmail(data.session?.user.email || null)
      if (!data.session) setChildId(null)
      setAuthReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setParentEmail(session?.user.email || null)
      if (!session) setChildId(null)
      setAuthReady(true)
    })
    return () => data.subscription.unsubscribe()
  }, [])
  const updateState = (makeNext: (current: LearningState) => LearningState) => setState((current) => {
    const next = makeNext(current)
    const goalDone = Object.values(next.daily.correct).every((count) => count >= next.settings.dailyQuestionGoal)
    const timeDone = next.daily.activeSeconds >= next.settings.dailyTimeLimitMinutes * 60
    if (!next.daily.noticeShown && (goalDone || timeDone)) { setReminder(goalDone ? '今日探索任务已完成。好好休息，才能更好地探索知识宇宙。' : `今天已经探索 ${next.settings.dailyTimeLimitMinutes} 分钟啦。好好休息，才能更好地探索知识宇宙。`); return { ...next, daily: { ...next.daily, noticeShown: true } } }
    return next
  })
  const startLearning = (nextSubject: SubjectId) => {
    setSubject(nextSubject)
    setView('learning')
    sessionStartedAtRef.current = Date.now()
    sessionPromiseRef.current = childId
      ? startLearningSession(childId, nextSubject, state.settings.ageGroup).catch((error: unknown) => { setTrackingStatus(`任务建档失败：${error instanceof Error ? error.message : '未知错误'}`); return null })
      : null
  }
  const recordAnswer = (correct: boolean, questionId: string | undefined, selectedAnswer: string) => {
    updateState((current) => ({ ...current, stars: current.stars + (correct ? 1 : 0), daily: { ...current.daily, attempts: { ...current.daily.attempts, [subject]: current.daily.attempts[subject] + 1 }, correct: { ...current.daily.correct, [subject]: current.daily.correct[subject] + (correct ? 1 : 0) } } }))
    if (childId && questionId && sessionPromiseRef.current) {
      sessionPromiseRef.current.then((sessionId) => {
        if (sessionId) return recordCloudAnswer({ sessionId, childId, questionId, selectedAnswer, correct })
          .then(() => setTrackingStatus('本次答题明细已记录'))
      }).catch((error: unknown) => setTrackingStatus(`答题明细失败：${error instanceof Error ? error.message : '未知错误'}`))
    }
  }
  const leaveLearning = () => {
    const elapsed = Math.max(0, Math.round((Date.now() - sessionStartedAtRef.current) / 1000))
    sessionPromiseRef.current?.then((sessionId) => sessionId ? finishLearningSession(sessionId, elapsed, false) : undefined).catch(() => undefined)
    sessionPromiseRef.current = null
    setView('home')
  }
  const updateSettings = (settings: ParentSettings) => setState((current) => ({ ...current, settings }))
  return <main className="app-shell">
    <AppHeader stars={state.stars} />
    <InstallAppButton />
    {view === 'home' && <HomePage ageGroup={state.settings.ageGroup} daily={state.daily} goal={state.settings.dailyQuestionGoal} onSelectSubject={startLearning} onOpenParent={() => setView('parent')} />}
    {view === 'learning' && <LearningPage subject={subject} ageGroup={state.settings.ageGroup} onBack={leaveLearning} onAnswer={recordAnswer} onActiveSecond={() => updateState((current) => ({ ...current, daily: { ...current.daily, activeSeconds: current.daily.activeSeconds + 1 } }))} />}
    {view === 'parent' && !authReady && <section className="panel parent-auth"><p>正在检查家长登录状态…</p></section>}
    {view === 'parent' && authReady && !parentEmail && <ParentAuth />}
    {view === 'parent' && authReady && parentEmail && <><div className="signed-in-bar"><span>家长账号：{parentEmail} · 已记录 {answerDetailCount} 次答题明细 · {trackingStatus}</span><button className="text-button" onClick={() => supabase?.auth.signOut()}>退出登录</button></div><ParentPage stars={state.stars} settings={state.settings} daily={state.daily} history={state.history} cloudStatus={cloudStatus} onChange={updateSettings} onBack={() => setView('home')} /><LearningInsights items={learningInsights} /></>}
    {reminder && <div className="rest-overlay" role="dialog" aria-modal="true"><div><span>🌙 ⭐</span><h2>休息一下吧</h2><p>{reminder}</p><button className="primary-button" onClick={() => setReminder(null)}>知道啦，我稍后再休息</button></div></div>}
  </main>
}
export default App
