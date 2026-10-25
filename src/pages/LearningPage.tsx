import { useEffect, useState } from 'react'
import { appConfig } from '../config/appConfig'
import { subjects } from '../data/subjects'
import { loadQuestions } from '../services/questionService'
import type { AgeGroup, AnswerOutcome, Question, SubjectId } from '../types/domain'

interface Props { subject: SubjectId; ageGroup: AgeGroup; onBack: () => void; onComplete: () => void; onAnswer: (questionId: string | undefined, selectedAnswer: string, localCorrectAnswer?: string, useCloud?: boolean) => Promise<AnswerOutcome>; onActiveSecond: () => void }

export function LearningPage({ subject, ageGroup, onBack, onComplete, onAnswer, onActiveSecond }: Props) {
  const current = subjects.find((item) => item.id === subject)!
  const [mission, setMission] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [questionSource, setQuestionSource] = useState<'cloud' | 'local'>('local')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null)
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [complete, setComplete] = useState(false)
  const item = mission[index]

  useEffect(() => {
    let active = true
    loadQuestions(subject, ageGroup).then((result) => {
      if (!active) return
      setMission([...result.questions].sort(() => Math.random() - .5).slice(0, appConfig.missionQuestionCount))
      setQuestionSource(result.source)
    }).catch((error: unknown) => {
      if (active) setLoadError(error instanceof Error ? error.message : '题目暂时无法加载，请稍后再试。')
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [subject, ageGroup])

  useEffect(() => {
    if (loading || complete) return
    let timer: number | null = null
    const syncTimer = () => {
      if (document.visibilityState === 'visible' && timer === null) timer = window.setInterval(onActiveSecond, 1000)
      else if (document.visibilityState !== 'visible' && timer !== null) {
        window.clearInterval(timer)
        timer = null
      }
    }
    document.addEventListener('visibilitychange', syncTimer)
    syncTimer()
    return () => {
      document.removeEventListener('visibilitychange', syncTimer)
      if (timer !== null) window.clearInterval(timer)
    }
  }, [loading, complete, onActiveSecond])

  const choose = async (answer: string) => {
    if (selected !== null || checking || !item) return
    setChecking(true)
    setAnswerError(null)
    try {
      const outcome = await onAnswer(item.id, answer, questionSource === 'local' ? item.correct : undefined, questionSource === 'cloud')
      setSelected(answer)
      setAnswerCorrect(outcome.correct)
      setCorrectAnswer(outcome.correctAnswer)
      if (outcome.correct) setCorrectCount((value) => value + 1)
    } catch (error: unknown) {
      setAnswerError(error instanceof Error ? error.message : '暂时无法核对答案，请稍后再试。')
    } finally {
      setChecking(false)
    }
  }
  const next = () => {
    if (index === mission.length - 1) { setComplete(true); onComplete() }
    else { setIndex((value) => value + 1); setSelected(null); setAnswerCorrect(null); setCorrectAnswer(null); setAnswerError(null) }
  }
  const speak = () => {
    if (!item || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(item.speech)
    utterance.lang = item.lang || 'zh-CN'
    utterance.rate = .75
    window.speechSynthesis.speak(utterance)
  }

  if (loading) return <section className="panel learning-panel complete-card"><div className="completion-stars">🪐</div><h2>正在准备探索题目…</h2><button className="back-button" onClick={onBack}>← 返回首页</button></section>
  if (loadError) return <section className="panel learning-panel complete-card"><div className="completion-stars">☁️</div><h2>题目暂时没有准备好</h2><p>{loadError}</p><button className="back-button" onClick={onBack}>← 返回首页</button></section>
  if (!item) return <section className="panel learning-panel complete-card"><div className="completion-stars">🪐</div><h2>暂时没有可探索的题目</h2><button className="back-button" onClick={onBack}>← 返回首页</button></section>
  if (complete) return <section className="panel learning-panel complete-card"><div className="completion-stars">⭐ 🚀 ⭐</div><h2>探索任务完成啦！</h2><p>这次答对了 <strong>{correctCount}</strong> / {mission.length} 题</p><p>每一颗小星星，都是你认真探索的奖励。</p><button className="primary-button" onClick={onBack}>返回知识宇宙</button></section>

  return <section className="panel learning-panel"><div className="learning-top"><button className="back-button" onClick={onBack}>← 返回首页</button><strong>{current.name} · 任务 {index + 1}/{mission.length}</strong><small title={questionSource === 'cloud' ? '题目来自云端题库' : '当前使用本地备用题库'}>{questionSource === 'cloud' ? '☁️' : '📦'}</small></div><div className="mission-progress"><span style={{ width: `${(index + 1) / mission.length * 100}%` }} /></div><div className="question-visual" aria-label={item.prompt}><div>{item.emoji}</div><strong>{item.prompt}</strong><button onClick={speak}>🔊 听一听</button></div><h2 className="question-title">{item.question}</h2><div className="answer-grid">{item.answers.map((answer) => <button key={answer} disabled={selected !== null || checking} className={selected !== null ? (answer === correctAnswer ? 'correct' : answer === selected ? 'wrong' : '') : ''} onClick={() => choose(answer)}>{answer}</button>)}</div>{checking && <div className="feedback">正在核对答案…</div>}{answerError && <div className="feedback retry">{answerError}</div>}{selected !== null && answerCorrect !== null && <div className={`feedback ${answerCorrect ? 'success' : 'retry'}`}>{answerCorrect ? '答对啦，摘到一颗星星！ ⭐' : `再认识一下，正确答案是“${correctAnswer}”`}</div>}{selected !== null && <button className="primary-button next-button" onClick={next}>{index === mission.length - 1 ? '完成任务' : '下一题 →'}</button>}</section>
}
