import type { LearningState } from '../types/domain'

const STORAGE_KEY = 'kids-learning-state'
const STORAGE_VERSION = 1

interface StoredPayload { version: number; data: LearningState }

export interface LearningStore {
  load(): Partial<LearningState> | null
  save(state: LearningState): void
}

export const localLearningStore: LearningStore = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as StoredPayload | LearningState
      return 'version' in parsed && 'data' in parsed ? parsed.data : parsed
    } catch { return null }
  },
  save(state) {
    const payload: StoredPayload = { version: STORAGE_VERSION, data: state }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  },
}

// 后续接入 Supabase 时，只需实现相同的 load/save 约定，页面无需重写。
export const learningStore: LearningStore = localLearningStore
