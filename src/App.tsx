import { useCallback, useEffect, useRef, useState } from 'react'
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
import { createFreshDaily, dateKey, rollDailyProgress } from './services/dailyProgress'
import { initializeCloudLearning, saveCloudLearning } from './services/cloudLearningStore'
import { countCloudAnswers, finishLearningSession, loadLearningInsights, startLearningSession, submitCloudAnswer, type LearningInsight } from './services/answerTrackingService'
import { checkSupabaseConnection, isSupabaseConfigured, supabase } from './services/supabaseClient'
import type { AnswerOutcome, AppView, LearningState, ParentSettings, SubjectId } from './types/domain'

const initialState = (): LearningState => {
  const fallback: LearningState = { stars: 0, settings: { ageGroup: appConfig.defaultAgeGroup, dailyQuestionGoal: appConfig.defaultDailyQuestionGoal, dailyTimeLimitMinutes: appConfig.defaultDailyTimeLimitMinutes }, daily: createFreshDaily(), history: [] }
  try {
    const saved = learningStore.load()
    if (!saved) return fallback
    const merged: LearningState = {
      ...fallback,
      ...saved,
      history: saved.history || [],
      settings: { ...fallback.settings, ...saved.settings },
      daily: { ...fallback.daily, ...saved.daily },
    }
    return rollDailyProgress(merged)
  } catch { return fallback }
}
const reminderFor = ({ daily, settings }: LearningState) => {
  if (daily.noticeShown) return null
  const goalDone = Object.values(daily.attempts).every((count) => count >= settings.dailyQuestionGoal)
  const timeDone = daily.activeSeconds >= settings.dailyTimeLimitMinutes * 60
  if (goalDone) return '今日探索任务已完成。好好休息，才能更好地探索知识宇宙。'
  if (timeDone) return `今天已经探索 ${settings.dailyTimeLimitMinutes} 分钟啦。好好休息，才能更好地探索知识宇宙。`
  return null
}
function App() {
  const [initial] = useState(() => {
    const savedState = initialState()
    const initialReminder = reminderFor(savedState)
    return { state: initialReminder ? { ...savedState, daily: { ...savedState.daily, noticeShown: true } } : savedState, reminder: initialReminder }
  })
  const [view, setView] = useState<AppView>('home')
  const [subject, setSubject] = useState<SubjectId>('chinese')
  const [state, setState] = useState(initial.state)
  const [reminder, setReminder] = useState<string | null>(initial.reminder)
  const [cloudStatus, setCloudStatus] = useState('正在检查云端连接…')
  const [parentEmail, setParentEmail] = useState<string | null>(null)
  const [authReady, setAuthReady] = useState(!supabase)
  const [childId, setChildId] = useState<string | null>(null)
  const [answerDetailCount, setAnswerDetailCount] = useState(0)
  const [recordingAllowed, setRecordingAllowed] = useState(false)
  const [trackingStatus, setTrackingStatus] = useState('答题明细等待记录')
  const [learningInsights, setLearningInsights] = useState<LearningInsight[]>([])
  const stateRef = useRef(state)
  const sessionPromiseRef = useRef<Promise<string | null> | null>(null)
  const sessionActiveSecondsRef = useRef(0)
  const sessionFinishedRef = useRef(true)
  const updateState = useCallback((makeNext: (current: LearningState) => LearningState) => {
    const rolled = rollDailyProgress(stateRef.current)
    if (rolled !== stateRef.current) setReminder(null)
    let next = makeNext(rolled)
    const reminderText = reminderFor(next)
    if (reminderText) {
      setReminder(reminderText)
      next = { ...next, daily: { ...next.daily, noticeShown: true } }
    }
    stateRef.current = next
    setState(next)
  }, [])
  useEffect(() => {
    const checkForNewDay = () => {
      if (stateRef.current.daily.date !== dateKey()) {
        setReminder(null)
        updateState((current) => current)
      }
    }
    const timer = window.setInterval(checkForNewDay, 30_000)
    return () => window.clearInterval(timer)
  }, [updateState])
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
      updateState(() => result.state)
      setCloudStatus(result.source === 'cloud' ? '已读取云端学习记录' : '本机记录已保存到云端')
    }).catch((error: unknown) => {
      if (active) setCloudStatus(`云端同步暂不可用：${error instanceof Error ? error.message : '未知错误'}`)
    })
    return () => { active = false }
  }, [parentEmail, updateState])
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
  const onActiveSecond = useCallback(() => {
    sessionActiveSecondsRef.current += 1
    updateState((current) => ({ ...current, daily: { ...current.daily, activeSeconds: current.daily.activeSeconds + 1 } }))
  }, [updateState])
  const finishSession = (completed: boolean) => {
    if (sessionFinishedRef.current) return
    sessionFinishedRef.current = true
    const activeSeconds = sessionActiveSecondsRef.current
    const pendingSession = sessionPromiseRef.current
    sessionPromiseRef.current = null
    pendingSession?.then((sessionId) => sessionId ? finishLearningSession(sessionId, activeSeconds, completed) : undefined)
      .then(() => { if (completed) setTrackingStatus('本次学习任务已完成并记录') })
      .catch((error: unknown) => setTrackingStatus(`学习任务记录失败：${error instanceof Error ? error.message : '未知错误'}`))
  }
  const completeLearning = () => {
    finishSession(true)
  }
  const startLearning = (nextSubject: SubjectId) => {
    setSubject(nextSubject)
    setView('learning')
    sessionActiveSecondsRef.current = 0
    sessionFinishedRef.current = false
    sessionPromiseRef.current = childId
      ? startLearningSession(childId, nextSubject, state.settings.ageGroup).catch((error: unknown) => { setTrackingStatus(`任务建档失败：${error instanceof Error ? error.message : '未知错误'}`); return null })
      : null
  }
  const recordAnswer = async (questionId: string | undefined, selectedAnswer: string, localCorrectAnswer?: string, useCloud = false): Promise<AnswerOutcome> => {
    let outcome: AnswerOutcome
    if (useCloud) {
      if (!questionId || !childId || !sessionPromiseRef.current) throw new Error('学习档案还没准备好，请稍后再试。')
      const sessionId = await sessionPromiseRef.current
      if (!sessionId) throw new Error('本次学习任务暂时无法记录，请稍后再试。')
      outcome = await submitCloudAnswer({ sessionId, questionId, selectedAnswer })
      setTrackingStatus('本次答题已由云端核对并记录')
    } else {
      if (localCorrectAnswer === undefined) throw new Error('这道题暂时无法核对，请稍后再试。')
      outcome = { correct: selectedAnswer === localCorrectAnswer, correctAnswer: localCorrectAnswer, persisted: false }
    }
    const { correct } = outcome
    updateState((current) => ({ ...current, stars: current.stars + (correct ? 1 : 0), daily: { ...current.daily, attempts: { ...current.daily.attempts, [subject]: current.daily.attempts[subject] + 1 }, correct: { ...current.daily.correct, [subject]: current.daily.correct[subject] + (correct ? 1 : 0) } } }))
    return outcome
  }
  const leaveLearning = () => {
    finishSession(false)
    setRecordingAllowed(false)
    setView('home')
  }
  const updateSettings = (settings: ParentSettings) => updateState((current) => ({ ...current, settings }))
  if (!isSupabaseConfigured && import.meta.env.PROD) return <main className="app-shell"><section className="panel parent-auth" role="alert"><p className="eyebrow dark">暂时无法进入</p><h2>应用配置尚未完成</h2><p>家长登录服务暂时不可用，请联系维护者完成配置后再试。</p></section></main>
  if (supabase && !authReady) return <main className="app-shell"><section className="panel parent-auth"><p>正在检查家长登录状态…</p></section></main>
  if (supabase && !parentEmail) return <main className="app-shell"><ParentAuth /></main>
  return <main className="app-shell">
    <AppHeader stars={state.stars} />
    <InstallAppButton />
    {view === 'home' && <HomePage ageGroup={state.settings.ageGroup} daily={state.daily} goal={state.settings.dailyQuestionGoal} onSelectSubject={startLearning} onOpenParent={() => setView('parent')} />}
    {view === 'learning' && <LearningPage subject={subject} ageGroup={state.settings.ageGroup} recordingAllowed={recordingAllowed} onBack={leaveLearning} onComplete={completeLearning} onAnswer={recordAnswer} onActiveSecond={onActiveSecond} />}
    {view === 'parent' && !authReady && <section className="panel parent-auth"><p>正在检查家长登录状态…</p></section>}
    {view === 'parent' && authReady && !parentEmail && <ParentAuth />}
    {view === 'parent' && authReady && parentEmail && <><div className="signed-in-bar"><span>家长账号：{parentEmail} · 已记录 {answerDetailCount} 次答题明细 · {trackingStatus}</span><button className="text-button" onClick={() => supabase?.auth.signOut()}>退出登录</button></div><ParentPage stars={state.stars} settings={state.settings} daily={state.daily} history={state.history} cloudStatus={cloudStatus} recordingAllowed={recordingAllowed} onChange={updateSettings} onToggleRecording={setRecordingAllowed} onBack={() => setView('home')} /><LearningInsights items={learningInsights} /></>}
    {reminder && <div className="rest-overlay" role="dialog" aria-modal="true"><div><span>🌙 ⭐</span><h2>休息一下吧</h2><p>{reminder}</p><button className="primary-button" onClick={() => setReminder(null)}>知道啦，我稍后再休息</button></div></div>}
  </main>
}
export default App
