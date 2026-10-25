import { learningKnowledge, type KnowledgeAgeGroup, type KnowledgeChunk, type KnowledgeSubject } from '../data/learningKnowledge'

export interface KnowledgeSearchOptions {
  subject?: KnowledgeSubject | 'all'
  ageGroup?: KnowledgeAgeGroup | 'all'
  limit?: number
}

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[\s，。！？、,.!?；;：:'"“”‘’（）()《》<>]/g, '')
}

function chineseBigrams(value: string) {
  const chars = Array.from(normalize(value))
  if (chars.length < 2) return chars
  return chars.slice(0, -1).map((char, index) => char + chars[index + 1])
}

function relevance(query: string, chunk: KnowledgeChunk) {
  const normalizedQuery = normalize(query)
  const title = normalize(chunk.title)
  const keywords = chunk.keywords.map(normalize)
  const content = normalize(chunk.content)
  let score = 0

  if (title.includes(normalizedQuery)) score += 12
  for (const keyword of keywords) {
    if (normalizedQuery.includes(keyword)) score += 8
    if (keyword.includes(normalizedQuery)) score += 5
  }

  const queryTerms = chineseBigrams(query)
  const searchable = `${title}${keywords.join('')}${content}`
  for (const term of queryTerms) {
    if (searchable.includes(term)) score += 1
  }

  return score
}

export function searchKnowledge(query: string, options: KnowledgeSearchOptions = {}) {
  const cleanedQuery = normalize(query)
  if (!cleanedQuery) return []

  return learningKnowledge
    .filter((chunk) => options.subject === undefined || options.subject === 'all' || chunk.subject === options.subject)
    .filter((chunk) => options.ageGroup === undefined || options.ageGroup === 'all' || chunk.ageGroup === options.ageGroup)
    .map((chunk) => ({ chunk, score: relevance(query, chunk) }))
    .filter((result) => result.score >= 2)
    .sort((a, b) => b.score - a.score || a.chunk.title.localeCompare(b.chunk.title, 'zh-CN'))
    .slice(0, options.limit ?? 4)
    .map(({ chunk }) => chunk)
}
