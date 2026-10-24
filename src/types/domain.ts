export type SubjectId = 'chinese' | 'math' | 'english'
export type AgeGroup = '3-4' | '5-6'
export type AppView = 'home' | 'learning' | 'parent'
export interface SubjectSummary { id: SubjectId; planetLabel: string; name: string; description: string; className: string }
export interface Question { id?: string; emoji: string; prompt: string; speech: string; lang?: string; question: string; answers: string[]; correct: string }
export interface ParentSettings { ageGroup: AgeGroup; dailyQuestionGoal: number; dailyTimeLimitMinutes: number }
export interface SubjectCounts { chinese: number; math: number; english: number }
export interface DailyProgress { date: string; activeSeconds: number; correct: SubjectCounts; attempts: SubjectCounts; noticeShown: boolean }
export interface LearningState { stars: number; settings: ParentSettings; daily: DailyProgress; history: DailyProgress[] }
