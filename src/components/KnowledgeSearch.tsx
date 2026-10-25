import { useMemo, useState } from 'react'
import { searchKnowledge } from '../services/knowledgeSearch'
import type { KnowledgeAgeGroup, KnowledgeSubject } from '../data/learningKnowledge'

const subjects: Array<{ value: KnowledgeSubject | 'all'; label: string }> = [
  { value: 'all', label: '全部科目' },
  { value: 'chinese', label: '语文' },
  { value: 'math', label: '数学' },
  { value: 'english', label: '英语' },
]
const subjectNames: Record<KnowledgeSubject, string> = { chinese: '语文', math: '数学', english: '英语' }

export function KnowledgeSearch({ ageGroup }: { ageGroup: KnowledgeAgeGroup }) {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState<KnowledgeSubject | 'all'>('all')
  const results = useMemo(() => searchKnowledge(query, { subject, ageGroup, limit: 4 }), [query, subject, ageGroup])
  const hasQuery = query.trim().length > 0

  return <section className="panel knowledge-panel">
    <p className="eyebrow dark">家长专属 · 有来源的启蒙资料</p>
    <h2>启蒙知识库</h2>
    <p className="knowledge-intro">输入一个问题，先从审核整理的资料中找参考建议。当前是关键词检索，结果附有原始出处；暂未启用 AI 自动回答。</p>
    <form className="knowledge-search-form" onSubmit={(event) => event.preventDefault()}>
      <label className="sr-only" htmlFor="knowledge-query">搜索启蒙资料</label>
      <input id="knowledge-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="试试：怎么让孩子喜欢看书？" />
      <label className="sr-only" htmlFor="knowledge-subject">筛选科目</label>
      <select id="knowledge-subject" value={subject} onChange={(event) => setSubject(event.target.value as KnowledgeSubject | 'all')}>
        {subjects.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
      </select>
    </form>
    {!hasQuery ? <div className="knowledge-empty"><span>🔎</span><p>可以问问：孩子不喜欢认字怎么办？如何在生活里练习数数？</p></div>
      : results.length === 0 ? <div className="knowledge-empty"><span>🌱</span><p>暂时没找到合适资料。试着换个说法，比如“绘本”“数数”或“英语歌曲”。</p></div>
        : <div className="knowledge-results" aria-live="polite">{results.map((item) => <article className="knowledge-result" key={item.id}>
          <div className="knowledge-result-meta"><span>{subjectNames[item.subject]}</span><span>{item.ageGroup}岁</span></div>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <a href={item.sourceUrl} target="_blank" rel="noreferrer">资料出处：{item.sourceTitle} ↗</a>
        </article>)}</div>}
    <small className="knowledge-note">资料用于亲子启蒙参考，结合孩子兴趣和实际情况灵活安排。</small>
  </section>
}
