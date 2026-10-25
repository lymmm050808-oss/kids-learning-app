import type { DailyProgress, LearningState } from '../types/domain'

const timeZone = 'Asia/Shanghai'

export function dateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value || ''
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function dateKeyOffset(days: number, from: Date = new Date()): string {
  const [year, month, day] = dateKey(from).split('-').map(Number)
  const shifted = new Date(Date.UTC(year, month - 1, day + days))
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, '0')}-${String(shifted.getUTCDate()).padStart(2, '0')}`
}

export function createFreshDaily(date: string = dateKey()): DailyProgress {
  return {
    date,
    activeSeconds: 0,
    correct: { chinese: 0, math: 0, english: 0 },
    attempts: { chinese: 0, math: 0, english: 0 },
    noticeShown: false,
  }
}

export function rollDailyProgress(state: LearningState, currentDate: string = dateKey()): LearningState {
  if (state.daily?.date === currentDate) return state

  const history = [...(state.history || []), ...(state.daily?.date ? [state.daily] : [])]
  const uniqueHistory = [...new Map(history.map((day) => [day.date, day])).values()].slice(-30)
  return { ...state, daily: createFreshDaily(currentDate), history: uniqueHistory }
}
