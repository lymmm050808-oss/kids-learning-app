import { dateKey, dateKeyOffset } from '../services/dailyProgress'
import type { DailyProgress, LearningState } from '../types/domain'

const historySamples = [
  { attempts: [3, 2, 2], correct: [2, 2, 1], minutes: 7 },
  { attempts: [4, 3, 2], correct: [3, 2, 2], minutes: 9 },
  { attempts: [2, 3, 3], correct: [2, 2, 2], minutes: 8 },
  { attempts: [5, 2, 3], correct: [4, 2, 2], minutes: 11 },
  { attempts: [3, 4, 2], correct: [3, 3, 2], minutes: 10 },
  { attempts: [4, 3, 3], correct: [3, 2, 3], minutes: 12 },
]

const counts = (values: number[]) => ({ chinese: values[0], math: values[1], english: values[2] })

export function createDemoState(): LearningState {
  const history: DailyProgress[] = historySamples.map((sample, index) => ({
    date: dateKeyOffset(index - historySamples.length),
    activeSeconds: sample.minutes * 60,
    attempts: counts(sample.attempts),
    correct: counts(sample.correct),
    noticeShown: false,
  }))

  return {
    stars: 36,
    settings: { ageGroup: '3-4', dailyQuestionGoal: 10, dailyTimeLimitMinutes: 20 },
    daily: {
      date: dateKey(),
      activeSeconds: 7 * 60,
      attempts: counts([4, 3, 2]),
      correct: counts([3, 2, 2]),
      noticeShown: false,
    },
    history,
  }
}

export const demoLearningInsights = [
  { subject: 'chinese', prompt: '多', questionText: '找一找“多”字', attempts: 5, wrongCount: 1, accuracy: 80 },
  { subject: 'math', prompt: '2朵小花', questionText: '数一数，有几个？', attempts: 4, wrongCount: 1, accuracy: 75 },
  { subject: 'english', prompt: 'door', questionText: '“门”的英文是什么？', attempts: 3, wrongCount: 0, accuracy: 100 },
] as const
