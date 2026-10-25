import { learningKnowledge, type KnowledgeAgeGroup, type KnowledgeChunk, type KnowledgeSubject } from '../data/learningKnowledge'

export interface KnowledgeSearchOptions {
  subject?: KnowledgeSubject | 'all'
  ageGroup?: KnowledgeAgeGroup | 'all'
  limit?: number
}

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[\s，。！？、,.!?；;：:'"“”‘’（）()《》<>]/g, '')
}

const questionFillers = ['我想知道', '我想问问', '请告诉我', '有没有办法', '不太愿意', '该怎么办', '怎么办', '怎么样', '请问', '请帮我', '能不能', '可不可以', '怎么才能', '应该怎么', '如何才能', '为什么', '怎样', '如何', '怎么', '孩子', '幼儿', '宝宝', '小朋友', '小孩', '家长', '这个', '一下', '可以', '吗', '呢', '呀', '啊']

const topicAliases = {
  chinese: ['阅读', '看书', '读书', '绘本', '识字', '认字', '讲故事', '故事', '表达', '不爱看书', '不喜欢看书', '不愿意阅读', '阅读兴趣', '不爱认字'],
  math: ['数学', '数数', '数字', '数量', '比较', '分类', '规律', '图形', '形状', '大小', '多少', '积木', '逻辑', '生活数学', '加减'],
  english: ['英语', '英文', '单词', '儿歌', '歌曲', '双语', '发音', '口语', '听力', '开口', '英语启蒙', '不敢说英语', '不愿说英语'],
} satisfies Record<KnowledgeSubject, string[]>

function chineseBigrams(value: string) {
  const chars = Array.from(normalize(value))
  if (chars.length < 2) return chars
  return chars.slice(0, -1).map((char, index) => char + chars[index + 1])
}

function coreQuery(value: string) {
  return questionFillers.reduce((result, filler) => result.replaceAll(normalize(filler), ''), normalize(value))
}

function relevance(query: string, chunk: KnowledgeChunk) {
  const normalizedQuery = coreQuery(query)
  if (!normalizedQuery) return 0
  const title = normalize(chunk.title)
  const keywords = chunk.keywords.map(normalize)
  const content = normalize(chunk.content)
  let score = 0

  if (title.includes(normalizedQuery)) score += 14
  for (const keyword of keywords) {
    if (keyword.length >= 2 && normalizedQuery.includes(keyword)) score += 12
    if (normalizedQuery.length >= 2 && keyword.includes(normalizedQuery)) score += 6
  }

  if (topicAliases[chunk.subject].some((alias) => normalizedQuery.includes(normalize(alias)))) score += 5

  const queryTerms = [...new Set(chineseBigrams(normalizedQuery))]
  const searchable = `${title}${keywords.join('')}${content}`
  for (const term of queryTerms) {
    if (searchable.includes(term)) score += 1
  }

  return score
}

export function searchKnowledge(query: string, options: KnowledgeSearchOptions = {}) {
  const cleanedQuery = normalize(query)
  if (!cleanedQuery) return []

  const normalizedCore = coreQuery(query)
  const inferredSubjects = (Object.keys(topicAliases) as KnowledgeSubject[])
    .filter((subject) => topicAliases[subject].some((alias) => normalizedCore.includes(normalize(alias))))
  const inferredSubject = inferredSubjects.length === 1 ? inferredSubjects[0] : undefined
  const selectedSubject = options.subject && options.subject !== 'all' ? options.subject : inferredSubject
  const preferredAge = options.ageGroup === 'all' ? undefined : options.ageGroup

  return learningKnowledge
    .filter((chunk) => selectedSubject === undefined || chunk.subject === selectedSubject)
    // Prefer the child's selected age, but keep relevant results from the other
    // age band visible while this small starter library is still growing.
    .map((chunk) => ({ chunk, score: relevance(query, chunk) }))
    .filter((result) => result.score >= 4)
    .sort((a, b) => {
      const agePreference = (result: typeof a) => result.chunk.ageGroup === preferredAge ? 3 : 0
      return b.score + agePreference(b) - a.score - agePreference(a) || a.chunk.title.localeCompare(b.chunk.title, 'zh-CN')
    })
    .slice(0, options.limit ?? 4)
    .map(({ chunk }) => chunk)
}
